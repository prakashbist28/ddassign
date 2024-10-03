const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Set the limit to 10MB, adjust as needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('MongoDB connected to database');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
