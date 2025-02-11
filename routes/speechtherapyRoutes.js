const express = require("express");
const router = express.Router();
const {
  createSpeechTherapyVisit,
  updateSpeechTherapyVisit,
  getAllSpeechTherapyVisits,
  getSpeechTherapyVisitById,
  getSpeechTherapyVisitsByNurseId,
  deleteSpeechTherapyVisit,
  createSTReEvaluation,
  updateSTReEvaluation,
  getAllSTReEvaluations,
  getSTReEvaluationById,
  getSTReEvaluationsByNurseId,
  deleteSTReEvaluation,
} = require("../controller/speechtherapyController");
const updateTaskStatus = require("../middelware/updateTaskStatus");


// Create a new Speech Therapy Visit
router.post("/speechtherapyvisit", updateTaskStatus, createSpeechTherapyVisit);

// Update an existing Speech Therapy Visit by ID
router.put("/speechtherapyvisit/:id", updateSpeechTherapyVisit);

// Get all Speech Therapy Visits
router.get("/speechtherapyvisit", getAllSpeechTherapyVisits);

// Get a specific Speech Therapy Visit by ID
router.get("/speechtherapyvisit/:id", getSpeechTherapyVisitById);

// Get Speech Therapy Visits by Nurse ID
router.get("/speechtherapyvisit/nurse/:nurseId", getSpeechTherapyVisitsByNurseId);

// Delete a Speech Therapy Visit by ID
router.delete("/speechtherapyvisit/:id", deleteSpeechTherapyVisit);

// Create a new ST Re-Evaluation
router.post("/strevaluation", updateTaskStatus, createSTReEvaluation);

// Update an existing ST Re-Evaluation by ID
router.put("/strevaluation/:id", updateSTReEvaluation);

// Get all ST Re-Evaluations
router.get("/strevaluation", getAllSTReEvaluations);

// Get a specific ST Re-Evaluation by ID
router.get("/strevaluation/:id", getSTReEvaluationById);

// Get ST Re-Evaluations by Nurse ID
router.get("/strevaluation/nurse/:nurseId", getSTReEvaluationsByNurseId);

// Delete a ST Re-Evaluation by ID
router.delete("/strevaluation/:id", deleteSTReEvaluation);

module.exports = router;
