const express = require("express");
const router = express.Router();
const {
  createCommunicationNote,
  updateCommunicationNote,
  getAllCommunicationNotes,
  getCommunicationNoteById,
  getCommunicationNotesByPhysicianId,
  deleteCommunicationNote,
  createIncidentReport,
  updateIncidentReport,
  getAllIncidentReports,
  getIncidentReportById,
  getIncidentReportsByPhysicianId,
  deleteIncidentReport,
} = require("../controller/communicationNoteController");
const updateTaskStatus = require("../middelware/updateTaskStatus");
const { authMiddleware } = require("../middelware/authMiddleware");

// Create a new CommunicationNote
router.post("/communicationnote",authMiddleware, updateTaskStatus, createCommunicationNote);

// Update an existing CommunicationNote by ID
router.put("/communicationnote/:id", updateCommunicationNote);

// Get all CommunicationNotes
router.get("/communicationnote", authMiddleware, getAllCommunicationNotes);

// Get a specific CommunicationNote by ID
router.get("/communicationnote/:id", getCommunicationNoteById);

// Get CommunicationNotes by Physician ID
router.get("/communicationnote/physician/:physicianId", getCommunicationNotesByPhysicianId);

// Delete a CommunicationNote by ID
router.delete("/communicationnote/:id", deleteCommunicationNote);

// Create a new Incident Report
router.post("/incidentreport", authMiddleware, updateTaskStatus, createIncidentReport);

// Update an existing Incident Report by ID
router.put("/incidentreport/:id", updateIncidentReport);

// Get all Incident Reports
router.get("/incidentreport", authMiddleware, getAllIncidentReports);

// Get a specific Incident Report by ID
router.get("/incidentreport/:id", getIncidentReportById);

// Get Incident Reports by Physician ID
router.get("/incidentreport/physician/:physicianId", getIncidentReportsByPhysicianId);

// Delete an Incident Report by ID
router.delete("/incidentreport/:id", deleteIncidentReport);





const {
    createCoordinationOfCare,
    updateCoordinationOfCare,
    getAllCoordinationOfCare,
    getCoordinationOfCareById,
    deleteCoordinationOfCare,
    getAllCoordinationOfCareByPhysicianId
  } = require("../controller/cordinationofcareController");
  
  // Create a new CoordinationOfCare
  router.post("/coordinationofcare", authMiddleware, updateTaskStatus, createCoordinationOfCare);
  
  // Update an existing CoordinationOfCare by ID
  router.put("/coordinationofcare/:id", updateCoordinationOfCare);
  
  // Get all CoordinationOfCare documents
  router.get("/coordinationofcare", authMiddleware,  getAllCoordinationOfCare);
  
  // Get a specific CoordinationOfCare by ID
  router.get("/coordinationofcare/:id", getCoordinationOfCareById);
  
  // Delete a CoordinationOfCare by ID
  router.delete("/coordinationofcare/:id", deleteCoordinationOfCare);


  // Get Coordination of Care documents by Physician ID
router.get("/coordinationofcare/physician/:physicianId", getAllCoordinationOfCareByPhysicianId);

module.exports = router;
