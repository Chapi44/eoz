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

const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "nursesigniturepic") {
      cb(null, 'uploads/nurseSignatures/');
    } else if (file.fieldname === "patientsigniturepic") {
      cb(null, 'uploads/patientSignatures/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

// Multer upload configuration to handle multiple fields
const upload = multer({ storage: storage });

// OASIS Assessment Routes
router.post("/createoasis"
, createOASISAssessment);                // Create a new OASIS assessment
router.get("/getall", getAllOASISAssessments);                     // Get all OASIS assessments
router.get("/oasis/:id", getOASISAssessmentById);                  // Get OASIS assessment by ID
router.get("/oasis/patient/:patientId", getOASISAssessmentsByPatient);  // Get assessments by patient ID
router.get("/oasis/nurse/:nurseId", getOASISAssessmentsByNurse);   // Get assessments by nurse ID (NEW)
router.put("/oasis/:id", updateOASISAssessment);                   // Update OASIS assessment by ID
router.delete("/oasis/:id", deleteOASISAssessment);  
router.put("/discharge/:id", updateDischargeStatus);              // Delete OASIS assessment by ID

module.exports = router;
