const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js

// Replace with your actual MongoDB connection URI
const mongoURI = 'mongodb+srv://affansharief999:wS6XoFmJOjaIfMqj@resortcrm.nlapvvd.mongodb.net/resort_crm?retryWrites=true&w=majority&appName=resortCRM';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const roomSchema = new mongoose.Schema({
    room_type: {
      type: String,
      required: true,
    },
    description: String,
    capacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [String],
  });

const Room = mongoose.model('Room', roomSchema);

function generateRoomType() {
    const roomTypes = ['Single', 'Double', 'Suite', 'Family Room'];
    const randomIndex = Math.floor(Math.random() * roomTypes.length);
  
    return roomTypes[randomIndex];
  }

// Function to generate random room data
function generateRoomData() {
//   const roomTypes = ['Single', 'Double', 'Suite', 'Family Room']; // Define your room types

  return {
    room_type: generateRoomType(), // Random room type selection
    description: faker.lorem.paragraph(2), // Generate a 2-paragraph description
    capacity: Math.floor(Math.random() * 5) + 1, // Capacity between 1 and 5
    price: faker.commerce.price(), // Random price between $100 and $500
    images: [
      faker.image.url(640, 480, 'room'), // Generate a random room image URL
      faker.image.url(640, 480, 'room'), // Generate another random room image URL
    ],
  };
}

// Create 50 dummy room records
const createRooms = async () => {
  const rooms = [];
  for (let i = 0; i < 50; i++) {
    rooms.push(generateRoomData());
  }

  try {
    await Room.insertMany(rooms);
    console.log('50 room records created successfully!');
  } catch (err) {
    console.error('Error creating room records:', err);
  } finally {
    mongoose.connection.close();
  }
};

createRooms();

