// Import required modules and models
const Reservation = require('../models/reservation');

// Controller function to create a new reservation
const createReservation = async (req, res, next) => {
  try {
    // Extract the necessary data from the request body
    const { userId, facilityId, date, time } = req.body;

    // Create a new reservation using the Reservation model
    const reservation = await Reservation.create({
      userId,
      facilityId,
      date,
      time,
    });

    // Send the created reservation as a response
    res.status(201).json({ reservation });
  } catch (error) {
    // Handle any errors that occur during reservation creation
    next(error);
  }
};

// Controller function to retrieve all reservations
const getAllReservations = async (req, res, next) => {
  try {
    // Fetch all reservations from the database
    const reservations = await Reservation.find();

    // Send the reservations as a response
    res.status(200).json({ reservations });
  } catch (error) {
    // Handle any errors that occur during retrieval
    next(error);
  }
};

// Controller function to check availability
const checkAvailability = async (req, res, next) => {
  try {
    // Extract the necessary data from the query parameters
    const { facilityId, date, time } = req.query;

    // Query the database to check availability
    const reservations = await Reservation.find({ facilityId, date, time });

    // Determine availability based on the number of existing reservations
    const isAvailable = reservations.length < MAX_CAPACITY;

    // Send the availability status as a response
    res.status(200).json({ isAvailable });
  } catch (error) {
    // Handle any errors that occur during availability check
    next(error);
  }
};

// Controller function to update a reservation
const updateReservation = async (req, res, next) => {
  try {
    // Extract the necessary data from the request parameters and body
    const { id } = req.params;
    const { date, time } = req.body;

    // Find the reservation by ID and update the specified fields
    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { date, time },
      { new: true }
    );

    // Send the updated reservation as a response
    res.status(200).json({ reservation });
  } catch (error) {
    // Handle any errors that occur during reservation update
    next(error);
  }
};

// Controller function to cancel a reservation
const cancelReservation = async (req, res, next) => {
  try {
    // Extract the reservation ID from the request parameters
    const { id } = req.params;

    // Delete the reservation from the database
    await Reservation.findByIdAndDelete(id);

    // Send a success message as a response
    res.status(204).end();
  } catch (error) {
    // Handle any errors that occur during cancellation
    next(error);
  }
};

// Export the controller functions
module.exports = {
  createReservation,
  getAllReservations,
  checkAvailability,
  updateReservation,
  cancelReservation,
};