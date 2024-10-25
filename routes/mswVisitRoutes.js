const express = require("express");
const {
  createMSWVisit,
  getMSWVisitById,
  getAllMSWVisits,
  getMSWVisitsByPatientId,
  getMSWVisitsByMSWId,
  updateMSWVisit,
  deleteMSWVisit,
} = require("../controller/mswVisitController");

const router = express.Router();

// MSW Visit routes
router.post("/mswVisit", createMSWVisit);                    // Create a new MSW visit
router.get("/mswVisit/:id", getMSWVisitById);                // Get MSW visit by ID
router.get("/mswVisits", getAllMSWVisits);                   // Get all MSW visits
router.get("/mswVisits/patient/:patientId", getMSWVisitsByPatientId);  // Get MSW visits by patient ID
router.get("/mswVisits/msw/:mswId", getMSWVisitsByMSWId);    // Get MSW visits by MSW ID
router.put("/mswVisit/:id", updateMSWVisit);                 // Update MSW visit by ID
router.delete("/mswVisit/:id", deleteMSWVisit);              // Delete MSW visit by ID

module.exports = router;
