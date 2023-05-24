const express = require('express');
const router = express.Router();
const ReportCustomerCtrl = require('../controllers/CustomerReportCtrl');

// Route to fetch customer data
router.get('/', ReportCustomerCtrl.getCustomers);

module.exports = router;
