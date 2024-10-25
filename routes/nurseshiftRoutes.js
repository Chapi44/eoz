const express = require("express");
const {
  createNurseVisit,
  getNurseVisitById,
  getAllNurseVisits,
  updateNurseVisit,
  deleteNurseVisit
} = require("../controller/nurseshiftController");

const router = express.Router();

// Nurse Visit routes
router.post("/nurseVisit", createNurseVisit);               // Create a new visit
router.get("/nurseVisit/:id", getNurseVisitById);           // Get a specific visit by ID
router.get("/nurseVisits", getAllNurseVisits);              // Get all visits
router.put("/nurseVisit/:id", updateNurseVisit);            // Update a visit by ID
router.delete("/nurseVisit/:id", deleteNurseVisit);         // Delete a visit by ID

module.exports = router;
