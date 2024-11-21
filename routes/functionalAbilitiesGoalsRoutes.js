const express = require("express");
const router = express.Router();
const {
  createFunctionalAbilitiesGoals,
  updateFunctionalAbilitiesGoals,
  getAllFunctionalAbilitiesGoals,
  getFunctionalAbilitiesGoalsById,
} = require("../controllers/functionalAbilitiesGoalsController");

// Create a new FunctionalAbilitiesGoals entry
router.post("/", createFunctionalAbilitiesGoals);

// Update an existing FunctionalAbilitiesGoals entry by ID
router.put("/:id", updateFunctionalAbilitiesGoals);

// Get all FunctionalAbilitiesGoals entries
router.get("/", getAllFunctionalAbilitiesGoals);

// Get a specific FunctionalAbilitiesGoals entry by ID
router.get("/:id", getFunctionalAbilitiesGoalsById);

module.exports = router;
