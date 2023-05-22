const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    customer_name:String,
    customer_address: String,
    customer_email: String,
    customer_contact: String,
});
module.exports = mongoose.model("Customer", CustomerSchema)

