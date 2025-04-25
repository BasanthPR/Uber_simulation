import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import rideRoutes from "./routes/ride.js";
import billingRoutes from "./routes/billing.js";
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.get('/api/mapbox-token', (req, res) => {
//   const token = process.env.MAPBOX_TOKEN;
//   if (!token) {
//     return res.status(500).json({ error: 'Token not found in environment' });
//   }
//   res.json({ token });
// });

// // Connect to MongoDB and run server
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     );
//   })
//   .catch((err) => console.error('Connection error', err));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Route Imports
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profileRoute'); // <-- newly added

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/billing', billingRoutes);

app.use('/api/profile', profileRoutes); // <-- new route added

// Mapbox Token Route
app.get('/api/mapbox-token', (req, res) => {
  const token = process.env.MAPBOX_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'Token not found in environment' });
  }
  res.json({ token });
});

// MongoDB Connection and Server Start
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('Connection error', err));
