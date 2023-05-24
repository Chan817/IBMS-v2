const express = require("express");
const router = express.Router();
const prospectCtrl = require("../controllers/ProspectCtrl");

router.get("/", prospectCtrl.fetchAllProspects);
router.get("/:id", prospectCtrl.fetchProspectByID);
router.post("/", prospectCtrl.createProspect);
router.patch("/:id", prospectCtrl.updateProspect);
router.delete("/:id", prospectCtrl.deleteProspect);

module.exports = router;
