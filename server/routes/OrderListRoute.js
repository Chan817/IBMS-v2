const express = require("express");
const router = express.Router();
const orderList = require('../controllers/OrderListCtrl');

router.get("/", orderList.fetchAllOrderList);
router.get("/pending", orderList.fetchAllPendingProduct);
router.get("/shipped", orderList.fetchAllShippedProduct)
router.get("/cancel", orderList.fetchAllCancelledProduct);
router.get("/complete", orderList.fetchAllCompletedProduct);

module.exports = router;