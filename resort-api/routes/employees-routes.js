const express = require('express');

const router = express.Router();

// Read (GET)
router.get('/', async (req, res) => {
  res.end('Employees route');
});

router.get('/:employeeId', async (req, res) => {
  
});

// Create (POST)
router.post('/', async (req, res) => {
  
});

// Update (PUT)
router.put('/:employeeId', async (req, res) => {
  
});

// Delete (DELETE)
router.delete('/:employeeId', async (req, res) => {
  
});

module.exports = router;
