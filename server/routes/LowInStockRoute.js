const express = require("express");
const router = express.Router();
const notification = require('../controllers/LowInStockCtrl');

router.get("/", notification.fetchAllNotification);
router.get("/product/", notification.fetchLowInStockProduct);
router.get("/raw/", notification.fetchLowInStockRaw);


module.exports = router;