const express = require('express');
const { getAllRooms, getRoomById, createRoom, updateRoom, deleteRoom } = require('../controllers/rooms-controller');

const router = express.Router();

// Read (GET)
router.get('/', async (req, res) => {
  getAllRooms(req, res);
});

router.get('/:roomId', async (req, res) => {
  getRoomById(req, res);
});

// Create (POST)
router.post('/', async (req, res) => {
  createRoom(req, res);
});

// Update (PUT)
router.put('/:roomId', async (req, res) => {
  updateRoom(req, res);
});

// Delete (DELETE)
router.delete('/:roomId', async (req, res) => {
  deleteRoom(req, res);
});

module.exports = router;
