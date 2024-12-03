const express = require("express");
const router = express.Router();
const {
  createCareManagement,
  updateCareManagement,
  getAllCareManagement,
  getCareManagementById,
  getCareManagementByOasisId
} = require("../controller/caremangementController");

// Route to create a new CareManagement entry
router.post("/care-management", createCareManagement);

// Route to get CareManagement by OASIS Assessment ID
router.get("/care-management/oasis/:oasisAssessmentId", getCareManagementByOasisId);

// Route to get CareManagement by CareManagement ID
router.get("/care-management/:careManagementId", getCareManagementById);

// Route to update CareManagement by OASIS Assessment ID and CareManagement ID
router.put("/care-management/oaisisid/:oasisAssessmentId/careid/:careManagementId", updateCareManagement);

// Get all CareManagement entries
router.get("/", getAllCareManagement);


module.exports = router;
