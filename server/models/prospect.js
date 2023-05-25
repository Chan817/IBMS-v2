const mongoose = require("mongoose");

const ProspectSchema = mongoose.Schema({
    prospect_name: {
        type: String,
        required: true,
        index: true
    },
    prospect_address: {
        type: String,
        required: true
    },
    prospect_email: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    prospect_contact: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model("Prospect", ProspectSchema)

