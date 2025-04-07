const mongoose = require('mongoose');

const competitionEntrySchema = new mongoose.Schema({
  participantName: { type: String, required: true },
  email: { type: String, required: true },
  submission: { type: String }, // could be text or URL if it's an image/audio/video
  submittedAt: { type: Date, default: Date.now }
});

const competitionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  competitionDate: { type: Date, required: true },
  prizeInfo: { type: String, required: true },
  // You might also add fields like rules, guidelines, etc.
  entries: [competitionEntrySchema]
});

module.exports = mongoose.model('Competition', competitionSchema);
