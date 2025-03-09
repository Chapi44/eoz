const express = require("express");
const router = express.Router();
const {
  createLPNSupervisoryVisit,
  updateLPNSupervisoryVisit,
  getAllLPNSupervisoryVisits,
  getLPNSupervisoryVisitById,
  getLPNSupervisoryVisitsByLPNId,
  deleteLPNSupervisoryVisit,
  createLVNHourlyVisit,
  updateLVNHourlyVisit,
  getAllLVNHourlyVisits,
  getLVNHourlyVisitById,
  getLVNHourlyVisitsByNurseId,
  deleteLVNHourlyVisit
} = require("../controller/lpnupervisoryvisitController");
const updateTaskStatus = require("../middelware/updateTaskStatus");
const { authMiddleware } = require("../middelware/authMiddleware");

// Create a new LPN Supervisory Visit
router.post("/lpnsupervisory", authMiddleware, updateTaskStatus, createLPNSupervisoryVisit);

// Update an existing LPN Supervisory Visit by ID
router.put("/lpnsupervisory/:id", updateLPNSupervisoryVisit);

// Get all LPN Supervisory Visits
router.get("/lpnsupervisory", authMiddleware, getAllLPNSupervisoryVisits);

// Get a specific LPN Supervisory Visit by ID
router.get("/lpnsupervisory/:id", getLPNSupervisoryVisitById);

// Get LPN Supervisory Visits by LPN ID
router.get("/lpnsupervisory/lpn/:lpnId", getLPNSupervisoryVisitsByLPNId);

// Delete an LPN Supervisory Visit by ID
router.delete("/lpnsupervisory/:id", deleteLPNSupervisoryVisit);

router.post("/lvnhourly", authMiddleware, updateTaskStatus, createLVNHourlyVisit);

// Update an existing LVN Hourly Visit by ID
router.put("/lvnhourly/:id", updateLVNHourlyVisit);

// Get all LVN Hourly Visits
router.get("/lvnhourly", authMiddleware, getAllLVNHourlyVisits);

// Get a specific LVN Hourly Visit by ID
router.get("/lvnhourly/:id", getLVNHourlyVisitById);

// Get LVN Hourly Visits by Nurse ID
router.get("/lvnhourly/nurse/:nurseId", getLVNHourlyVisitsByNurseId);

// Delete an LVN Hourly Visit by ID
router.delete("/lvnhourly/:id", deleteLVNHourlyVisit);



const {
  createMiddayInsulinAdministration,
  updateMiddayInsulinAdministration,
  getAllMiddayInsulinAdministrations,
  getMiddayInsulinAdministrationById, 
  getMiddayInsulinAdministrationsByNurseId,
  deleteMiddayInsulinAdministration,
} = require("../controller/middayinsulinController");

// Create a new Midday Insulin Administration record
router.post("/middayinsulin",authMiddleware,  updateTaskStatus, createMiddayInsulinAdministration);

// Update an existing Midday Insulin Administration record by ID
router.put("/middayinsulin/:id", updateMiddayInsulinAdministration);

// Get all Midday Insulin Administration records
router.get("/middayinsulin", authMiddleware, getAllMiddayInsulinAdministrations);

// Get a specific Midday Insulin Administration record by ID
router.get("/middayinsulin/:id", getMiddayInsulinAdministrationById);

// Get Midday Insulin Administration records by Nurse ID
router.get("/middayinsulin/nurse/:nurseId", getMiddayInsulinAdministrationsByNurseId);

// Delete a Midday Insulin Administration record by ID
router.delete("/middayinsulin/:id", deleteMiddayInsulinAdministration);


module.exports = router;
