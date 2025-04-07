const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  type: { type: String, enum: ['image', 'video'], required: true },
  year: { type: Number, required: true },
  url: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
