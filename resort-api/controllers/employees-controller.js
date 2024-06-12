const { Employee } = require('../models/resort.model');

// Read (GET)
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}); // Adjust query for filtering (e.g., req.query)
        res.json(employees);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving employees' });
      }
}

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.employeeId);
        if (!employee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving employee' });
      }
}

// Create (POST)
const createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating employee' });
      }
}

// Update (PUT)
const updateEmployee = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'role', 'contact_details']; // Allowed fields for update
  
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }
  
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.employeeId, req.body, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(updatedEmployee);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating employee' });
    }
}

// Delete (DELETE)
const deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.employeeId);
        if (!deletedEmployee) {
          return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting employee' });
      }
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};
