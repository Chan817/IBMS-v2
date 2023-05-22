const express = require("express");
const router = express.Router();
const API = require('../controllers/api');
const multer = require('multer');
const order = require('../controllers/OnlineOrderCtrl');

// multer middleware
let storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './uploads');
    },
    filename: function (req, file, cb){
        cb(null, file.fieldname+"_" + Date.now() + "_" + file.originalname);
    },
});

let upload = multer({
    storage: storage,
}).single("image"); 

router.get("/customer", API.fetchAllCustomer);
router.get("/customer/:id", API.fetchCustomerByID);
router.post("/customer", upload, API.createCustomer);
router.patch("/customer/:id", upload, API.updateCustomer);
router.delete("/customer/:id", API.deleteCustomer);
router.get("/order", order.fetchAllOrder);
router.get("/order/:id", order.fetchOrderByID);
router.post("/order", upload, order.createOrder);
router.patch("/order/:id", upload, order.updateOrder);
router.delete("/order/:id", order.deleteOrder);

module.exports = router;
