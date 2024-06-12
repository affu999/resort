const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js

// Replace with your actual MongoDB connection URI

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_details: {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
  },
  preferences: [String],
  stay_history: [
    {
      reservation_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation',
      },
      check_in: Date,
      check_out: Date,
    },
  ],
  loyalty_points: {
    type: Number,
    default: 0,
  },
});

const Guest = mongoose.model('Guest', guestSchema);

function generatePreferences() {
    const preferences = ['Quiet room', 'Early check-in', 'Ocean view'];
    const selectedPreferences = [];
  
    // Select a random number of preferences (within bounds of the list)
    const numPreferences = Math.floor(Math.random() * preferences.length) + 1; // +1 to ensure at least one preference
  
    for (let i = 0; i < numPreferences; i++) {
      const randomIndex = Math.floor(Math.random() * preferences.length);
      selectedPreferences.push(preferences[randomIndex]);
    }
  
    return selectedPreferences;
  }

// Function to generate random guest data using faker-js
function generateGuestData() {
  return {
    name: faker.person.fullName(), // Using the correct faker-js function
    contact_details: {
      email: faker.internet.email(),
      phone: faker.phone.number(), // Using the correct faker-js function
    },
    preferences: generatePreferences(), // Using the updated function name
    stay_history: [], // Leave empty for dummy data
    loyalty_points: 0,
  };
}

// Create 50 dummy guest records
const createGuests = async () => {
  const guests = [];
  for (let i = 0; i < 50; i++) {
    guests.push(generateGuestData());
  }

  try {
    await Guest.insertMany(guests);
    console.log('50 guest records created successfully!');
  } catch (err) {
    console.error('Error creating guest records:', err);
  } finally {
    mongoose.connection.close();
  }
};

setTimeout(() => {
    createGuests();
}, 5000);

