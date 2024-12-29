// server.js (or app.js)
const express = require("express");
require('./db/dbConnection');
require("dotenv").config();
const cors = require('cors');
const Feedback = require('./model/FeedbackModel.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/feedbacks', async (req, res) => {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  });
  
  app.post('/feedbacks', async (req, res) => {
    const { courseName, feedbackComments, feedbackRating, courseDuration } = req.body;
    const newFeedback = new Feedback({
      
      courseName,
      feedbackComments,
      feedbackRating,
      courseDuration
    });
    await newFeedback.save();
    res.status(201).json(newFeedback);
  });
  
  app.put('/feedbacks/:id', async (req, res) => {
    const { id } = req.params;
    const { courseName, feedbackComments, feedbackRating, courseDuration } = req.body;
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, {
      courseName,
      feedbackComments,
      feedbackRating,
      courseDuration
    }, { new: true });
    res.json(updatedFeedback);
  });
  
  app.delete('/feedbacks/:id', async (req, res) => {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.json({ message: 'Feedback deleted successfully' });
  });
  PORT=5000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  

// Get port from environment variable or default to 3000
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
