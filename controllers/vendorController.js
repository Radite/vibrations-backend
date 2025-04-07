const Vendor = require('../models/Vendor');

exports.createVendorApplication = async (req, res) => {
  try {
    const { vendorName, contactPerson, email, phoneNumber, description, specialRequests } = req.body;
    const vendor = new Vendor({ vendorName, contactPerson, email, phoneNumber, description, specialRequests });
    await vendor.save();
    res.status(201).json({ message: 'Vendor application submitted!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
