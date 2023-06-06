const mongoose = require("mongoose");
const InventoryItem = require("../models/inventoryitem");
const fs = require('fs');
const OrderedProduct = require("../models/orderedproduct");
const Order = require("../models/order");

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

  // Fetch inventory item by barcode scanned
  static async fetchProductByBarcodeNum(req, res) {
    const barcodeNum = req.params.barcodeNum;
    try {
      const product = await InventoryItem.findOne({ Inv_BarcodeNum: barcodeNum });
      
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: "Product not found." });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  

  // Create an inventory item
  static async createInventoryItem(req, res) {
    console.log("Print Req Body");
    console.log(req.body);
    const inventoryItem = req.body;
    const imageName = req.file ? req.file.filename : null;
    inventoryItem.InvImg = imageName;
    console.log(imageName)
    console.log('in console')
    try {
      await InventoryItem.create(inventoryItem);
      console.log(inventoryItem);
      res.status(201).json({ message: "Inventory item created successfully!" });
    } catch (err) {
      console.error("Error creating inventory item:", err);
      res.status(400).json({ message: err.message });
    }
  }

  // Update an inventory item
  static async updateInventoryItem(req, res) {
    const id = req.params.id;
    let new_image = "";
    if (req.file) {
      new_image = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_image);
      } catch (error) {
        console.log(error);
      }
    } else {
      new_image = req.body.old_image;
    }

    const newInventoryItem = req.body;
    console.log("req.body",req.body);
    newInventoryItem.InvImg = new_image;
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

  // Fetch inventory items with total sale
  static async fetchInventoryItemsWithTotalSale(req, res) {
    try {
      const inventoryItems = await InventoryItem.find().lean();

      for (let item of inventoryItems) {
        const totalSale = await OrderedProduct.aggregate([
          { $match: { Inventory_ID: mongoose.Types.ObjectId(item._id) } }, // Convert to ObjectId
          { $group: { _id: "$Inventory_ID", totalSale: { $sum: "$Op_Qty" } } },
        ]);

        item.totalSale = totalSale.length > 0 ? totalSale[0].totalSale : 0;
      }

      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }


  // Fetch inventory items with total sale for the last week
  static async fetchWeeklyData(req, res) {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const inventoryItems = await InventoryItem.aggregate([
        {
          $lookup: {
            from: "orderedproducts",
            localField: "_id",
            foreignField: "Inventory_ID",
            as: "orderedProducts"
          }
        },
        {
          $unwind: "$orderedProducts"
        },
        {
          $lookup: {
            from: "orders",
            localField: "orderedProducts.Order_ID",
            foreignField: "order_ID",
            as: "order"
          }
        },
        {
          $unwind: "$order"
        },
        {
          $match: {
            "order.order_Date": { $gte: oneWeekAgo }
          }
        },
        {
          $group: {
            _id: "$_id",
            Inv_SKU_Num: { $first: "$Inv_SKU_Num" },
            Inv_Name: { $first: "$Inv_Name" },
            totalSale: { $sum: "$orderedProducts.Op_Qty" }
          }
        },
        {
          $project: {
            _id: 1,
            Inv_SKU_Num: 1,
            Inv_Name: 1,
            totalSale: 1
          }
        }
      ]);

      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Fetch inventory items with total sale for the last month
  static async fetchMonthlyData(req, res) {
    try {
      const oneMonthAgo = new Date();
      oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);

      const inventoryItems = await InventoryItem.aggregate([
        {
          $lookup: {
            from: "orderedproducts",
            localField: "_id",
            foreignField: "Inventory_ID",
            as: "orderedProducts"
          }
        },
        {
          $unwind: "$orderedProducts"
        },
        {
          $lookup: {
            from: "orders",
            localField: "orderedProducts.Order_ID",
            foreignField: "order_ID",
            as: "order"
          }
        },
        {
          $unwind: "$order"
        },
        {
          $match: {
            "order.order_Date": { $gte: oneMonthAgo }
          }
        },
        {
          $group: {
            _id: "$_id",
            Inv_SKU_Num: { $first: "$Inv_SKU_Num" },
            Inv_Name: { $first: "$Inv_Name" },
            totalSale: { $sum: "$orderedProducts.Op_Qty" }
          }
        },
        {
          $project: {
            _id: 1,
            Inv_SKU_Num: 1,
            Inv_Name: 1,
            totalSale: 1
          }
        }
      ]);

      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
  // Fetch inventory items with total sale for the last year
  static async fetchYearlyData(req, res) {
    try {
      const oneYearAgo = new Date();
      oneYearAgo.setDate(oneYearAgo.getDate() - 365);

      const inventoryItems = await InventoryItem.aggregate([
        {
          $lookup: {
            from: "orderedproducts",
            localField: "_id",
            foreignField: "Inventory_ID",
            as: "orderedProducts"
          }
        },
        {
          $unwind: "$orderedProducts"
        },
        {
          $lookup: {
            from: "orders",
            localField: "orderedProducts.Order_ID",
            foreignField: "order_ID",
            as: "order"
          }
        },
        {
          $unwind: "$order"
        },
        {
          $match: {
            "order.order_Date": { $gte: oneYearAgo }
          }
        },
        {
          $group: {
            _id: "$_id",
            Inv_SKU_Num: { $first: "$Inv_SKU_Num" },
            Inv_Name: { $first: "$Inv_Name" },
            totalSale: { $sum: "$orderedProducts.Op_Qty" }
          }
        },
        {
          $project: {
            _id: 1,
            Inv_SKU_Num: 1,
            Inv_Name: 1,
            totalSale: 1
          }
        }
      ]);

      res.status(200).json(inventoryItems);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
