const Newsletter = require('../models/Newsletter');

exports.createSubscription = async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if email already exists
      const existingSubscription = await Newsletter.findOne({ email });
      if (existingSubscription) {
        return res.status(400).json({ error: 'This email is already subscribed to our newsletter.' });
      }
  
      // Save new subscription
      const subscription = new Newsletter({ email });
      await subscription.save();
  
      res.status(201).json({ message: 'Subscribed successfully!' });
    } catch (err) {
      if (err.code === 11000) { // Handle duplicate key error
        return res.status(400).json({ error: 'This email is already subscribed to our newsletter.' });
      }
  
      console.error('Subscription error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  