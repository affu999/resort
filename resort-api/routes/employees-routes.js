const express = require('express');
const { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employees-controller');

const router = express.Router();

// Read (GET)
router.get('/', async (req, res) => {
  getAllEmployees(req, res);
});

router.get('/:employeeId', async (req, res) => {
  getEmployeeById(req, res);
});

// Create (POST)
router.post('/', async (req, res) => {
  createEmployee(req, res);
});

// Update (PUT)
router.put('/:employeeId', async (req, res) => {
  updateEmployee(req, res);
});

// Delete (DELETE)
router.delete('/:employeeId', async (req, res) => {
  deleteEmployee(req, res);
});

module.exports = router;
