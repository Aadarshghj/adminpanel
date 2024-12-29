const express = require("express");
const router = express.Router();
const FeedModel = require('../model/FeedbackModel.js');

// Get all feedback data
router.get('/feedback', async (req, res) => {
  try {
    const data = await FeedModel.find();
    res.status(200).json(data);  // Return data as JSON
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).send("Unable to fetch feedback data.");
  }
});

// Get a single feedback item by ID
router.get('/feedback/:id', async (req, res) => {
  try {
    const feedback = await FeedModel.findById(req.params.id);
    if (!feedback) {
      return res.status(404).send("Feedback not found");
    }
    res.status(200).json(feedback);  // Return the feedback as JSON
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    res.status(500).send("Error fetching feedback");
  }
});

// Add new feedback data
router.post('/feedback', async (req, res) => {
  try {
    // Validate the incoming data
    const { courseId, courseName, courseDuration, feedbackRating } = req.body;
    if (!courseId || !courseName || !courseDuration || feedbackRating === undefined) {
      return res.status(400).send("Missing required fields");
    }

    // Create and save new feedback
    const newFeedback = new FeedModel(req.body);
    await newFeedback.save();
    res.status(201).send("Feedback added successfully");
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).send("Unable to save feedback");
  }
});

// Delete feedback by ID
router.delete('/feedback/:id', async (req, res) => {
  try {
    const feedback = await FeedModel.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).send("Feedback not found to delete");
    }
    res.status(200).send("Deleted successfully");
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).send("Unable to delete feedback");
  }
});

// Update feedback by ID
router.put("/feedback/:id", async (req, res) => {
  try {
    const updatedFeedback = await FeedModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFeedback) {
      return res.status(404).send("Feedback not found to update");
    }
    res.status(200).json(updatedFeedback);  // Return the updated feedback as JSON
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).send("Unable to update feedback");
  }
});

module.exports = router;
