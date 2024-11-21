const express = require("express");
const router = express.Router();
const {
  createNutritionAssessment,
  updateNutritionAssessment,
  getAllNutritionAssessments,
  getNutritionAssessmentById,
  deleteNutritionAssessment,
} = require("../controller/nutritionAssessmentController");

// Create a new NutritionAssessment entry
router.post("/", createNutritionAssessment);

// Update an existing NutritionAssessment entry by ID
router.put("/:id", updateNutritionAssessment);

// Get all NutritionAssessment entries
router.get("/", getAllNutritionAssessments);

// Get a specific NutritionAssessment entry by ID
router.get("/:id", getNutritionAssessmentById);

// Delete a specific NutritionAssessment entry by ID
router.delete("/:id", deleteNutritionAssessment);

module.exports = router;
