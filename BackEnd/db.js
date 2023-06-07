// Import the required modules for Mongoose and database configuration
const mongoose = require('mongoose');

// Create a new Mongoose instance
mongoose.Promise = global.Promise;

// Replace the connection string with your MongoDB Atlas connection string or local MongoDB URL
const mongoURI = 'mongodb://localhost:27017/your_database';

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

// Export the Mongoose instance and the connectDB function
module.exports = {
  mongoose,
  connectDB,
};