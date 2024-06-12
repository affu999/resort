const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js
const {Employee} = require('./schemas');

// Replace with your actual MongoDB connection URI

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  function generateRoleDept(roleDept) {
    const preferences = roleDept;
    const randomIndex = Math.floor(Math.random() * preferences.length);
  
    return preferences[randomIndex];
  }

  // Function to generate random employee data
  function generateEmployeeData() {
    const roles = ['Software Engineer', 'Manager', 'Human Resources', 'Marketing', 'Sales']; // Define your employee roles
    const departments = ['Engineering', 'Management', 'Human Resources', 'Marketing', 'Sales']; // Define your departments
  
    return {
      name: faker.person.fullName(),
      contact_details: {
        email: faker.internet.email(),
        phone: faker.phone.number(),
      },
      role: generateRoleDept(roles),
      department: generateRoleDept(departments),
    };
  }
  
  // Create 50 dummy employee records
  const createEmployees = async () => {
    const employees = [];
    for (let i = 0; i < 50; i++) {
      employees.push(generateEmployeeData());
    }
  
    try {
      await Employee.insertMany(employees);
      console.log('50 employee records created successfully!');
    } catch (err) {
      console.error('Error creating employee records:', err);
    } finally {
      mongoose.connection.close();
    }
  };
  
  createEmployees();

