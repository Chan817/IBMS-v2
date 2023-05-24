const OrderedProduct = require("../models/orderedproduct");

module.exports = class OrderedProductController {
  // Fetch all ordered products
  static async fetchAllOrderedProducts(req, res) {
    try {
      const orderedProducts = await OrderedProduct.find();
      res.status(200).json(orderedProducts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Fetch ordered product by ID
  static async fetchOrderedProductByID(req, res) {
    const id = req.params.id;
    try {
      const orderedProduct = await OrderedProduct.findById(id);
      res.status(200).json(orderedProduct);
    } catch {
      res.status(404).json({ message: err.message });
    }
  }

  // Create an ordered product
  static async createOrderedProduct(req, res) {
    const orderedProduct = req.body;
    try {
      await OrderedProduct.create(orderedProduct);
      res.status(201).json({ message: "Ordered product created successfully!" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // Update an ordered product
  static async updateOrderedProduct(req, res) {
    const id = req.params.id;
    const newOrderedProduct = req.body;
    try {
      const updatedOrderedProduct = await OrderedProduct.findByIdAndUpdate(
        id,
        newOrderedProduct,
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Ordered product updated successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // Delete an ordered product
  static async deleteOrderedProduct(req, res) {
    const id = req.params.id;
    try {
      await OrderedProduct.findByIdAndDelete(id);
      res.status(200).json({ message: "Ordered product deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
