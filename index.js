// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.json({ message: "AI Content Backend is running!" });
});

// Test error route using native DOMException
app.get('/generate-error', (req, res, next) => {
  try {
    const error = new DOMException("Something went wrong with the generation", "InvalidStateError");
    throw error;
  } catch (err) {
    next(err);
  }
});

// AI generation route (example, replace with OpenAI API call)
app.post('/generate', async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      throw new DOMException("Prompt is required", "InvalidStateError");
    }

    // Example AI response (replace with actual OpenAI call)
    const aiResponse = `Generated content for: ${prompt}`;
    res.json({ result: aiResponse });
  } catch (err) {
    next(err);
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.name, err.message);
  res.status(500).json({ error: err.name, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
