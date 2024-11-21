const express = require("express");
const router = express.Router();
const {
  createAideCarePlan,
  updateAideCarePlan,
  getAllAideCarePlans,
  getAideCarePlanById,
} = require("../controllers/aideCarePlanController");

// Create a new AideCarePlan
router.post("/", createAideCarePlan);

// Update an existing AideCarePlan by ID
router.put("/:id", updateAideCarePlan);

// Get all AideCarePlans
router.get("/", getAllAideCarePlans);

// Get a specific AideCarePlan by ID
router.get("/:id", getAideCarePlanById);

module.exports = router;
