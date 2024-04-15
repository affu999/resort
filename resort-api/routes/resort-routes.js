const express = require('express');
const router = express.Router();

router.route('/login').get((req, res) => {
    res.end("Login Attempt");
}).post((req, res) => {
    res.end("Login Attempt");
});

// Read (GET)
router.get('/', async (req, res) => {
  
});

router.get('/:guestId', async (req, res) => {
  
});

// Create (POST)
router.post('/', async (req, res) => {
  
});

// Update (PUT)
router.put('/:guestId', async (req, res) => {
  
});

// Delete (DELETE)
router.delete('/:guestId', async (req, res) => {
  
});

module.exports = router;