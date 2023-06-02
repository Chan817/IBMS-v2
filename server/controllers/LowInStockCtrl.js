const InventoryItem = require("../models/inventoryitem");

class LowInStockController {
  static async fetchAllNotification(req, res) {
    try {
      const inventoryItems = await InventoryItem.find();

      // Filter inventory items that have low stock
      const lowStockItems = inventoryItems.filter(item => item.Inv_StockLevel < item.Inv_MinStockLevel);

      // Create notifications for low stock items
      const notifications = lowStockItems.map(item => ({
        itemId: item._id,
        itemName: item.Inv_Name,
        message: `Low stock alert: ${item.Inv_Name} has ${item.Inv_StockLevel} items remaining (min: ${item.Inv_MinStockLevel})`
      }));
      res.status(200).json(notifications);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchLowInStockProduct(req, res) {
    try {
      const inventoryItems = await InventoryItem.find({ Inv_Catg: "neksom" });

      // Filter inventory items that have low stock
      const lowStockItems = inventoryItems.filter(item => item.Inv_StockLevel < item.Inv_MinStockLevel);
      
      // Add the status attribute based on the Inv_StockLevel value
      const itemsWithStatus = lowStockItems.map(item => ({
        ...item.toObject(),
        status: item.Inv_StockLevel === 0 ? "Out of stock" : "Low in Stock"
      }));

      console.log(itemsWithStatus);

      res.status(200).json(itemsWithStatus);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  static async fetchLowInStockRaw(req, res) {
    try {
      const inventoryItems = await InventoryItem.find({ Inv_Catg: "raw" });

      // Filter inventory items that have low stock
      const lowStockItems = inventoryItems.filter(item => item.Inv_StockLevel < item.Inv_MinStockLevel);

      // Add the status attribute based on the Inv_StockLevel value
      const itemsWithStatus = lowStockItems.map(item => ({
        ...item.toObject(),
        status: item.Inv_StockLevel === 0 ? "Out of stock" : "Low in Stock"
      }));

      console.log(itemsWithStatus);

      res.status(200).json(itemsWithStatus);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }


}

module.exports = LowInStockController;
