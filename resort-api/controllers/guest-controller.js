const { Guest } = require('../models/resort.model');
const router = require('express').Router();


// Read (GET)
const getAllGuests = async (req, res) => {
    try {
        console.log("All guests data");
        const filters = {};
        if (req.query.name) {
          filters.name = { $regex: new RegExp(req.query.name, 'i') }; // Case-insensitive search
        }
        if (req.query.email) {
          filters['contact_details.email'] = req.query.email;
        }
    
        // Find guests based on the constructed filters
        const guests = await Guest.find(filters);
    
        res.status(200).json(guests);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving guests' });
      }
}

const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.guestId);
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.status(200).json(guest);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving guest' });
  }
}

// Create (POST)
const createGuest = async (req, res) => {
  try {
    const newGuest = new Guest(req.body);
    const savedGuest = await newGuest.save();
    res.status(201).json(savedGuest);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(400).json({ message: 'Error creating guest' });
  }
}

// Update (PUT)
const updateGuest = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'contact_details', 'preferences']; // Allowed fields for update

  const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
  if (!isValidUpdate) {
    return res.status(400).json({ message: 'Invalid update fields' });
  }

  try {
    const updatedGuest = await Guest.findByIdAndUpdate(req.params.guestId, req.body, { new: true });
    if (!updatedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json(updatedGuest);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating guest' });
  }
}

// Delete (DELETE)
const deleteGuest = async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.guestId);
    if (!deletedGuest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    res.json({ message: 'Guest deleted' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error deleting guest' });
  }
}

module.exports = {
    getAllGuests,
    getGuestById,
    createGuest,
    updateGuest,
    deleteGuest
}
