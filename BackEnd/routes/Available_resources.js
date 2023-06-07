const express = require('express');
const app = express();

// Sample resource data
const resources = [
  { id: 1, name: 'Resource 1', quantity: 10, availability: true },
  { id: 2, name: 'Resource 2', quantity: 5, availability: false },
  { id: 3, name: 'Resource 3', quantity: 8, availability: true },
];

// GET /api/resources
app.get('/api/resources', (req, res) => {
  try {
    // Return the array of resources
    res.status(200).json(resources);
  } catch (error) {
    // Return error if there is an issue retrieving resources
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});