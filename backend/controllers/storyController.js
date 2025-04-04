const axios = require('axios');

// Configuration
const GEMINI_CONFIG = {
  models: ["gemini-1.5-pro-latest", "gemini-1.5-flash-latest"],
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models",
  rateLimit: {
    requests: 60,  // 60 requests/minute
    windowMs: 60000
  }
};

const requestCache = new Map();

const generateStory = async (req, res) => {
  const { genre, plot, perspective, characters = [], setting, format = 'narrative' } = req.body;

  // Enhanced validation
  if (!plot || plot.trim().length < 10) {
    return res.status(400).json({ 
      error: "Plot must be at least 10 meaningful characters",
      received: plot?.length || 0
    });
  }

  try {
    const prompt = buildStoryPrompt(genre, plot, perspective, characters, setting, format);
    const result = await tryGemini(prompt);
    return res.json(result);

  } catch (error) {
    console.error('API Failure:', {
      error: error.message,
      timestamp: new Date().toISOString()
    });

    return res.status(503).json({
      error: "Service temporarily unavailable",
      solutions: [
        "Try again in 1-2 minutes",
        "Simplify your story request"
      ],
      retryAfter: "1 minute"
    });
  }
};

// Helper Functions
const buildStoryPrompt = (genre, plot, perspective, characters, setting, format) => {
  if (format === 'dialogue') {
    return `
      Write a 300-word ${genre} story in dialogue-only format with these elements:
      
      **Core Plot**: ${plot}
      **Characters**: ${characters.join(', ') || 'An original protagonist'}
      **Setting**: ${setting || 'A vivid fictional world'}
      **Perspective**: ${perspective}
      
      **Requirements**:
      - Use only dialogue, formatted as "Character: Dialogue text" (e.g., "Sarah: Hello")
      - Each line must be spoken by a character (no narration)
      - Include at least 5-7 dialogue exchanges
      - Maintain ${perspective} perspective through the dialogue
      - Convey the plot and setting entirely through character speech
      - End with a clear resolution
    `;
  } else {
    return `
      Write a 300-word ${genre} story with these elements:
      
      **Core Plot**: ${plot}
      **Characters**: ${characters.join(', ') || 'An original protagonist'}
      **Setting**: ${setting || 'A vivid fictional world'}
      **Perspective**: ${perspective}
      
      **Requirements**:
      - Three-act structure (setup → confrontation → resolution)
      - Minimum 3 natural dialogues
      - Strict ${perspective} perspective
      - Paragraph breaks every 3-5 sentences
    `;
  }
};

const tryGemini = async (prompt) => {
  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded');
  }

  for (const model of GEMINI_CONFIG.models) {
    try {
      const response = await axios.post(
        `${GEMINI_CONFIG.endpoint}/${model}:generateContent`,
        { contents: [{ parts: [{ text: prompt }] }] },
        { 
          params: { key: process.env.GEMINI_API_KEY },
          timeout: 20000
        }
      );

      trackRequest();
      return formatResponse(
        response.data.candidates[0].content.parts[0].text,
        model,
        response.data.usageMetadata
      );
    } catch (err) {
      console.error(`Gemini ${model} failed:`, err.response?.data || err.message);
    }
  }

  throw new Error('All Gemini models failed');
};

const checkRateLimit = () => {
  const now = Date.now();
  const requests = requestCache.get('gemini') || [];
  
  const recentRequests = requests.filter(time => now - time < GEMINI_CONFIG.rateLimit.windowMs);
  return recentRequests.length < GEMINI_CONFIG.rateLimit.requests;
};

const trackRequest = () => {
  const now = Date.now();
  const requests = requestCache.get('gemini') || [];
  requestCache.set('gemini', [...requests, now]);
};

const formatResponse = (rawStory, model, usage) => {
  return {
    story: rawStory
      .replace(/\*\*.*?\*\*/g, '') // Remove markdown
      .replace(/(\S)\n(\S)/g, '$1 $2') // Fix mid-paragraph breaks
      .replace(/\n{3,}/g, '\n\n') // Normalize spacing
      .trim(),
    meta: {
      model,
      tokens: usage?.totalTokenCount || Math.ceil(rawStory.length / 4),
      timestamp: new Date().toISOString()
    }
  };
};

module.exports = { generateStory };