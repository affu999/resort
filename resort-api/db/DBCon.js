const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const mongoUri = process.env.MONGO_URI;

const connectToDb = async () => {
    try {
      await mongoose.connect(mongoUri);
      console.log('Connected to MongoDB Atlas!');
    } catch (error) {
      console.error('Error connecting to MongoDB Atlas:', error);
      process.exit(1); // Exit the process on connection failure
    }
  };
  
  module.exports = connectToDb;
