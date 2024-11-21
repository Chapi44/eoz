const express = require("express");
const router = express.Router();
const {
  createMedication,
  updateMedication,
  getAllMedications,
  getMedicationById,
  deleteMedication,
} = require("../controller/medicationsController");

// Create a new Medications entry
router.post("/", createMedication);

// Update an existing Medications entry by ID
router.put("/:id", updateMedication);

// Get all Medications entries
router.get("/", getAllMedications);

// Get a specific Medications entry by ID
router.get("/:id", getMedicationById);

// Delete a specific Medications entry by ID
router.delete("/:id", deleteMedication);

module.exports = router;
