const express = require("express");
const router = express.Router();
const {
  createOTTelehealth,
  updateOTTelehealth,
  getAllOTTelehealth,
  getOTTelehealthById,
  getOTTelehealthByNurseId,
  deleteOTTelehealth,
  createOTReEval,
  updateOTReEval,
  getAllOTReEvals,
  getOTReEvalById,
  getOTReEvalsByNurseId,
  deleteOTReEval,
  createOTVisit,
  updateOTVisit,
  getAllOTVisits,
  getOTVisitById,
  getOTVisitsByNurseId,
  deleteOTVisit,
} = require("../controller/oTtelehealthController");
const updateTaskStatus = require("../middelware/updateTaskStatus");

// Create a new OT Telehealth Visit
router.post("/ottelehealth", updateTaskStatus, createOTTelehealth);

// Update an existing OT Telehealth Visit by ID
router.put("/ottelehealth/:id", updateOTTelehealth);

// Get all OT Telehealth Visits
router.get("/ottelehealth", getAllOTTelehealth);

// Get a specific OT Telehealth Visit by ID
router.get("/ottelehealth/:id", getOTTelehealthById);

// Get OT Telehealth Visits by Nurse ID
router.get("/ottelehealth/nurse/:nurseId", getOTTelehealthByNurseId);

// Delete an OT Telehealth Visit by ID
router.delete("/ottelehealth/:id", deleteOTTelehealth);

// Create a new OT Re-Evaluation record
router.post("/otreeval", updateTaskStatus, createOTReEval);

// Update an existing OT Re-Evaluation record by ID
router.put("/otreeval/:id", updateOTReEval);

// Get all OT Re-Evaluation records
router.get("/otreeval", getAllOTReEvals);

// Get a specific OT Re-Evaluation record by ID
router.get("/otreeval/:id", getOTReEvalById);

// Get OT Re-Evaluation records by Nurse ID
router.get("/otreeval/nurse/:nurseId", getOTReEvalsByNurseId);

// Delete an OT Re-Evaluation record by ID
router.delete("/otreeval/:id", deleteOTReEval);


// Create a new OT Visit
router.post("/otvisit", updateTaskStatus, createOTVisit);

// Update an existing OT Visit by ID
router.put("/otvisit/:id", updateOTVisit);

// Get all OT Visits
router.get("/otvisit", getAllOTVisits);

// Get a specific OT Visit by ID
router.get("/otvisit/:id", getOTVisitById);

// Get OT Visits by Nurse ID
router.get("/otvisit/nurse/:nurseId", getOTVisitsByNurseId);

// Delete an OT Visit by ID
router.delete("/otvisit/:id", deleteOTVisit);

module.exports = router;
