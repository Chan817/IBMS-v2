const Customer = require("../models/customer");
const Order = require("../models/order");

module.exports = class API {
    //fetch all Order
    static async fetchAllOrder(req,res){
        try {
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    //fetch Order by ID
    static async fetchOrderByID(req,res){
        const id = req.params.id;
        try{
            const order = await Order.findById(id);
            res.status(200).json(order);
        } catch{
            res.status(404).json({ message: err.message });
        }
    }

    //create a Order
    static async createOrder(req,res){
        const order = req.body;
        try{
            await Customer.create(order);
            await Order.create(order);
            
            res.status(201).json({ message: "Order created successfully!"});
        } catch(err){
            res.status(400).json({message: err.message});
        }
    }

    //update a Order
    static async updateOrder(req,res){
        const id = req.params.id;
        const newOrder = req.body;
        try {
            console.log('Before update:', newOrder);
            const updatedOrder = await Order.findByIdAndUpdate(id, newOrder);
            console.log('After update:', updatedOrder);
            res.status(200).json({ message: 'Order updated successfully!'});
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }

    //delete a Order
    static async deleteOrder(req,res){
        res.send("delete Order");
    }
}