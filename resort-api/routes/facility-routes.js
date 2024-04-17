const express = require('express');
const { getAllFacilities, getFacilityById, createFacility, updateFacility, deleteFacility } = require('../controllers/facilities-controller');

const router = express.Router();

// Read (GET) all facilities with pagination (optional)
router.get('/', async (req, res) => {
  getAllFacilities(req, res);
});

// Read (GET) specific facility by ID
router.get('/:facilityId', async (req, res) => {
  getFacilityById(req, res);
});

// Create (POST) new facility
router.post('/', async (req, res) => {
  createFacility(req, res);
});

// Update (PUT) existing facility
router.put('/:facilityId', async (req, res) => {
  updateFacility(req, res);
});

// Delete (DELETE) facility (consider soft delete)
router.delete('/:facilityId', async (req, res) => {
  deleteFacility(req, res);
});

// Read (GET) all facility types
router.get('/facility-type', async (req, res) => {
  
});

// Read (GET) specific facility type by ID
router.get('/facility-type/:typeId', async (req, res) => {
  
});

// Create (POST) new facility type
router.post('/facility-type', async (req, res) => {
  
});

// Update (PUT) existing facility type
router.put('/facility-type/:typeId', async (req, res) => {
  
});

// Delete (DELETE) facility type
router.delete('/facility-type/:typeId', async (req, res) => {
  
});

// Read (GET) all locations
router.get('/locations', async (req, res) => {
  
});

// Read (GET) specific location by ID
router.get('/locations/:locationId', async (req, res) => {
  
});

// Create (POST) new location
router.post('/locations', async (req, res) => {
  
});

// Update (PUT) existing location
router.put('/locations/:locationId', async (req, res) => {
  
});

// Delete (DELETE) location
router.delete('/locations/:locationId', async (req, res) => {
  
});

// Read (GET) all maintenance requests with filtering (optional)
router.get('/maintenance', async (req, res) => {
  
});

// Read (GET) specific maintenance request by ID
router.get('/maintenance/:requestId', async (req, res) => {
  
});

// Create (POST) new maintenance request
router.post('/maintenance', async (req, res) => {
  
});

// Update (PUT) existing maintenance request (status, notes, etc.)
router.put('/maintenance/:requestId', async (req, res) => {
  
});

// Delete (DELETE) or Close/Cancel a maintenance request
router.delete('/maintenance/:requestId', async (req, res) => {
  
});

// Read (GET) all inventory items for a facility
router.get('/:facilityId/inventory', async (req, res) => {
  
});

// Read (GET) specific inventory item within a facility
router.get('/:facilityId/inventory/:itemId', async (req, res) => {
  
});

// Create (POST) new inventory item for a facility
router.post('/:facilityId/inventory', async (req, res) => {
  
});

// Update (PUT) details of an existing inventory item
router.put('/:facilityId/inventory/:itemId', async (req, res) => {
  
});

// Delete (DELETE) inventory item (consider soft delete)
router.delete('/:facilityId/inventory/:itemId', async (req, res) => {
  
});

module.exports = router;
