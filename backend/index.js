require('dotenv').config();
const express = require('express');
const cors = require('cors');
const storyRoutes = require('./routes/storyRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/story', storyRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
// Health check
app.get('/health', (req, res) => res.sendStatus(200));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`HuggingFace key: ${process.env.HF_API_KEY ? 'Loaded' : 'Missing'}`);
});