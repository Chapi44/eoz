const express = require("express");
const {
  createTherapyVisit,
  getTherapyVisitById,
  getAllTherapyVisits,
  getTherapyVisitsByPatientId,  // New route for patientId
  getTherapyVisitsByTherapistId, // New route for therapistId
  updateTherapyVisit,
  deleteTherapyVisit
} = require("../controller/therapyVisitController");

const router = express.Router();

// Therapy Visit routes
router.post("/therapyVisit", createTherapyVisit);               // Create a new therapy visit
router.get("/therapyVisit/:id", getTherapyVisitById);           // Get a specific therapy visit by ID
router.get("/therapyVisits", getAllTherapyVisits);              // Get all therapy visits
router.get("/therapyVisits/patient/:patientId", getTherapyVisitsByPatientId);   // Get therapy visits by patient ID
router.get("/therapyVisits/therapist/:therapistId", getTherapyVisitsByTherapistId);  // Get therapy visits by therapist ID
router.put("/therapyVisit/:id", updateTherapyVisit);            // Update a therapy visit by ID
router.delete("/therapyVisit/:id", deleteTherapyVisit);         // Delete a therapy visit by ID

module.exports = router;
