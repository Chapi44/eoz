const express = require("express");
const router = express.Router();
const {
  createLPNSupervisoryVisit,
  updateLPNSupervisoryVisit,
  getAllLPNSupervisoryVisits,
  getLPNSupervisoryVisitById,
  getLPNSupervisoryVisitsByLPNId,
  deleteLPNSupervisoryVisit,
} = require("../controller/lpnupervisoryvisitController");

// Create a new LPN Supervisory Visit
router.post("/lpnsupervisory", createLPNSupervisoryVisit);

// Update an existing LPN Supervisory Visit by ID
router.put("/lpnsupervisory/:id", updateLPNSupervisoryVisit);

// Get all LPN Supervisory Visits
router.get("/lpnsupervisory", getAllLPNSupervisoryVisits);

// Get a specific LPN Supervisory Visit by ID
router.get("/lpnsupervisory/:id", getLPNSupervisoryVisitById);

// Get LPN Supervisory Visits by LPN ID
router.get("/lpnsupervisory/lpn/:lpnId", getLPNSupervisoryVisitsByLPNId);

// Delete an LPN Supervisory Visit by ID
router.delete("/lpnsupervisory/:id", deleteLPNSupervisoryVisit);

module.exports = router;
