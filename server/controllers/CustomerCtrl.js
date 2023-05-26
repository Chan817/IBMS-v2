const Customer = require("../models/customer");

module.exports = class API {
    //fetch all posts
    static async fetchAllCustomer(req,res){
        try {
            const customers = await Customer.find();
            res.status(200).json(customers);
        } catch (err) {
            res.status(404).json({message: err.message});
        }
    }

    //fetch post by ID
    static async fetchCustomerByID(req,res){
        const id = req.params.id;
        try{
            const customer = await Customer.findById(id);
            res.status(200).json(customer);
        } catch (err){
            res.status(404).json({ message: err.message });
        }
    }

    //create a post
    static async createCustomer(req, res) {
        const customer = req.body;
        try {
            // Check if the customer already exists in the database
            const existingCustomer = await Customer.findOne({ email: customer.email });
            if (existingCustomer) {
                return res.status(409).json({ message: "Customer already exists!" });
            }
    
            await Customer.create(customer);
            res.status(201).json({ message: "Customer created successfully!" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    

    //update a post
    static async updateCustomer(req,res){
        const id = req.params.id;
        const newCustomer = req.body;
        try {
            console.log('Before update:', newCustomer);
            const updatedCustomer = await Customer.findByIdAndUpdate(id, newCustomer);
            console.log('After update:', updatedCustomer);
            res.status(200).json({ message: 'Customer updated successfully!'});
        } catch (err) {
            res.status(404).json({ message: err.message});
        }
    }

    //delete a post
    static async deleteCustomer(req,res){
        const id = req.params.id;
        try {
          await Customer.findByIdAndDelete(id);
          res.status(200).json({ message: "Customer deleted successfully!" });
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
    }
}