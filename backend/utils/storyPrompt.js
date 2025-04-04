const buildStoryPrompt = ({
    genre = 'fantasy',
    plot,
    perspective = 'third-person',
    characters = [],
    setting = 'unknown'
  }) => {
    return `
      Write a complete 350-word ${genre} story with these specifications:
      
      **Core Plot**: ${plot}
      
      **Narrative Perspective**: ${perspective}
      
      **Characters**: 
      ${characters.map(c => `- ${c}`).join('\n') || '- Unnamed protagonist'}
      
      **Setting**: ${setting}
      
      **Requirements**:
      -Include 3-5 direct dialogues in quotation marks (e.g., "Hello," said Merlin. "How does it work?" asked Ember.)
      -Ensure characters interact through these dialogues
      - Maintain ${perspective} perspective consistently
      - End with a satisfying conclusion
      - No placeholders or incomplete sentences
      - Avoid excessive use of exclamation marks
      
      **Story**:
    `;
  };
  
  module.exports = { buildStoryPrompt };