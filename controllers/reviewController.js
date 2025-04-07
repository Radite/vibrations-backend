const Review = require('../models/Review');

exports.createReview = async (req, res) => {
  try {
    const { festivalId, userName, rating, comment } = req.body;
    const review = new Review({ festivalId, userName, rating, comment });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { festivalId } = req.query;
    const query = festivalId ? { festivalId } : {};
    const reviews = await Review.find(query);
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
