const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  festivalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Festival' }, // if you have a separate Festival model
  userName: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);
