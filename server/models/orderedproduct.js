const mongoose = require("mongoose");

const OrderedProductSchema = mongoose.Schema({
    Inventory_ID: {
        type: String,
        required: true,
        ref: "InventoryItem"
    },
    Order_ID: {
        type: String,
        required: true,
        ref: "Order"
    },
    Op_Qty: {
        type: Number,
        required: true
    },
    Op_UnitPrice: {
        type: Number,
        required: true
    },
    OpTotal: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("OrderedProduct", OrderedProductSchema);
