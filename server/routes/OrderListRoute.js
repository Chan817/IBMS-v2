const express = require("express");
const router = express.Router();
const orderList = require('../controllers/OrderListCtrl');

router.get("/", orderList.fetchAllOrderList);

module.exports = router;