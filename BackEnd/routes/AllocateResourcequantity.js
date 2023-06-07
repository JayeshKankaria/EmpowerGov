// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const Resource = require('../models/resource');

// POST /api/resources/:id/allocate
// Allocate a specific quantity of a resource
router.post('/:id/allocate', async (req, res) => {
  try {
    const resourceId = req.params.id;
    const { quantity } = req.body;

    // Validate the request body
    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid quantity' });
    }

    // Find the resource by ID in the database
    const resource = await Resource.findById(resourceId);

    if (resource) {
      // Check if the requested quantity is available
      if (resource.quantity >= quantity) {
        // Update the resource quantity and save it
        resource.quantity -= quantity;
        await resource.save();

        // Return a success message
        return res.status(200).json({ message: 'Resource allocation successful' });
      } else {
        // Return a 404 status if the requested quantity is not available
        return res.status(404).json({ error: 'Insufficient quantity' });
      }
    } else {
      // Return a 404 status if the resource is not found
      return res.status(404).json({ error: 'Resource not found' });
    }
  } catch (error) {
    // If there is an error allocating the resource, return a 500 status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;