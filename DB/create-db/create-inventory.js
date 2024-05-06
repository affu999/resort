const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js
const { Inventory } = require('./schemas');

// Replace with your actual MongoDB connection URI
const mongoURI = 'mongodb+srv://affansharief999:wS6XoFmJOjaIfMqj@resortcrm.nlapvvd.mongodb.net/resort_crm?retryWrites=true&w=majority&appName=resortCRM';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  function generateCategories(categories) {
    const preferences = categories;
    const randomIndex = Math.floor(Math.random() * preferences.length);
  
    return preferences[randomIndex];
  }

// Function to generate random inventory data
function generateInventoryData() {
    const categories = ['Electronics', 'Clothing', 'Stationery', 'Office Supplies', 'Household']; // Define your inventory categories
  
    return {
      name: faker.commerce.productName(),
      category: generateCategories(categories),
      stock_level: Math.floor(Math.random() * 100) + 1, // Stock level between 1 and 100
      reorder_level: Math.floor(Math.random() * 50), // Reorder level between 0 and 49 (should be lower than stock level)
    };
  }
  
  // Create 50 dummy inventory records
  const createInventory = async () => {
    const inventoryItems = [];
    for (let i = 0; i < 50; i++) {
      inventoryItems.push(generateInventoryData());
    }
  
    try {
      await Inventory.insertMany(inventoryItems);
      console.log('50 inventory records created successfully!');
    } catch (err) {
      console.error('Error creating inventory records:', err);
    } finally {
      mongoose.connection.close();
    }
  };
  
  createInventory();