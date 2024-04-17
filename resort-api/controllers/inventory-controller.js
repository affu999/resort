const { Inventory } = require('../models/resort.model');

// Read (GET) all inventory items
const getAllInventoryItems = async (req, res) => {
    try {
        const items = await Inventory.find({})
          .populate('category', 'name'); // Populate category details (optional)
        res.json(items);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving inventory items' });
      }
}

// Read (GET) specific inventory item by ID
const getInventoryItemById = async (req, res) => {
    try {
        const item = await Inventory.findById(req.params.itemId)
          .populate('category', 'name'); // Populate category details (optional)
        if (!item) {
          return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json(item);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving inventory item' });
      }
}

// Create (POST) new inventory item
const createInventoryItem = async (req, res) => {
    try {
        const newItem = new Inventory(req.body);
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating inventory item' });
      }
}

// Update (PUT) existing inventory item
const updateInventoryItem = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'category', 'unitPrice', 'stock']; // Allowed fields for update
  
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }
  
    try {
      const updatedItem = await Inventory.findByIdAndUpdate(
        req.params.itemId,
        req.body,
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
      res.json(updatedItem);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating inventory item' });
    }
}

// Delete (DELETE) inventory item
const deleteInventoryItem = async (req, res) => {
    try {
        const deletedItem = await Inventory.findByIdAndDelete(req.params.itemId);
        if (!deletedItem) {
          return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json({ message: 'Inventory item deleted' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting inventory item' });
      }
}

// Read (GET) stock level for a specific inventory item
const getinventoryStockLvl = async (req, res) => {
    try {
        const item = await InventoryItem.findById(req.params.itemId);
        if (!item) {
          return res.status(404).json({ message: 'Inventory item not found' });
        }
        res.json({ stock: item.stock }); // Assuming 'stock' property exists
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving stock level' });
      }
}
  
// Update (PUT) stock level for a specific inventory item
const updateInventoryStockLvl = async (req, res) => {
    const { adjustment } = req.body; // Assuming request body contains 'adjustment' value
  
    if (!adjustment || typeof adjustment !== 'number') {
      return res.status(400).json({ message: 'Invalid adjustment value' });
    }
  
    try {
      const item = await InventoryItem.findById(req.params.itemId);
      if (!item) {
        return res.status(404).json({ message: 'Inventory item not found' });
      }
  
      const newStock = item.stock + adjustment;
      if (newStock < 0) {
        return res.status(400).json({ message: 'Insufficient stock for negative adjustment' });
      }
  
      item.stock = newStock;
      await item.save();
      res.json({ stock: newStock });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating stock level' });
    }
}

// Read (GET) all inventory categories
const getAllInventoryCategory = async (req, res) => {
    try {
        const categories = await InventoryCategory.find({});
        res.json(categories);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving inventory categories' });
      }
}
  
// Read (GET) specific inventory category by ID
const getInventoryCategoryById = async (req, res) => {
    try {
        const category = await InventoryCategory.findById(req.params.categoryId);
        if (!category) {
          return res.status(404).json({ message: 'Inventory category not found' });
        }
        res.json(category);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving inventory category' });
      }
}
  
// Create (POST) new inventory category
const createInventoryCategory = async (req, res) => {
    try {
        const newCategory = new InventoryCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating inventory category' });
      }
}
  
// Update (PUT) existing inventory category
const updateInventoryCategory = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description']; // Allowed fields for update
  
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid update fields' });
    }
  
    try {
      const updatedCategory = await InventoryCategory.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: 'Inventory category not found' });
      }
      res.json(updatedCategory);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: 'Error updating inventory category' });
    }
}
  
// Delete (DELETE) inventory category
const deleteInventoryCategory = async (req, res) => {
    try {
        const deletedCategory = await InventoryCategory.findByIdAndDelete(req.params.categoryId);
        if (!deletedCategory) {
          return res.status(404).json({ message: 'Inventory category not found' });
        }
        res.json({ message: 'Inventory category deleted' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting inventory category' });
      }
}

module.exports = {
    getAllInventoryItems,
    getInventoryItemById,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getinventoryStockLvl,
    updateInventoryStockLvl,
    getAllInventoryCategory,
    getInventoryCategoryById,
    createInventoryCategory,
    updateInventoryCategory,
    deleteInventoryCategory
};
