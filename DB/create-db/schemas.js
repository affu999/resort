const mongoose = require('mongoose');

// Guest Schema
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

// Reservation Schema
const reservationSchema = new mongoose.Schema({
  guest_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: true,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  check_in: {
    type: Date,
    required: true,
  },
  check_out: {
    type: Date,
    required: true,
  },
  adults: {
    type: Number,
    required: true,
  },
  children: {
    type: Number,
    default: 0,
  },
  total_price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['confirmed', 'pending', 'cancelled'],
    default: 'confirmed',
  },
  payment_details: {
    type: Object,
  },
});

// Room Schema
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

// Employee Schema
const employeeSchema = new mongoose.Schema({
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
  role: String,
  department: String,
});

// Inventory Schema
const inventorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  stock_level: {
    type: Number,
    required: true,
  },
  reorder_level: Number,
});

// Menu Schema
const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  items: [
    {
      name: {
        type: String,
        required: true,
      },
      description: String,
      price: {
        type: Number,
        required: true,
      },
      image: String,
    },
  ],
});

// Facility Schema
const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  capacity: Number,
  availability: {
    type: Boolean,
    default: true,
  },
  schedule: {
    type: Object,
  },
});

// Export the models
module.exports = {
  Guest: mongoose.model('Guest', guestSchema),
  Reservation: mongoose.model('Reservation', reservationSchema),
  Room: mongoose.model('Room', roomSchema),
  Employee: mongoose.model('Employee', employeeSchema),
  Inventory: mongoose.model('Inventory', inventorySchema),
  Menu: mongoose.model('Menu', menuSchema),
  Facility: mongoose.model('Facility', facilitySchema),
};