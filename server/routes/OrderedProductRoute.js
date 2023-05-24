const express = require("express");
const router = express.Router();
const orderedProductCtrl = require("../controllers/OrderedProductCtrl");

router.get("/", orderedProductCtrl.fetchAllOrderedProducts);
router.get("/:id", orderedProductCtrl.fetchOrderedProductByID);
router.post("/", orderedProductCtrl.createOrderedProduct);
router.patch("/:id", orderedProductCtrl.updateOrderedProduct);
router.delete("/:id", orderedProductCtrl.deleteOrderedProduct);

module.exports = router;
