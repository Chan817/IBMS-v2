const mongoose = require("mongoose");

const CustomerSchema = mongoose.Schema({
    customer_name: {
        type: String,
        required: true,
        index: true
    },
    customer_address: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    customer_contact: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model("Customer", CustomerSchema)

