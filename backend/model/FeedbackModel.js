const mongoose = require('mongoose');

const feedbackSchema =  mongoose.Schema({
  courseId: String,
  courseName: String,
  courseDuration: String,
  feedbackComments: String,
  feedbackRating: Number,
});

module.exports = mongoose.model('Feedback', feedbackSchema);