const express = require("express");
const router = express.Router();
const {
  createTherapyNeed,
  updateTherapyNeed,
  getAllTherapyNeeds,
  getTherapyNeedById,
  deleteTherapyNeed,
} = require("../controllers/therapyNeedController");

// Create a new TherapyNeed entry
router.post("/", createTherapyNeed);

// Update an existing TherapyNeed entry by ID
router.put("/:id", updateTherapyNeed);

// Get all TherapyNeed entries
router.get("/", getAllTherapyNeeds);

// Get a specific TherapyNeed entry by ID
router.get("/:id", getTherapyNeedById);

// Delete a specific TherapyNeed entry by ID
router.delete("/:id", deleteTherapyNeed);

module.exports = router;
