const express = require("express");
const router = express.Router();
const {
  createInfectionReport,
  updateInfectionReport,
  getAllInfectionReports,
  getInfectionReportById,
  getInfectionReportsByNurseId,
  deleteInfectionReport,
  createInfusionTherapy,
  updateInfusionTherapy,
  getAllInfusionTherapies,
  getInfusionTherapyById,
  getInfusionTherapiesByPhysicianId,
  deleteInfusionTherapy,
} = require("../controller/infectionController");
const updateTaskStatus = require("../middelware/updateTaskStatus");
const { authMiddleware } = require("../middelware/authMiddleware");


// Create a new Infection Report
router.post("/infectionreport", authMiddleware, updateTaskStatus, createInfectionReport);

// Update an existing Infection Report by ID
router.put("/infectionreport/:id", updateInfectionReport);

// Get all Infection Reports
router.get("/infectionreport", authMiddleware,  getAllInfectionReports);

// Get a specific Infection Report by ID
router.get("/infectionreport/:id", getInfectionReportById);

// Get Infection Reports by Nurse ID
router.get("/infectionreport/nurse/:nurseId", getInfectionReportsByNurseId);

// Delete an Infection Report by ID
router.delete("/infectionreport/:id", deleteInfectionReport);


// Create a new Infusion Therapy record
router.post("/infusiontherapy", authMiddleware,  updateTaskStatus, createInfusionTherapy);

// Update an existing Infusion Therapy record by ID
router.put("/infusiontherapy/:id", updateInfusionTherapy);

// Get all Infusion Therapy records
router.get("/infusiontherapy", authMiddleware,  getAllInfusionTherapies);

// Get a specific Infusion Therapy record by ID
router.get("/infusiontherapy/:id", getInfusionTherapyById);

// Get Infusion Therapy records by Physician ID
router.get("/infusiontherapy/physician/:physicianId", getInfusionTherapiesByPhysicianId);

// Delete an Infusion Therapy record by ID
router.delete("/infusiontherapy/:id", deleteInfusionTherapy);

module.exports = router;
