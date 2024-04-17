const express = require('express');
const { getAllInventoryItems, getInventoryItemById, createInventoryItem, updateInventoryItem, deleteInventoryItem, getinventoryStockLvl, updateInventoryStockLvl, getInventoryCategory, getAllInventoryCategory, createInventoryCategory, updateInventoryCategory, deleteInventoryCategory } = require('../controllers/inventory-controller');

const router = express.Router();

// Read (GET) all inventory items
router.get('/', async (req, res) => {
  getAllInventoryItems(req, res);
});

// Read (GET) specific inventory item by ID
router.get('/:itemId', async (req, res) => {
  getInventoryItemById(req, res);
});

// Create (POST) new inventory item
router.post('/', async (req, res) => {
  createInventoryItem(req, res);
});

// Update (PUT) existing inventory item
router.put('/:itemId', async (req, res) => {
  updateInventoryItem(req, res);
});

// Delete (DELETE) inventory item
router.delete('/:itemId', async (req, res) => {
  deleteInventoryItem(req, res);
});

// Read (GET) stock level for a specific inventory item
router.get('/:itemId/stock', async (req, res) => {
    getinventoryStockLvl(req, res);
});

// Update (PUT) stock level for a specific inventory item
router.put('/:itemId/stock', async (req, res) => {
  updateInventoryStockLvl(req, res);
});

// Read (GET) all inventory categories
router.get('/inventory-category', async (req, res) => {
  getAllInventoryCategory(req, res);
});
  
// Read (GET) specific inventory category by ID
router.get('/inventory-category/:categoryId', async (req, res) => {
  getInventoryItemById(req, res);
});
  
// Create (POST) new inventory category
router.post('/inventory-category', async (req, res) => {
  createInventoryCategory(req, res);
});

// Update (PUT) existing inventory category
router.put('/inventory-category/:categoryId', async (req, res) => {
  updateInventoryCategory(req, res);
});

// Delete (DELETE) inventory category
router.delete('/inventory-category/:categoryId', async (req, res) => {
  deleteInventoryCategory(req, res);
});

module.exports = router;
