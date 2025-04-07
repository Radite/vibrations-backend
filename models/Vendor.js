const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  description: { type: String },
  specialRequests: { type: String },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Vendor', vendorSchema);
