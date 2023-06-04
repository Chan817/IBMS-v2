const Customer = require("../models/customer");
const Order = require("../models/order");
const OrderedProduct = require('../models/orderedproduct');
const InventoryItem = require('../models/inventoryitem');

module.exports = class API {
    static async fetchAllOrderList(req, res) {
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
                const orderedProducts = await OrderedProduct.find({ Order_ID: order.order_ID });

                // Create an array to store the filtered ordered products with the specific order ID
                const filteredOrderedProducts = [];

                // Iterate through each ordered product
                for (const orderedProduct of orderedProducts) {
                    // Retrieve the inventory ID from the ordered product
                    const inventoryId = orderedProduct.Inventory_ID;

                    // Fetch the inventory item using the inventory ID
                    const inventoryItem = await InventoryItem.findById(inventoryId);

                    // Create an object with the required information
                    const orderedProductWithInventory = {
                        ...orderedProduct.toObject(),
                        inventoryItemName: inventoryItem.Inv_Name,
                    };

                    // Add the updated ordered product to the filteredOrderedProducts array
                    filteredOrderedProducts.push(orderedProductWithInventory);
                }

                // Add the customer information to the order object
                const orderWithCustomer = {
                    ...order.toObject(),
                    customer: customer,
                    orderedProducts: filteredOrderedProducts,
                };

                // Add the updated order to the updatedOrders array
                updatedOrders.push(orderWithCustomer);
            }

            res.status(200).json(updatedOrders);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async fetchAllPendingProduct(req, res) {
        try {
            const orders = await Order.find({ order_status: "Pending" });
            // Create an array to store the updated orders with customer information
            const updatedOrders = [];

            // Iterate through each order
            for (const order of orders) {
                // Retrieve the customerId from the order
                const customerId = order.customer_ID;

                // Fetch the customer using the customerId
                const customer = await Customer.findById(customerId);

                // Retrieve the ordered products using the order ID
                const orderedProducts = await OrderedProduct.find({ Order_ID: order.order_ID });

                // Create an array to store the filtered ordered products with the specific order ID
                const filteredOrderedProducts = [];

                // Iterate through each ordered product
                for (const orderedProduct of orderedProducts) {
                    // Retrieve the inventory ID from the ordered product
                    const inventoryId = orderedProduct.Inventory_ID;

                    // Fetch the inventory item using the inventory ID
                    const inventoryItem = await InventoryItem.findById(inventoryId);

                    // Create an object with the required information
                    const orderedProductWithInventory = {
                        ...orderedProduct.toObject(),
                        inventoryItemName: inventoryItem.Inv_Name,
                    };

                    // Add the updated ordered product to the filteredOrderedProducts array
                    filteredOrderedProducts.push(orderedProductWithInventory);
                }

                // Add the customer information to the order object
                const orderWithCustomer = {
                    ...order.toObject(),
                    customer: customer,
                    orderedProducts: filteredOrderedProducts,
                };

                // Add the updated order to the updatedOrders array
                updatedOrders.push(orderWithCustomer);
            }

            res.status(200).json(updatedOrders);

        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async fetchAllShippedProduct(req, res) {
        try {
            const orders = await Order.find({ order_status: "Shipped" });
            // Create an array to store the updated orders with customer information
            const updatedOrders = [];

            // Iterate through each order
            for (const order of orders) {
                // Retrieve the customerId from the order
                const customerId = order.customer_ID;

                // Fetch the customer using the customerId
                const customer = await Customer.findById(customerId);

                // Retrieve the ordered products using the order ID
                const orderedProducts = await OrderedProduct.find({ Order_ID: order.order_ID });

                // Create an array to store the filtered ordered products with the specific order ID
                const filteredOrderedProducts = [];

                // Iterate through each ordered product
                for (const orderedProduct of orderedProducts) {
                    // Retrieve the inventory ID from the ordered product
                    const inventoryId = orderedProduct.Inventory_ID;

                    // Fetch the inventory item using the inventory ID
                    const inventoryItem = await InventoryItem.findById(inventoryId);

                    // Create an object with the required information
                    const orderedProductWithInventory = {
                        ...orderedProduct.toObject(),
                        inventoryItemName: inventoryItem.Inv_Name,
                    };

                    // Add the updated ordered product to the filteredOrderedProducts array
                    filteredOrderedProducts.push(orderedProductWithInventory);
                }

                // Add the customer information to the order object
                const orderWithCustomer = {
                    ...order.toObject(),
                    customer: customer,
                    orderedProducts: filteredOrderedProducts,
                };

                // Add the updated order to the updatedOrders array
                updatedOrders.push(orderWithCustomer);
            }

            res.status(200).json(updatedOrders);

        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async fetchAllCancelledProduct(req, res) {
        try {
            const orders = await Order.find({ order_status: "Cancelled" });
            // Create an array to store the updated orders with customer information
            const updatedOrders = [];

            // Iterate through each order
            for (const order of orders) {
                // Retrieve the customerId from the order
                const customerId = order.customer_ID;

                // Fetch the customer using the customerId
                const customer = await Customer.findById(customerId);

                // Retrieve the ordered products using the order ID
                const orderedProducts = await OrderedProduct.find({ Order_ID: order.order_ID });

                // Create an array to store the filtered ordered products with the specific order ID
                const filteredOrderedProducts = [];

                // Iterate through each ordered product
                for (const orderedProduct of orderedProducts) {
                    // Retrieve the inventory ID from the ordered product
                    const inventoryId = orderedProduct.Inventory_ID;

                    // Fetch the inventory item using the inventory ID
                    const inventoryItem = await InventoryItem.findById(inventoryId);

                    // Create an object with the required information
                    const orderedProductWithInventory = {
                        ...orderedProduct.toObject(),
                        inventoryItemName: inventoryItem.Inv_Name,
                    };

                    // Add the updated ordered product to the filteredOrderedProducts array
                    filteredOrderedProducts.push(orderedProductWithInventory);
                }

                // Add the customer information to the order object
                const orderWithCustomer = {
                    ...order.toObject(),
                    customer: customer,
                    orderedProducts: filteredOrderedProducts,
                };

                // Add the updated order to the updatedOrders array
                updatedOrders.push(orderWithCustomer);
            }

            res.status(200).json(updatedOrders);

        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
    static async fetchAllCompletedProduct(req, res) {
        try {
            const orders = await Order.find({ order_status: "Completed" });
            // Create an array to store the updated orders with customer information
            const updatedOrders = [];

            // Iterate through each order
            for (const order of orders) {
                // Retrieve the customerId from the order
                const customerId = order.customer_ID;

                // Fetch the customer using the customerId
                const customer = await Customer.findById(customerId);

                // Retrieve the ordered products using the order ID
                const orderedProducts = await OrderedProduct.find({ Order_ID: order.order_ID });

                // Create an array to store the filtered ordered products with the specific order ID
                const filteredOrderedProducts = [];

                // Iterate through each ordered product
                for (const orderedProduct of orderedProducts) {
                    // Retrieve the inventory ID from the ordered product
                    const inventoryId = orderedProduct.Inventory_ID;

                    // Fetch the inventory item using the inventory ID
                    const inventoryItem = await InventoryItem.findById(inventoryId);

                    // Create an object with the required information
                    const orderedProductWithInventory = {
                        ...orderedProduct.toObject(),
                        inventoryItemName: inventoryItem.Inv_Name,
                    };

                    // Add the updated ordered product to the filteredOrderedProducts array
                    filteredOrderedProducts.push(orderedProductWithInventory);
                }

                // Add the customer information to the order object
                const orderWithCustomer = {
                    ...order.toObject(),
                    customer: customer,
                    orderedProducts: filteredOrderedProducts,
                };

                // Add the updated order to the updatedOrders array
                updatedOrders.push(orderWithCustomer);
            }

            res.status(200).json(updatedOrders);

        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

}
