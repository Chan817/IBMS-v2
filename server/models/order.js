const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    order_ID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    order_Date: { type: Date, default: Date.now },
    order_type: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    order_remark: String,
    business_type: String,
    order_platform: String,
    order_trackingNum: String,
    customer_ID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Customer"
    },
});
module.exports = mongoose.model("Order", OrderSchema)
