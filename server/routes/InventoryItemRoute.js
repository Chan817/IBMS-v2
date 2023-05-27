const express = require("express");
const router = express.Router();
const inventoryItemCtrl = require("../controllers/InventoryItemCtrl");
const multer = require('multer');

// multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads");
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

let upload = multer({
    storage: storage
}).single("image");

router.get("/", inventoryItemCtrl.fetchAllInventoryItems);
router.get("/raw", inventoryItemCtrl.fetchAllRaw);
router.get("/product", inventoryItemCtrl.fetchAllProduct);
router.get("/:id", inventoryItemCtrl.fetchInventoryItemByID);
router.post("/", upload, inventoryItemCtrl.createInventoryItem);
router.patch("/:id", inventoryItemCtrl.updateInventoryItem);
router.delete("/:id", inventoryItemCtrl.deleteInventoryItem);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const API = require('../controllers/CustomerCtrl');
// const multer = require('multer');

// // multer middleware
// let storage = multer.diskStorage({
//     destination: function(req,file, cb){
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb){
//         cb(null, file.fieldname+"_" + Date.now() + "_" + file.originalname);
//     },
// });

// let upload = multer({
//     storage: storage,
// }).single("image"); 

// router.get("/", API.fetchAllCustomer);
// router.get("/:id", API.fetchCustomerByID);
// router.post("/", upload, API.createCustomer);
// router.patch("/:id", upload, API.updateCustomer);
// router.delete("/:id", API.deleteCustomer);


// module.exports = router;