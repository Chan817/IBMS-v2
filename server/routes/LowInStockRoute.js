const express = require("express");
const router = express.Router();
const notification = require('../controllers/LowInStockCtrl');

router.get("/", notification.fetchAllNotification);

module.exports = router;