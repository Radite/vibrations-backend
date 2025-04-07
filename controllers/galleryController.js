const GalleryItem = require('../models/GalleryItem');

exports.getGalleryItems = async (req, res) => {
  try {
    const { year, type } = req.query;
    const query = {};
    if (year) query.year = year;
    if (type) query.type = type;
    const items = await GalleryItem.find(query);
    res.json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addGalleryItem = async (req, res) => {
  try {
    const { type, year, url, description } = req.body;
    const item = new GalleryItem({ type, year, url, description });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
