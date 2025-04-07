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

// Updated CORS configuration - allow connections from your domain
app.use(cors({
  // Allow requests from Netlify domain and localhost for development
  origin: function(origin, callback) {
    const allowedOrigins = [
      'https://vibrationspoetryfestival.com/',  // Change this to your actual domain
      'http://localhost:3000'
    ];
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // For now, allow all origins until you set up your domain properly
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'URI is set' : 'URI is not set');
  });

// Mount Routes
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/competitions', competitionRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/reviews', reviewRoutes);



// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});