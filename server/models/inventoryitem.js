const mongoose = require("mongoose");

const InventoryItemSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // Automatically generate ObjectId
      },
    Inv_Name: {
        type: String,
        required: true
    },
    Inv_SKU_Num: {
        type: String,
        index: true,
        unique: true
    },
    Inv_Catg: {
        type: String,
        required: true
    },
    Inv_BarcodeNum: Number,
    InvImg: String,
    Inv_MinStockLevel: {
        type: Number,
        required: true
    },
    Inv_StockLevel: {
        type: Number,
        required: true
    },
    Inv_CostPrice: {
        type: Number,
        required: true
    },
    Inv_Desc: String
});

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);