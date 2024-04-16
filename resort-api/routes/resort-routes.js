const express = require('express');
const { 
  getAllGuests,
  getGuestById,
  createGuest,
  updateGuest,
  deleteGuest
 } = require('../controllers/guest-controller');
const router = express.Router();

// Read (GET)
router.get('/', (req, res) => {
  getAllGuests(req, res);
});

// 75 api endpoints

router.get('/:guestId', async (req, res) => {
  getGuestById(req, res);
});

// Create (POST)
router.post('/', async (req, res) => {
  createGuest(req, res);
});

// Update (PUT)
router.put('/:guestId', async (req, res) => {
  updateGuest(req, res);
});

// Delete (DELETE)
router.delete('/:guestId', async (req, res) => {
  deleteGuest(req, res);
});

module.exports = router;