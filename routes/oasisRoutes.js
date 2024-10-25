const express = require("express");
const {
  createOASISAssessment,
  getOASISAssessmentById,
  getOASISAssessmentsByPatient,
  updateOASISAssessment,
  deleteOASISAssessment,
  getAllOASISAssessments,
  getOASISAssessmentsByNurse,  // Import the new controller method
  updateDischargeStatus
} = require("../controller/oasisController");

const router = express.Router();

// OASIS Assessment Routes
router.post("/createoasis", createOASISAssessment);                // Create a new OASIS assessment
router.get("/getall", getAllOASISAssessments);                     // Get all OASIS assessments
router.get("/oasis/:id", getOASISAssessmentById);                  // Get OASIS assessment by ID
router.get("/oasis/patient/:patientId", getOASISAssessmentsByPatient);  // Get assessments by patient ID
router.get("/oasis/nurse/:nurseId", getOASISAssessmentsByNurse);   // Get assessments by nurse ID (NEW)
router.put("/oasis/:id", updateOASISAssessment);                   // Update OASIS assessment by ID
router.delete("/oasis/:id", deleteOASISAssessment);  
router.put("/discharge/:id", updateDischargeStatus);              // Delete OASIS assessment by ID

module.exports = router;
