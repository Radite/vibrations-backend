  // index.js
  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const path = require('path');
  
  const newsletterRoutes = require('./routes/newsletterRoutes');
  const competitionRoutes = require('./routes/competitionRoutes');
  const vendorRoutes = require('./routes/vendorRoutes');
  const galleryRoutes = require('./routes/galleryRoutes');
  const reviewRoutes = require('./routes/reviewRoutes');
  
  const app = express();
  const port = process.env.PORT || 3001;
  
  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://yourwebsitedomain.com' : 'http://localhost:3000',
    credentials: true
  }));
  app.use(bodyParser.json());
  
  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vibrations_poetry_festival', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
  
  // Mount Routes
  app.use('/api/newsletter', newsletterRoutes);
  app.use('/api/competitions', competitionRoutes);
  app.use('/api/vendors', vendorRoutes);
  app.use('/api/gallery', galleryRoutes);
  app.use('/api/reviews', reviewRoutes);
  
  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    // Any route that doesn't match the above should return the React app
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
    });
  }
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });