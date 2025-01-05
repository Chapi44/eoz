const express = require("express");
const router = express.Router();
const oasisAssessmentController = require("../controller/oasisController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // File upload middleware

// POST route to send email
router.post("/send-email", upload.single("file"), oasisAssessmentController.sendEmail);

// Route to create a new OASIS Assessment
router.post("/createoasis", oasisAssessmentController.createOASISAssessment);

// Route to retrieve all OASIS Assessments
router.get("/getall", oasisAssessmentController.getAllOASISAssessments);

// Route to retrieve a single OASIS Assessment by ID
router.get("/:id", oasisAssessmentController.getOASISAssessmentById);

// Route to update an OASIS Assessment by ID
router.put("/:id", oasisAssessmentController.updateOASISAssessmentById);

// Route to delete an OASIS Assessment by ID
router.delete("/:id", oasisAssessmentController.deleteOASISAssessmentById);

router.get("/oasis-assessments/nurse/:nurseId/patient/:patientId", oasisAssessmentController.getOASISAssessmentByNurseAndPatient);

router.get("/planOfCare/:oasisId", oasisAssessmentController.fetchPlanOfCare);

// Route to get OASIS assessments by nurseId
router.get("/oasis-assessments/nurse/:nurseId", oasisAssessmentController.getOASISAssessmentsByNurseId);

// Route to get OASIS assessments by patientId
router.get("/oasis-assessments/patient/:patientId", oasisAssessmentController.getOASISAssessmentsByPatientId);
module.exports = router;
