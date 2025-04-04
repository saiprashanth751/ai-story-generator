const validateStoryInput = (req, res, next) => {
  const { plot, genre, format } = req.body;
  
  if (!plot || plot.length < 10) {
    return res.status(400).json({ 
      error: "Plot must be at least 10 characters long" 
    });
  }

  const validGenres = ['fantasy', 'sci-fi', 'mystery', 'horror', 'adventure'];
  if (!validGenres.includes(genre)) {
    return res.status(400).json({ 
      error: `Invalid genre. Use: ${validGenres.join(', ')}` 
    });
  }

  const validFormats = ['narrative', 'dialogue'];
  if (format && !validFormats.includes(format)) {
    return res.status(400).json({ 
      error: `Invalid format. Use: ${validFormats.join(', ')}` 
    });
  }

  next();
};

module.exports = { validateStoryInput };