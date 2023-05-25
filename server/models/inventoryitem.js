const mongoose = require("mongoose");

const InventoryItemSchema = mongoose.Schema({
    Inv_Name: {
        type: String,
        required: true
    },
    Inv_SKU_Num: {
        type: Number,
        index: true,
        unique: true,
        required: true
    },
    Inv_Catg: {
        type: String,
        required: true
    },
    Inv_BarcodeNum: {
        type: Number,
        required: true
    },
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

// A unique Inv_SKU_Num is generated before saving
InventoryItemSchema.pre("save", function (next) {
    const doc = this;
    if (!doc.Inv_SKU_Num) {
        generateUniqueID("InventoryItem", "Inv_SKU_Num", function (err, skuNum) {
            if (err) return next(err);
            doc.Inv_SKU_Num = skuNum;
            next();
        });
    } else {
        next();
    }
});

// Generate a unique ID
function generateUniqueID(modelName, field, callback) {
    const Model = mongoose.model(modelName);
    Model.countDocuments().exec(function (err, count) {
        if (err) return callback(err);
        const id = count + 1;
        Model.findOne({ [field]: id }, function (err, result) {
            if (err) return callback(err);
            if (result) {
                // The same ID already exists, and the recursive call is regenerated
                return generateUniqueID(modelName, field, callback);
            }
            callback(null, id);
        });
    });
}

module.exports = mongoose.model("InventoryItem", InventoryItemSchema);