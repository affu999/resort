const express = require('express');
const { Menu } = require('../models/resort.model'); // Assuming model for menus

const router = express.Router();

// Read (GET) all menus
const getAllMenus = async (req, res) => {
    try {
        const menus = await Menu.find();
        res.json(menus);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving menus' });
      }
}

// Read (GET) specific menu by ID
const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
          return res.status(404).json({ message: 'Menu not found' });
        }
        res.json(menu);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving menu' });
      }
}

// Create (POST) a new menu
const createMenu = async (req, res) => {
    try {
        const newMenu = new Menu(req.body);
        const savedMenu = await newMenu.save();
        res.status(201).json(savedMenu);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating menu' });
      }
}

// Update (PUT) details of an existing menu
const updateMenu = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'items']; // Allowed fields for update

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
    return res.status(400).json({ message: 'Invalid update fields' });
    }

    try {
    const menu = await Menu.findByIdAndUpdate(req.params.menuId, req.body, { new: true });
    if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(menu);
    } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating menu' });
    }
}

// Delete (DELETE) a menu
const deleteMenu = async (req, res) => {
    try {
        const deletedMenu = await Menu.findByIdAndDelete(req.params.menuId);
        if (!deletedMenu) {
          return res.status(404).json({ message: 'Menu not found' });
        }
        res.json({ message: 'Menu deleted' });
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting menu' });
      }
}

const getAllMenuItems = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
          return res.status(404).json({ message: 'Menu not found' });
        }
        const items = await MenuItem.find({ menu: menu._id });
        res.json(items);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving menu items' });
      }
}
  
// Read (GET) specific menu item by its ID within a menu
const getMenuItemsById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
        }
        const item = await MenuItem.findOne({ _id: req.params.itemId, menu: menu._id });
        if (!item) {
        return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving menu item' });
    }
}

// Create (POST) a new menu item within a specific menu
const createMenuItem = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
        }
        const newItem = new MenuItem({ ...req.body, menu: menu._id });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating menu item' });
    }
}

// Update (PUT) details of an existing menu item
const updateMenuItem = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'price']; // Allowed fields for update
    
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).json({ message: 'Invalid update fields' });
    }
    
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
        }
        const updatedItem = await MenuItem.findOneAndUpdate(
        { _id: req.params.itemId, menu: menu._id },
        req.body,
        { new: true }
        );
        if (!updatedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating menu item' });
    }
}

// Delete (DELETE) a menu item
const deleteMenuItem = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.menuId);
        if (!menu) {
        return res.status(404).json({ message: 'Menu not found' });
        }
        const deletedItem = await MenuItem.findOneAndDelete({ _id: req.params.itemId, menu: menu._id });
        if (!deletedItem) {
        return res.status(404).json({ message: 'Menu item not found' });
        }
        res.json({ message: 'Menu item deleted' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting menu item' });
    }
}

// Read (GET) all menu categories
const getAllMenuCategories = async (req, res) => {
    try {
        const categories = await MenuCategory.find();
        res.json(categories);
      } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving menu categories' });
      }
}

// Read (GET) specific menu category by ID
const getMenuCategoryById = async (req, res) => {
    try {
        const category = await MenuCategory.findById(req.params.categoryId);
        if (!category) {
        return res.status(404).json({ message: 'Menu category not found' });
        }
        res.json(category);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving menu category' });
    }
}

// Create (POST) a new menu category
const createMenuCategory = async (req, res) => {
    try {
        const newCategory = new MenuCategory(req.body);
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(400).json({ message: 'Error creating menu category' });
    }
}

// Update (PUT) details of an existing menu category
const updateMenuCategory = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description']; // Allowed fields for update
    
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));
    if (!isValidUpdate) {
        return res.status(400).json({ message: 'Invalid update fields' });
    }
    
    try {
        const updatedCategory = await MenuCategory.findByIdAndUpdate(
        req.params.categoryId,
        req.body,
        { new: true }
        );
        if (!updatedCategory) {
        return res.status(404).json({ message: 'Menu category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating menu category' });
    }
}

// Delete (DELETE) a menu category
const deleteMenuCategory = async (req, res) => {
    try {
        const deletedCategory = await MenuCategory.findByIdAndDelete(req.params.categoryId);
        if (!deletedCategory) {
        return res.status(404).json({ message: 'Menu category not found' });
        }
        res.json({ message: 'Menu category deleted' });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting menu category' });
    }
}

module.exports = {
    getAllMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu,
    getAllMenuItems,
    getMenuItemsById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getAllMenuCategories,
    getMenuCategoryById,
    createMenuCategory,
    updateMenuCategory,
    deleteMenuCategory
};
