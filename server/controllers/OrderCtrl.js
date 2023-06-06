const Customer = require("../models/customer");
const Order = require("../models/order");
const OrderedProduct = require('../models/orderedproduct');
const InventoryItem = require('../models/inventoryitem');

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
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    //create a Order
    static async createOrder(req, res) {
        console.log('Inside createOrder');
        const order = req.body;
        try {
            // Check if the customer already exists in the database
            const existingCustomer = await Customer.findOne({ customer_name: order.customer_name });
            if (existingCustomer) {
                if (existingCustomer.customer_name === order.customer_name && existingCustomer.customer_contact === order.customer_contact) {
                    order.customer_ID = existingCustomer._id;
                } else {
                    const customer = await Customer.create(order); // Create the customer and get the created instance
                    order.customer_ID = customer._id; // Assign the CustomerID attribute from the customer instance
                }
            } else {
                const customer = await Customer.create(order); // Create the customer and get the created instance
                order.customer_ID = customer._id; // Assign the CustomerID attribute from the customer instance
            }
            console.log('New Order:', order);
            await Order.create(order);

            // Create the ordered products
            const orderedProducts = await Promise.all(order.items.map(async (product) => {
                const invID = await InventoryItem.findOne({ Inv_Name: product.Inventory_ID });
                const orderedProduct = new OrderedProduct({
                    Inventory_ID: invID,
                    Order_ID: order.order_ID,
                    Op_Qty: product.Op_Qty,
                    Op_UnitPrice: product.Op_UnitPrice
                });

                await orderedProduct.save();
                return orderedProduct;
            }));

            await Promise.all(orderedProducts);


            res.status(201).json({ message: "Order created successfully!" });
        } catch (err) {
            console.error("Error creating inventory item:", err);
            res.status(400).json({ message: err.message });
        }
    }

    //update a Order
    static async updateOrder(req, res) {
        const id = req.params.id;
        console.log('req.body', req.body);
        const newOrder = req.body;
        try {
            const order = await Order.findById(id);

            // Fetch and delete all ordered products with matching Order_ID
            await OrderedProduct.deleteMany({ Order_ID: order.order_ID });
            console.log("delete all ordered products successfully");

            // // Create the latest ordered product
            // const orderedProduct = new OrderedProduct({
            //     Order_ID: newOrder.order_ID,
            //     Inventory_ID: newOrder.items.Inventory_ID,
            //     Op_Qty: newOrder.items.Op_Qty,
            //     Op_UnitPrice: newOrder.items.Op_UnitPrice
            // });
            // await orderedProduct.save();
            // Create the ordered products
            const orderedProducts = await Promise.all(
                newOrder.items.map(async (product) => {
                const invID = await InventoryItem.findOne({ 
                    Inv_Name: product.inventoryItemName 
                });
                if (invID) {
                    const orderedProduct = new OrderedProduct({
                      Inventory_ID: invID._id,
                      Order_ID: newOrder.order_ID,
                      Op_Qty: product.Op_Qty,
                      Op_UnitPrice: product.Op_UnitPrice
                    });
              
                    await orderedProduct.save();
                    console.log("Ordered product created", orderedProduct);
                    return orderedProduct;
                  } else {
                    console.log(`Inventory item '${product.inventoryItemName}' not found`);
                    return null;
                  }
            }));

            // Update the order
            const updatedOrder = await Order.findByIdAndUpdate(id, newOrder);
            console.log("order updated successfully");

            const customer_ID = updatedOrder.customer_ID;
            await Customer.findByIdAndUpdate(customer_ID, newOrder);
            console.log("customer updated successfully");

            // // Fetch and update the customer
            // const customer = await Customer.findById(order.customer_ID);
            // customer.customer_name = newOrder.customer_name; 
            // customer.customer_address = newOrder.customer_address; 
            // customer.customer_contact = newOrder.customer_contact; 
            // customer.customer_email = newOrder.customer_email; 
            // await customer.save();

            res.status(200).json({ message: 'Order updated successfully!' });
            // console.log('Before update:', newOrder);
            // const updatedOrder = await Order.findByIdAndUpdate(id, newOrder);
            // const customer_ID = updatedOrder.customer_ID;
            // const updatedCustomer = await Customer.findByIdAndUpdate(customer_ID, newOrder);

            // // Update the orderedProducts
            // const { items } = newOrder;
            // const orderedProducts = items.map(item => item.inventoryItemName); // Extract the ordered product names from the items

            // // Find and update each orderedProduct by its name
            // for (const productName of orderedProducts) {
            //     await OrderedProduct.findOneAndUpdate({ inventoryItemName: productName }, { $set: newOrder });
            // }
            // res.status(200).json({ message: 'Order updated successfully!' });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    //delete a Order
    static async deleteOrder(req, res) {
        const id = req.params.id;
        try {
            // Find the order by ID
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ message: "Order not found!" });
            }

            // Delete the order
            await order.remove();

            // Delete the associated ordered products
            await OrderedProduct.deleteMany({ Order_ID: order.order_ID });

            res.status(200).json({ message: "Order and associated ordered products deleted successfully!" });
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }

    //fetch OrderDetails by ID
    static async fetchOrderDetailsByID(req, res) {
        const id = req.params.id;
        try {
            const order = await Order.findById(id);

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

            // Add the customer information and ordered products to the order object
            const orderWithDetails = {
                ...order.toObject(),
                customer: customer,
                orderedProducts: filteredOrderedProducts,
            };

            res.status(200).json(orderWithDetails);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    }
}