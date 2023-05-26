const express = require('express');
const router = express.Router();
const ReportProspectCtrl = require('../controllers/ProspectReportCtrl');

// Route to fetch customer data
router.get('/', ReportProspectCtrl.getProspect);

module.exports = router;