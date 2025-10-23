const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const feedbackRoutes = require('./routes/feedback');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/feedback', feedbackRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGO_URI not set in environment');
      process.exit(1);
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
