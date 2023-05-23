const express = require("express");
const router = express.Router();
const order = require('../controllers/OrderCtrl');

router.get("/", order.fetchAllOrder);
router.get("/:id", order.fetchOrderByID);
router.post("/", order.createOrder);
router.patch("/:id", order.updateOrder);
router.delete("/:id", order.deleteOrder);

module.exports = router;