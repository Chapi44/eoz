const express = require("express");
const router = express.Router();
const {
  createPRNNursingVisit,
  updatePRNNursingVisit,
  getAllPRNNursingVisits,
  getPRNNursingVisitById,
  getPRNNursingVisitsByNurseId,
  deletePRNNursingVisit,
  createPTVisit,
  updatePTVisit,
  getAllPTVisits,
  getPTVisitById,
  getPTVisitsByNurseId,
  deletePTVisit,
  createPTReassessment,
  updatePTReassessment,
  getAllPTReassessments,
  getPTReassessmentById,
  getPTReassessmentsByNurseId,
  deletePTReassessment,
} = require("../controller/prnnursingController");
const updateTaskStatus = require("../middelware/updateTaskStatus");


// Create a new PRN Nursing Visit
router.post("/prnnursingvisit", updateTaskStatus, createPRNNursingVisit);

// Update an existing PRN Nursing Visit by ID
router.put("/prnnursingvisit/:id", updatePRNNursingVisit);

// Get all PRN Nursing Visits
router.get("/prnnursingvisit", getAllPRNNursingVisits);

// Get a specific PRN Nursing Visit by ID
router.get("/prnnursingvisit/:id", getPRNNursingVisitById);

// Get PRN Nursing Visits by Nurse ID
router.get("/prnnursingvisit/nurse/:nurseId", getPRNNursingVisitsByNurseId);

// Delete a PRN Nursing Visit by ID
router.delete("/prnnursingvisit/:id", deletePRNNursingVisit);

// Create a new PT Visit
router.post("/ptvisit",updateTaskStatus, createPTVisit);

// Update an existing PT Visit by ID
router.put("/ptvisit/:id", updatePTVisit);

// Get all PT Visits
router.get("/ptvisit", getAllPTVisits);

// Get a specific PT Visit by ID
router.get("/ptvisit/:id", getPTVisitById);

// Get PT Visits by Nurse ID
router.get("/ptvisit/nurse/:nurseId", getPTVisitsByNurseId);

// Delete a PT Visit by ID
router.delete("/ptvisit/:id", deletePTVisit);

// Create a new PT Reassessment
router.post("/ptreassessment",updateTaskStatus, createPTReassessment);

// Update an existing PT Reassessment by ID
router.put("/ptreassessment/:id", updatePTReassessment);

// Get all PT Reassessments
router.get("/ptreassessment", getAllPTReassessments);

// Get a specific PT Reassessment by ID
router.get("/ptreassessment/:id", getPTReassessmentById);

// Get PT Reassessments by Nurse ID
router.get("/ptreassessment/nurse/:nurseId", getPTReassessmentsByNurseId);

// Delete a PT Reassessment by ID
router.delete("/ptreassessment/:id", deletePTReassessment);


const {
    createPsychNurseAssessment,
    updatePsychNurseAssessment,
    getAllPsychNurseAssessments,
    getPsychNurseAssessmentById,
    getPsychNurseAssessmentsByNurseId,
    deletePsychNurseAssessment,
    createPTEvaluation,
    updatePTEvaluation,
    getAllPTEvaluations,
    getPTEvaluationById,
    getPTEvaluationsByNurseId,
    deletePTEvaluation,
    createPTWithINR,
    updatePTWithINR,
    getAllPTWithINR,
    getPTWithINRById,
    getPTWithINRByNurseId,
    deletePTWithINR,
  } = require("../controller/PsychNurseAssessmentController");

  
  // Create a new Psych Nurse Assessment
  router.post("/psychnurseassessment", updateTaskStatus, createPsychNurseAssessment);
  
  // Update an existing Psych Nurse Assessment by ID
  router.put("/psychnurseassessment/:id", updatePsychNurseAssessment);
  
  // Get all Psych Nurse Assessments
  router.get("/psychnurseassessment", getAllPsychNurseAssessments);
  
  // Get a specific Psych Nurse Assessment by ID
  router.get("/psychnurseassessment/:id", getPsychNurseAssessmentById);
  
  // Get Psych Nurse Assessments by Nurse ID
  router.get("/psychnurseassessment/nurse/:nurseId", getPsychNurseAssessmentsByNurseId);
  
  // Delete a Psych Nurse Assessment by ID
  router.delete("/psychnurseassessment/:id", deletePsychNurseAssessment);

  // Create a new PT Evaluation
router.post("/ptevaluation", updateTaskStatus, createPTEvaluation);

// Update an existing PT Evaluation by ID
router.put("/ptevaluation/:id", updatePTEvaluation);

// Get all PT Evaluations
router.get("/ptevaluation", getAllPTEvaluations);

// Get a specific PT Evaluation by ID
router.get("/ptevaluation/:id", getPTEvaluationById);

// Get PT Evaluations by Nurse ID
router.get("/ptevaluation/nurse/:nurseId", getPTEvaluationsByNurseId);

// Delete a PT Evaluation by ID
router.delete("/ptevaluation/:id", deletePTEvaluation);

// Create a new PT with INR
router.post("/ptwithinr", updateTaskStatus, createPTWithINR);

// Update an existing PT with INR by ID
router.put("/ptwithinr/:id", updatePTWithINR);

// Get all PT with INR records
router.get("/ptwithinr", getAllPTWithINR);

// Get a specific PT with INR record by ID
router.get("/ptwithinr/:id", getPTWithINRById);

// Get PT with INR records by Nurse ID
router.get("/ptwithinr/nurse/:nurseId", getPTWithINRByNurseId);

// Delete a PT with INR record by ID
router.delete("/ptwithinr/:id", deletePTWithINR);

module.exports = router;
