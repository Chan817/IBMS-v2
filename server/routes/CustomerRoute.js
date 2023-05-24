const express = require("express");
const router = express.Router();
const customerCtrl = require("../controllers/CustomerCtrl");

router.get("/", customerCtrl.fetchAllCustomer);
router.get("/:id", customerCtrl.fetchCustomerByID);
router.post("/", customerCtrl.createCustomer);
router.patch("/:id", customerCtrl.updateCustomer);
router.delete("/:id", customerCtrl.deleteCustomer);

module.exports = router;
