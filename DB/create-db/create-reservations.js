const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js
const { Guest, Room, Reservation } = require('./schemas');

// Replace with your actual MongoDB connection URI
const mongoURI = 'mongodb+srv://affansharief999:wS6XoFmJOjaIfMqj@resortcrm.nlapvvd.mongodb.net/resort_crm?retryWrites=true&w=majority&appName=resortCRM';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

//   const GuestSchema = mongoose.model('Guest', Guest); // Assuming you have a Guest model defined
//   const RoomSchema = mongoose.model('Room', Room); // Assuming you have a Room model defined
//   const Reservation = mongoose.model('Reservation', Reservation);

  function generateStatus() {
    const preferences = ['confirmed', 'pending'];
    const randomIndex = Math.floor(Math.random() * preferences.length);
    return preferences[randomIndex];
  }

  // Function to generate random reservation data
  function generateReservationData() {
    const checkInDate = faker.date.future({ days: Math.floor(Math.random() * 30) }); // Random future date within 30 days
    const duration = Math.floor(Math.random() * 3) + 1; // Stay duration between 1 and 3 days
    const checkOutDate = new Date(checkInDate.getTime() + (duration * 24 * 60 * 60 * 1000)); // Calculate check-out date
  
    return {
      guest_id: Guest._id || new mongoose.Types.ObjectId(), // Assuming you have Guest data or generate it beforehand
      room_id: Room._id || new mongoose.Types.ObjectId(), // Assuming you have Room data or generate it beforehand
      check_in: checkInDate,
      check_out: checkOutDate,
      adults: Math.floor(Math.random() * 4) + 1, // Number of adults between 1 and 4
      children: Math.floor(Math.random() * 2), // Number of children (0 or 1)
      total_price: faker.commerce.price(), // Random price between $100 and $1000
      status: generateStatus(), // Random status between 'confirmed' and 'pending'
    };
  }
  
  // Create 50 dummy reservation records
  const createReservations = async () => {
    const reservations = [];
    for (let i = 0; i < 50; i++) {
      reservations.push(generateReservationData());
    }
  
    try {
      await Reservation.insertMany(reservations);
      console.log('50 reservation records created successfully!');
    } catch (err) {
      console.error('Error creating reservation records:', err);
    } finally {
      mongoose.connection.close();
    }
  };
  
  // Ensure Guest and Room models have data (or generate dummy data for them beforehand)
  // This avoids potential errors if Guest or Room data is missing
  
  // ... Your code to ensure Guest and Room data exist (if needed) ...
  
  createReservations();

