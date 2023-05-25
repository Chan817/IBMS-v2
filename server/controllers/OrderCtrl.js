const Customer = require("../models/customer");
const Order = require("../models/order");

module.exports = class API {
    //fetch all Order
    static async fetchAllOrder(req, res) {
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    //fetch Order by ID
    static async fetchOrderByID(req, res) {
        const id = req.params.id;
        try {
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch {
            res.status(404).json({ message: err.message });
        }
    }

    //create a Order
    static async createOrder(req, res) {
        const order = req.body;
        try {
            // Check if the customer already exists in the database
            const existingCustomer = await Customer.findOne({ customer_email: order.customer_email });
            if (existingCustomer) {
                order.customer_ID = existingCustomer._id;
            } else{
                const customer = await Customer.create(order); // Create the customer and get the created instance
            order.customer_ID = customer._id; // Assign the CustomerID attribute from the customer instance
            }
            await Order.create(order);

            res.status(201).json({ message: "Order created successfully!" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }

    //update a Order
    static async updateOrder(req, res) {
        const id = req.params.id;
        const newOrder = req.body;
        try {
            console.log('Before update:', newOrder);
            const updatedOrder = await Order.findByIdAndUpdate(id, newOrder);
            console.log('After update:', updatedOrder);
            res.status(200).json({ message: 'Order updated successfully!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    //delete a Order
    static async deleteOrder(req, res) {
        const id = req.params.id;
    try {
      await Order.findByIdAndDelete(id);
      res.status(200).json({ message: "Order deleted successfully!" });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
    }
}