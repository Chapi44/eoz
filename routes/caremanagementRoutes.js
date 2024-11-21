const express = require("express");
const router = express.Router();
const {
  createCareManagement,
  updateCareManagement,
  getAllCareManagement,
  getCareManagementById,
} = require("../controller/caremangementController");

// Create a new CareManagement entry
router.post("/", createCareManagement);

// Update an existing CareManagement entry by ID
router.put("/:id", updateCareManagement);

// Get all CareManagement entries
router.get("/", getAllCareManagement);

// Get a specific CareManagement entry by ID
router.get("/:id", getCareManagementById);

module.exports = router;
