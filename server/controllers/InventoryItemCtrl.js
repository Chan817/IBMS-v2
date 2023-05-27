const mongoose = require("mongoose");
const InventoryItem = require("../models/inventoryitem");

module.exports = class InventoryItemController {
  // Fetch all inventory items
  static async fetchAllInventoryItems(req, res) {
    try {
      const inventoryItems = await InventoryItem.find();
      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Fetch all raw material
  static async fetchAllRaw(req, res) {
    try {
      const inventoryItems = await InventoryItem.find({ Inv_Catg: "raw" });
      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Fetch all neksom products
  static async fetchAllProduct(req, res) {
    try {
      const inventoryItems = await InventoryItem.find({ Inv_Catg: "neksom" });
      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Fetch inventory item by ID
  static async fetchInventoryItemByID(req, res) {
    const id = req.params.id;
    try {
      const inventoryItem = await InventoryItem.findById(id);
      res.status(200).json(inventoryItem);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Create an inventory item
  static async createInventoryItem(req, res) {
    const inventoryItem = req.body;
    console.log('in console')
    try {
      await InventoryItem.create(inventoryItem);
      console.log("created inventory item");
      res.status(201).json({ message: "Inventory item created successfully!" });
    } catch (err) {
      console.error("Error creating inventory item:", err);
      res.status(400).json({ message: err.message });
    }
  }

  // Update an inventory item
  static async updateInventoryItem(req, res) {
    const id = req.params.id;
    const newInventoryItem = req.body;
    try {
      const updatedInventoryItem = await InventoryItem.findByIdAndUpdate(
        id,
        newInventoryItem,
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Inventory item updated successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Delete an inventory item
  static async deleteInventoryItem(req, res) {
    const id = req.params.id;
    try {
      await InventoryItem.findByIdAndDelete(id);
      res.status(200).json({ message: "Inventory item deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
