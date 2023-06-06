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
}).single("InvImg");

function printReqRes(req,res,next){
    console.log(req.body);
    next();
}

router.get("/", inventoryItemCtrl.fetchAllInventoryItems);
router.get("/raw", inventoryItemCtrl.fetchAllRaw);
router.get("/product", inventoryItemCtrl.fetchAllProduct);
router.get("/withTotalSale", inventoryItemCtrl.fetchInventoryItemsWithTotalSale);
router.get("/withWeeklyTotalSale", inventoryItemCtrl.fetchWeeklyData);
router.get("/withMonthlyTotalSale", inventoryItemCtrl.fetchMonthlyData);
router.get("/withYearlyTotalSale", inventoryItemCtrl.fetchYearlyData);
router.get("/:id", inventoryItemCtrl.fetchInventoryItemByID);
router.get("/barcode/:barcodeNum", inventoryItemCtrl.fetchProductByBarcodeNum); 
router.post("/", upload, inventoryItemCtrl.createInventoryItem);
router.patch("/:id", upload, inventoryItemCtrl.updateInventoryItem);
router.delete("/:id", inventoryItemCtrl.deleteInventoryItem);


module.exports = router;

