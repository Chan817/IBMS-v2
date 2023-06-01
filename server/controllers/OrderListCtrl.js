const Customer = require("../models/customer");
const Order = require("../models/order");
const OrderedProduct = require('../models/orderedproduct');
const InventoryItem = require('../models/inventoryitem');

module.exports = class API {
    //fetch all order for OrderList
    static async fetchAllOrderList(req, res) {
        // try {
        //     const orders = await Order.find();
        //     res.status(200).json(orders);
        // } catch (err) {
        //     res.status(404).json({ message: err.message });
        // }
        try {
            const orders = await Order.find();

        // Create an array to store the updated orders with customer information
        const updatedOrders = [];

        // Iterate through each order
        for (const order of orders) {
            // Retrieve the customerId from the order
            const customerId = order.customer_ID;

            // Fetch the customer using the customerId
            const customer = await Customer.findById(customerId);

            // Retrieve the ordered products using the order ID
            const orderedProducts = await OrderedProduct.find({ order_ID: order.order_ID });
            console.log("orderedProducts");
            console.log(orderedProducts);

            // Add the customer information to the order object
            const orderWithCustomer = {
                ...order.toObject(),
                customer: customer,
                orderedProducts: orderedProducts,
            };

            // Add the updated order to the updatedOrders array
            updatedOrders.push(orderWithCustomer);
            console.log(updatedOrders);
        }
        res.status(200).json(updatedOrders);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}