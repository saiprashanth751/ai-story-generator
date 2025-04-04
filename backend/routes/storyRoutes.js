const express = require('express');
const router = express.Router();
const { generateStory } = require('../controllers/storyController');
const { validateStoryInput } = require('../middleware/storyValidator');

router.post('/generate', validateStoryInput, generateStory);
module.exports = router;