const express = require('express');

const router = express.Router();

// Read (GET) all menus
router.get('/', async (req, res) => {
  
});

// Read (GET) specific menu by ID
router.get('/:menuId', async (req, res) => {
  
});

// Create (POST) new menu
router.post('/', async (req, res) => {
  
});

// Update (PUT) existing menu
router.put('/:menuId', async (req, res) => {
  
});

// Delete (DELETE) menu
router.delete('/:menuId', async (req, res) => {
  
});

// Read (GET) all menu items within a specific menu
router.get('/:menuId/items', async (req, res) => {
  
});

// Read (GET) specific menu item by ID within a menu
router.get('/:menuId/items/:itemId', async (req, res) => {
  
});

// Create (POST) new menu item within a specific menu
router.post('/:menuId/items', async (req, res) => {
  
});

// Update (PUT) details of an existing menu item
router.put('/:menuId/items/:itemId', async (req, res) => {
  
});

// Delete (DELETE) menu item
router.delete('/:menuId/items/:itemId', async (req, res) => {
  
});

// Read (GET) all menu categories
router.get('/menu-category/', async (req, res) => {
  
});

// Read (GET) specific menu category by ID
router.get('/menu-category/:categoryId', async (req, res) => {
  
});

// Create (POST) new menu category
router.post('/menu-category/', async (req, res) => {
  
});

// Update (PUT) existing menu category
router.put('/menu-category/:categoryId', async (req, res) => {
  
});

// Delete (DELETE) menu category
router.delete('/menu-category/:categoryId', async (req, res) => {

});

module.exports = router;
