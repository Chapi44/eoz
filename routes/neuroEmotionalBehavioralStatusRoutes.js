const express = require("express");
const router = express.Router();
const {
  createNeuroEmotionalBehavioralStatus,
  updateNeuroEmotionalBehavioralStatus,
  getAllNeuroEmotionalBehavioralStatus,
  getNeuroEmotionalBehavioralStatusById,
  deleteNeuroEmotionalBehavioralStatus,
} = require("../controller/neuroEmotionalBehavioralStatusController");

// Create a new NeuroEmotionalBehavioralStatus entry
router.post("/", createNeuroEmotionalBehavioralStatus);

// Update an existing NeuroEmotionalBehavioralStatus entry by ID
router.put("/:id", updateNeuroEmotionalBehavioralStatus);

// Get all NeuroEmotionalBehavioralStatus entries
router.get("/", getAllNeuroEmotionalBehavioralStatus);

// Get a specific NeuroEmotionalBehavioralStatus entry by ID
router.get("/:id", getNeuroEmotionalBehavioralStatusById);

// Delete a specific NeuroEmotionalBehavioralStatus entry by ID
router.delete("/:id", deleteNeuroEmotionalBehavioralStatus);

module.exports = router;
