const express = require('express');

const router = express.Router();

// Read (GET) all inventory items
router.get('/', async (req, res) => {
  
});

// Read (GET) specific inventory item by ID
router.get('/:itemId', async (req, res) => {
  
});

// Create (POST) new inventory item
router.post('/', async (req, res) => {
  
});

// Update (PUT) existing inventory item
router.put('/:itemId', async (req, res) => {
  
});

// Delete (DELETE) inventory item
router.delete('/:itemId', async (req, res) => {
  
});

// Read (GET) stock level for a specific inventory item
router.get('/:itemId/stock', async (req, res) => {
    
});

// Update (PUT) stock level for a specific inventory item
router.put('/:itemId/stock', async (req, res) => {

});

// Read (GET) all inventory categories
router.get('/inventory-category', async (req, res) => {
    
  });
  
  // Read (GET) specific inventory category by ID
  router.get('/inventory-category/:categoryId', async (req, res) => {
    
  });
  
  // Create (POST) new inventory category
  router.post('/inventory-category', async (req, res) => {
    
  });
  
  // Update (PUT) existing inventory category
  router.put('/inventory-category/:categoryId', async (req, res) => {
    
  });
  
  // Delete (DELETE) inventory category
  router.delete('/inventory-category/:categoryId', async (req, res) => {
    
  });

module.exports = router;
