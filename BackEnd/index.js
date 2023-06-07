// Import required modules
const express = require('express');
const { connectDB } = require('./db'); // Import the db.js file
const { generateToken, registerUser, loginUser } = require('./src/auth');
const { authenticate } = require('./src/middleware/authenticate');
const reservationRoutes = require('./src/routes/reservationRoutes');
const errorHandler = require('./src/middleware/errorHandler'); // Error handling middleware

// Create an Express application
const app = express();

// Create the swagger configuration
const docs = require('./docs/swagger');
docs(app);

// Call the connectDB function to establish the database connection
connectDB();

// Set up middleware
app.use(express.json()); // Parse request bodies as JSON
app.use(errorHandler); // Parse Error Handler

// User registration endpoint
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const user = registerUser(username, password);
  res.json({ message: 'User registered successfully', user });
});

// User login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  try {
    const user = loginUser(username, password);
    const token = generateToken(user);
    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Logout endpoint (optional)
app.get('/api/logout', (req, res) => {
  // Perform any logout operations if needed
  res.json({ message: 'Logout successful' });
});

// Secure reservation routes with authentication middleware
app.use('/api/reservations', authenticate, reservationRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});