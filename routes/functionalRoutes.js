const express = require("express");
const router = express.Router();
const {
  createFunctionalStatus,
  updateFunctionalStatus,
  getAllFunctionalStatus,
  getFunctionalStatusById,
} = require("../controller/functionalstatusController");

// Create a new FunctionalStatus
router.post("/", createFunctionalStatus);

// Update an existing FunctionalStatus by ID
router.put("/:id", updateFunctionalStatus);

// Get all FunctionalStatus records
router.get("/", getAllFunctionalStatus);

// Get a FunctionalStatus record by ID
router.get("/:id", getFunctionalStatusById);

module.exports = router;
