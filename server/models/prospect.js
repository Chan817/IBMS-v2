const mongoose = require("mongoose");

const ProspectSchema = mongoose.Schema({
    prospect_name:String,
    prospect_address: String,
    prospect_email: String,
    prospect_contact: String,
});
module.exports = mongoose.model("Prospect", ProspectSchema)

