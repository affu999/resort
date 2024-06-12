const { Room } = require('../models/resort.model'); // Assuming model for rooms

// Read (GET)
const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find({}); // Adjust query for filtering (e.g., req.query)
        res.json(rooms);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving rooms' });
      } 
}

const getRoomById = async (req, res) => {
    try {
        const room = await Room.findById(req.params.roomId); 
        if (!room) {
          return res.status(404).json({ message: 'Room not found' });
        }
        res.json(room);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving room' });
      }
}

// Create (POST)
const createRoom = async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating room' });
      }
}

// Update (PUT)
const updateRoom = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['roomNumber', 'type', 'amenities', 'availability']; // Allowed fields for update

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).json({ message: 'Invalid update fields' });
    }

    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId, req.body, { new: true });
        if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
        }
        res.json(updatedRoom);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating room' });
    }
}

// Delete (DELETE)
const deleteRoom = async (req, res) => {
    try {
        const deletedRoom = await Room.findByIdAndDelete(req.params.roomId);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.json({ message: 'Room deleted' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting room' });
    }
}

module.exports = {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
};
