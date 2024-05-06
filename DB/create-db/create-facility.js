const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js
const { Facility } = require('./schemas');

// Replace with your actual MongoDB connection URI
const mongoURI = 'mongodb+srv://affansharief999:wS6XoFmJOjaIfMqj@resortcrm.nlapvvd.mongodb.net/resort_crm?retryWrites=true&w=majority&appName=resortCRM';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  function generateAvailability(availability) {
    const preferences = availability;
    const randomIndex = Math.floor(Math.random() * preferences.length);
  
    return preferences[randomIndex];
  }

  function generateScheduleData() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const openingHours = Math.floor(Math.random() * 12) + 8; // Opening hours between 8 and 19
    const closingHours = openingHours + Math.floor(Math.random() * 8) + 1; // Closing hours between opening hours + 1 and 23
  
    const schedule = {};
    days.forEach(day => {
      schedule[day] = {
        open: openingHours,
        close: closingHours,
      };
    });
  
    return schedule;
  }
  
  // Function to generate random facility data
  function generateFacilityData() {
    const facilityTypes = ['Meeting Room', 'Conference Hall', 'Classroom', 'Gymnasium', 'Auditorium']; // Define facility types
  
    return {
      name: faker.company.name() + ' ' + faker.location.streetAddress(), // Combine company name and address for unique names
      description: faker.lorem.paragraph(2), // Generate a 2-paragraph description
      capacity: Math.floor(Math.random() * 100) + 10, // Capacity between 10 and 100
      availability: generateAvailability([true, false]), // Random availability (true or false)
      schedule: generateScheduleData(),
    };
  }
  
  // Create 50 dummy facility records
  const createFacilities = async () => {
    const facilities = [];
    for (let i = 0; i < 50; i++) {
      facilities.push(generateFacilityData());
    }
  
    try {
      await Facility.insertMany(facilities);
      console.log('50 facility records created successfully!');
    } catch (err) {
      console.error('Error creating facility records:', err);
    } finally {
      mongoose.connection.close();
    }
  };
  
  createFacilities();