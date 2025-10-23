const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
