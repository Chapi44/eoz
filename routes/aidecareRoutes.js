const express = require("express");
const router = express.Router();
const {
  createAideCarePlan,
  updateAideCarePlan,
  getAllAideCarePlans,
  getAideCarePlanById,
  getAideCarePlansByNurseId,
  deleteAideCarePlan
} = require("../controller/aidecareController");
const updateTaskStatus = require("../middelware/updateTaskStatus");
const { authMiddleware } = require("../middelware/authMiddleware");

// Create a new AideCarePlan
router.post("/createaid", authMiddleware, updateTaskStatus, createAideCarePlan);

// Update an existing AideCarePlan by ID
router.put("/getaid/:id", updateAideCarePlan);

// Get all AideCarePlans
router.get("/aid", authMiddleware, getAllAideCarePlans);

// Get a specific AideCarePlan by ID
router.get("/aid/:id", getAideCarePlanById);


router.get("/aid/nurse/:nurseId", getAideCarePlansByNurseId);

router.delete("/aid/:id",deleteAideCarePlan)



const {
  createAideSupervisoryVisit,
  updateAideSupervisoryVisit,
  getAllAideSupervisoryVisits,
  getAideSupervisoryVisitById,
  deleteAideSupervisoryVisit,
  getAideSupervisoryVisitsByNurseId
} = require("../controller/aidesupervisoryController");

// Create a new AideSupervisoryVisit
router.post("/aidesupervisory", authMiddleware, updateTaskStatus, createAideSupervisoryVisit);

// Update an existing AideSupervisoryVisit by ID
router.put("/aidesupervisory/:id", updateAideSupervisoryVisit);

// Get all AideSupervisoryVisits
router.get("/aidesupervisory", authMiddleware, getAllAideSupervisoryVisits);

// Get a specific AideSupervisoryVisit by ID
router.get("/aidesupervisory/:id",  getAideSupervisoryVisitById);

// Delete an AideSupervisoryVisit by ID
router.delete("/aidesupervisory/:id", deleteAideSupervisoryVisit);


router.get("/aidesupervisory/nurse/:nurseId", getAideSupervisoryVisitsByNurseId);


module.exports = router;
