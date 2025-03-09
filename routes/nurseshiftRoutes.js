// const express = require("express");
// const {
//   createNurseVisit,
//   getNurseVisitById,
//   getAllNurseVisits,
//   updateNurseVisit,
//   deleteNurseVisit,
//   getNurseVisitsByPatientId,
//   getNurseVisitsByNurseId,
//   getNurseVisitsByPatientAndNurse
// } = require("../controller/nurseshiftController");

// const router = express.Router();

// // Nurse Visit routes
// router.post("/nurseVisit", createNurseVisit);                         // Create a new visit
// router.get("/nurseVisit/:id", getNurseVisitById);                     // Get a specific visit by ID
// router.get("/nurseVisits", getAllNurseVisits);                        // Get all visits
// router.put("/nurseVisit/:id", updateNurseVisit);                      // Update a visit by ID
// router.delete("/nurseVisit/:id", deleteNurseVisit);                   // Delete a visit by ID

// // Additional routes for nurse visits by Patient ID, Nurse ID, and both
// router.get("/nurseVisits/patient/:patientId", getNurseVisitsByPatientId);       // Get visits by Patient ID
// router.get("/nurseVisits/nurse/:nurseId", getNurseVisitsByNurseId);             // Get visits by Nurse ID
// router.get("/nurseVisits/patient/:patientId/nurse/:nurseId", getNurseVisitsByPatientAndNurse); // Get visits by Patient ID and Nurse ID

// module.exports = router;
