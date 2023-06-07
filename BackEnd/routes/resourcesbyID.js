// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

// GET /api/resources/:id
// Get details of a specific resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resourceId = req.params.id;
    // Find the resource by ID in the database
    const resource = await Resource.findById(resourceId);

    if (resource) {
      // If the resource is found, return it
      res.status(200).json(resource);
    } else {
      // If the resource is not found, return a 404 status
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    // If there is an error retrieving the resource, return a 500 status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;