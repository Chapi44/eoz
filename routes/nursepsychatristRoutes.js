const express = require("express");
const router = express.Router();
const {
  createNurseVisit,
  updateNurseVisit,
  getAllNurseVisits,
  getNurseVisitById,
  getNurseVisitsByTypeAndNurseId,
  deleteNurseVisit,
  createNursingVisitSpecial,
  updateNursingVisitSpecial,
  getAllNursingVisitsSpecial,
  getNursingVisitByIdSpecial,
  getNursingVisitsByTypeAndNurseIdSpecial,
  deleteNursingVisitSpecial,
  createNurseVisitAdvanced,
  updateNurseVisitAdvanced,
  getAllNurseVisitsAdvanced,
  getNurseVisitAdvancedById,
  getNurseVisitsAdvancedByTypeAndNurseId,
  deleteNurseVisitAdvanced,
} = require("../controller/nursevisitpsychatristController");
const updateTaskStatus = require("../middelware/updateTaskStatus");
const { authMiddleware } = require("../middelware/authMiddleware");


// Create a new Nurse Visit
router.post("/nursevisit", authMiddleware, updateTaskStatus, createNurseVisit);

// Update an existing Nurse Visit by ID
router.put("/nursevisit/:id", updateNurseVisit);

// Get all Nurse Visits
router.get("/nursevisit", authMiddleware, getAllNurseVisits);

// Get a specific Nurse Visit by ID
router.get("/nursevisit/:id", getNurseVisitById);

// Get Nurse Visits by Type
router.get("/nursevisit/nurse/:nurseId", getNurseVisitsByTypeAndNurseId);

// Delete a Nurse Visit by ID
router.delete("/nursevisit/:id", deleteNurseVisit);

// Create a new Nursing Visit
router.post("/nursingvisit/special", authMiddleware, updateTaskStatus, createNursingVisitSpecial);

// Update an existing Nursing Visit by ID
router.put("/nursingvisit/special/:id", updateNursingVisitSpecial);

// Get all Nursing Visits
router.get("/nursingvisit/special", authMiddleware, getAllNursingVisitsSpecial);

// Get a specific Nursing Visit by ID
router.get("/nursingvisit/special/:id", getNursingVisitByIdSpecial);

// Get Nursing Visits by Type and Nurse ID
router.get("/nursingvisit/special/nurse/:nurseId", getNursingVisitsByTypeAndNurseIdSpecial);

// Delete a Nursing Visit by ID
router.delete("/nursingvisit/special/:id", deleteNursingVisitSpecial);

// Create a new Nurse Visit Advanced
router.post("/nursevisitadvanced", authMiddleware, updateTaskStatus, createNurseVisitAdvanced);

// Update an existing Nurse Visit Advanced by ID
router.put("/nursevisitadvanced/:id", updateNurseVisitAdvanced);

// Get all Nurse Visit Advanced
router.get("/nursevisitadvanced", authMiddleware, getAllNurseVisitsAdvanced);

// Get a specific Nurse Visit Advanced by ID
router.get("/nursevisitadvanced/:id", getNurseVisitAdvancedById);

// Get Nurse Visits Advanced by Type and Nurse ID
router.get("/nursevisitadvanced/nurse/:nurseId", getNurseVisitsAdvancedByTypeAndNurseId);

// Delete a Nurse Visit Advanced by ID
router.delete("/nursevisitadvanced/:id", deleteNurseVisitAdvanced);

module.exports = router;
