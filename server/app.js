//imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT //5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//database connection
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to the database')).catch((err) => console.log(err));

//routes prefix
//app.use("/api/", require("./routes/CustomerRoute"));

//sales
app.use("/api/order", require("./routes/OrderRoute"));
app.use("/api/customer", require("./routes/CustomerRoute"));
app.use("/api/inventoryitem", require("./routes/InventoryItemRoute"));
app.use("/api/orderedproduct", require("./routes/OrderedProductRoute"));
app.use("/api/prospect", require("./routes/ProspectRoute"));
app.use("/api/notification", require("./routes/LowInStockRoute"));
// app.use("/api/customer", require("./routes/CustomerReportRoute"));

// start server
app.listen(port, () => console.log(`server running at http://localhost:${port}`));