const express = require("express");
const router = express.Router();
const {
  createAssessment,
  updateAssessment,
  getAllAssessments,
  getAssessmentById,
} = require("../controller/endocrineController");

// Create a new assessment
router.post("/", createAssessment);

// Update an existing assessment by ID
router.put("/:id", updateAssessment);

// Get all assessments
router.get("/", getAllAssessments);

// Get a specific assessment by ID
router.get("/:id", getAssessmentById);

module.exports = router;
