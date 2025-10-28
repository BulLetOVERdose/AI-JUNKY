// index.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Example route: home
app.get('/', (req, res) => {
  res.json({ message: "AI Content Backend is running!" });
});

// Example route that simulates an error
app.get('/generate-error', (req, res, next) => {
  try {
    // Throw a DOMException using Node's built-in version
    const error = new DOMException("Something went wrong with the generation", "InvalidStateError");
    throw error;
  } catch (err) {
    next(err); // Pass the error to Express error handler
  }
});

// Example AI endpoint (replace with your OpenAI logic)
app.post('/generate', async (req, res, next) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      // Throw DOMException for invalid request
      throw new DOMException("Prompt is required", "InvalidStateError");
    }

    // Dummy AI response (replace with your OpenAI API call)
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

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
