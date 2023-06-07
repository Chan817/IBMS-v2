const express = require("express");
const router = express.Router();
const orderList = require('../controllers/OrderListCtrl');

router.get("/", orderList.fetchAllOrderList);
router.get("/pending", orderList.fetchAllPendingOrder);
router.get("/shipped", orderList.fetchAllShippedOrder)
router.get("/cancel", orderList.fetchAllCancelledOrder);
router.get("/complete", orderList.fetchAllCompletedOrder);

module.exports = router;