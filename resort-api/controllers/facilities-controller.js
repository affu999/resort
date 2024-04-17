const { Facility } = require('../models/resort.model'); // Assuming model for facilities

// Code pending for FacilityType, Location, Maintainance & Facility Inventory

// Read (GET) all facilities with pagination (optional)
const getAllFacilities = async (req, res) => {
    const { page = 1, limit = 10, ...query } = req.query; // Destructure query params for pagination and filtering

    try {
      const facilities = await Facility.find({}); // Assuming 'paginate' is a pagination library function
      res.json(facilities);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error retrieving facilities' });
    }
}

// Read (GET) specific facility by ID
const getFacilityById = async (req, res) => {
    try {
        const facility = await Facility.findById(req.params.facilityId);
        if (!facility) {
          return res.status(404).json({ message: 'Facility not found' });
        }
        res.json(facility);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving facility' });
      }
}

// Create (POST) new facility
const createFacility = async (req, res) => {
    try {
        const newFacility = new Facility(req.body);
        const savedFacility = await newFacility.save();
        res.status(201).json(savedFacility);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating facility' });
      }
}

// Update (PUT) existing facility
const updateFacility = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'type', 'location', 'capacity']; // Allowed fields for update
  
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }
  
    try {
      const updatedFacility = await Facility.findByIdAndUpdate(
        req.params.facilityId,
        req.body,
        { new: true }
      );
      if (!updatedFacility) {
        return res.status(404).json({ message: 'Facility not found' });
      }
      res.json(updatedFacility);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating facility' });
    }
}

// Delete (DELETE) facility (consider soft delete)
const deleteFacility = async (req, res) => {
    try {
        const facility = await Facility.findByIdAndDelete(req.params.facilityId);
        if (!facility) {
          return res.status(404).json({ message: 'Facility not found' });
        }
        // Implement soft delete logic here (e.g., setting a 'deleted' flag to true)
        // ...
        res.json({ message: 'Facility deleted (soft delete)' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting facility' });
      }
}

// Read (GET) all facility types
const getAllFacilityTypes = async (req, res) => {
    try {
        const types = await Facility.find({});
        res.json(types);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving facility types' });
      }
}
  
// Read (GET) specific facility type by ID
const getFacilityTypeById = async (req, res) => {
    try {
        const type = await Facility.findById(req.params.typeId);
        if (!type) {
          return res.status(404).json({ message: 'Facility type not found' });
        }
        res.json(type);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving facility type' });
      }
}
  
// Create (POST) new facility type
const createFacilityType = async (req, res) => {
    try {
        const newType = new Facility(req.body);
        const savedType = await newType.save();
        res.status(201).json(savedType);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating facility type' });
      }
}
  
// Update (PUT) existing facility type
const updateFacilityType = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description']; // Allowed fields for update
  
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }
  
    try {
      const updatedType = await Facility.findByIdAndUpdate(
        req.params.typeId,
        req.body,
        { new: true }
      );
      if (!updatedType) {
        return res.status(404).json({ message: 'Facility type not found' });
      }
      res.json(updatedType);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating facility type' });
    }
}
  
// Delete (DELETE) facility type
const deleteFacilityType = async (req, res) => {
    try {
        const type = await Facility.findById(req.params.typeId);
        if (!type) {
          return res.status(404).json({ message: 'Facility type not found' });
        }
    
        // Check for associated facilities before deletion
        const facilities = await Facility.find({ type: type._id }); // Assuming 'type' field references FacilityType model
    
        if (facilities.length > 0) {
          return res.status(400).json({ message: 'Facility type cannot be deleted, associated facilities exist' });
        }
    
        await Facility.findByIdAndDelete(req.params.typeId);
        res.json({ message: 'Facility type deleted' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting facility type' });
      }
}

module.exports = {
    getAllFacilities,
    getFacilityById,
    createFacility,
    updateFacility,
    deleteFacility,
    getAllFacilityTypes,
    getFacilityTypeById,
    createFacilityType,
    updateFacilityType,
    deleteFacilityType
};
