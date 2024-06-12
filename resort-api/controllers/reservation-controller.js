const {Reservation} = require('../models/resort.model');
const {Guest} = require('../models/resort.model');

// Read (GET)
const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('check_in'); // Populate guest details (optional)
        res.json(reservations);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving reservations' });
      }
}

const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.reservationId); // Populate guest details (optional)
        if (!reservation) {
          return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json(reservation);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving reservation' });
    }
}

// Create (POST)
const createReservation = async (req, res) => {
    try {
        const { guestId, ...reservationData } = req.body; // Destructure guest ID and other data
    
        // Validate guest existence (optional)
        const guest = await Guest.findById(guestId);
        if (!guest) {
          return res.status(400).json({ message: 'Invalid guest ID' });
        }
    
        const newReservation = new Reservation({ ...reservationData, guest: guestId });
        const savedReservation = await newReservation.save();
        res.status(201).json(savedReservation);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating reservation' });
      }
}

// Update (PUT)
const updateReservation = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['checkInDate', 'checkOutDate', 'roomType', 'guests']; // Allowed fields for update
  
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }
  
    try {
      const updatedReservation = await Reservation.findByIdAndUpdate(
        req.params.reservationId,
        req.body,
        { new: true }
      );
      if (!updatedReservation) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.json(updatedReservation);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating reservation' });
    }
}

// Delete (DELETE)
const deleteReservation = async (req, res) => {
    try {
        const deletedReservation = await Reservation.findByIdAndDelete(req.params.reservationId);
        if (!deletedReservation) {
          return res.status(404).json({ message: 'Reservation not found' });
        }
        res.json({ message: 'Reservation deleted' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting reservation' });
      }
}

const getReservationByGuestId = async (req, res) => {
    try{
        const guestId = req.params.guestId;
        const reservation = await Reservation.find({guest_id: guestId});
        if(!reservation){
            return res.status(404).json({ message: 'Reservation not found' });
        }
        res.status(200).json(reservation);
    }catch(error){
        console.error(error);
        res.status(500).json({ messssage: 'Error getting reservation details' });
    }
}

module.exports = {
    getAllReservations,
    getReservationById,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservationByGuestId
};
