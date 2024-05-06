const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Import faker from faker-js
const { Menu } = require('./schemas');

// Replace with your actual MongoDB connection URI

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));


  function generateCategories(categories) {
    const preferences = categories;
    const randomIndex = Math.floor(Math.random() * preferences.length);
  
    return preferences[randomIndex];
  }
  
// Function to generate a random menu item
function generateMenuItemData(index) {
    const dishes = [
        "Pizza", "Pasta", "Hamburger", "Sushi", "Burrito",
        "Tacos", "Chicken Curry", "Fried Rice", "Soup", "Salad",
        "Sandwich", "Steak", "Fish and Chips", "Spring Rolls", "Noodles",
        "Mac and Cheese", "Lasagna", "Pad Thai", "Falafel", "Hummus",
        "Guacamole", "Tom Yum Soup", "Ramen", "Pho", "Dumplings",
        "Currywurst", "Bibimbap", "Pot Roast", "Shepherd's Pie", "Moussaka",
        "Ratatouille", "Paella", "Jambalaya", "Gumbo", "Etouffee",
        "Tacos al Pastor", "Coq au Vin", "Beef Wellington", "Chicken Kiev",
        "Wellington", "Tournedos Rossini", "Filet Mignon", "Chateaubriand",
        "Crêpes", "Waffles", "Pancakes", "French Toast", "Ice Cream",
        "Cake", "Pie", "Cookies", "Brownies", "Donuts"
      ];
    return {
      name: dishes[index],
      description: faker.lorem.paragraph(2), // Generate a 2-paragraph description
      price: faker.commerce.price(), // Random price between $5 and $25
      image: faker.image.url(320, 240, 'food'), // Generate a random food image URL
    };
  }
  
  // Function to generate random menu data
  function generateMenuData() {
    const categories = ['Starters', 'Main Courses', 'Desserts', 'Drinks']; // Define your menu categories
    const numItems = Math.floor(Math.random() * 5) + 1; // Number of items between 1 and 5
  
    const items = [];
    for (let i = 0; i < numItems; i++) {
      items.push(generateMenuItemData(i));
    }
  
    return {
      name: faker.company.catchPhrase(), // Menu name as a catchy phrase
      category: generateCategories(categories),
      items,
    };
  }
  
  // Create 50 dummy menu records
  const createMenus = async () => {
    const menus = [];
    for (let i = 0; i < 50; i++) {
      menus.push(generateMenuData());
    }
  
    try {
      await Menu.insertMany(menus);
      console.log('50 menu records created successfully!');
    } catch (err) {
      console.error('Error creating menu records:', err);
    } finally {
      mongoose.connection.close();
    }
  };
  
  createMenus();
