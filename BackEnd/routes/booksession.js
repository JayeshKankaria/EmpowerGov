// Import required modules and dependencies
const express = require('express');
const router = express.Router();
const Counselor = require('../models/counselor');

// POST /api/counselors/:id/book
// Book a counseling session with a specific counselor
router.post('/:id/book', async (req, res) => {
  try {
    const counselorId = req.params.id;
    const { date, time } = req.body;

    // Validate the request body
    if (!date || !time) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    // Find the counselor by ID in the database
    const counselor = await Counselor.findById(counselorId);

    if (counselor) {
      // Check if the counselor is available at the requested date and time
      const isAvailable = counselor.isAvailable(date, time);

      if (isAvailable) {
        // Book the counseling session
        counselor.bookSession(date, time);

        // Save the updated counselor
        await counselor.save();

        // Return a success message
        return res.status(200).json({ message: 'Counseling session booked successfully' });
      } else {
        // Return a 404 status if the counselor is not available
        return res.status(404).json({ error: 'Counselor is not available at the requested date and time' });
      }
    } else {
      // Return a 404 status if the counselor is not found
      return res.status(404).json({ error: 'Counselor not found' });
    }
  } catch (error) {
    // If there is an error booking the counseling session, return a 500 status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;