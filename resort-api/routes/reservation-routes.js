const express = require('express');
const { getAllReservations, getReservationById, createReservation, updateReservation, deleteReservation, getReservationByGuestId } = require('../controllers/reservation-controller');

const router = express.Router();

// Read (GET)
router.get('/', async (req, res) => {
  getAllReservations(req, res);
});

router.get('/:reservationId', async (req, res) => {
  getReservationById(req, res);
});

router.get('/guest/:guestId', async (req, res) => {
    getReservationByGuestId(req, res);
});

// Create (POST)
router.post('/', async (req, res) => {
  createReservation(req, res);
});

// Update (PUT)
router.put('/:reservationId', async (req, res) => {
  updateReservation(req, res);
});

// Delete (DELETE)
router.delete('/:reservationId', async (req, res) => {
  deleteReservation(req, res);
});

module.exports = router;
