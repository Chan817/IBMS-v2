const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    order_ID: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    order_Date: { 
        type: Date,
        default: Date.now,
        get: function(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
    },
    order_type: {
        type: String,
        required: true
    },
    order_status: {
        type: String,
        required: true
    },
    shipped_Date: { 
        type: Date,
        get: function(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
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
