const express = require("express");
const router = express.Router();
const {
  createDoctorOrder,
  updateDoctorOrder,
  getAllDoctorOrders,
  getDoctorOrderById,
  getDoctorOrdersByPhysicianId,
  deleteDoctorOrder,
  createFoleyCathChange,
  updateFoleyCathChange,
  getAllFoleyCathChange,
  getFoleyCathChangeById,
  getFoleyCathChangeByPhysicianId,
  deleteFoleyCathChange,
} = require("../controller/doctororderController");

const updateTaskStatus = require("../middelware/updateTaskStatus");

// Create a new Doctor Order
router.post("/doctororder", updateTaskStatus, createDoctorOrder);

// Update an existing Doctor Order by ID
router.put("/doctororder/:id", updateDoctorOrder);

// Get all Doctor Orders
router.get("/doctororder", getAllDoctorOrders);

// Get a specific Doctor Order by ID
router.get("/doctororder/:id", getDoctorOrderById);

// Get Doctor Orders by Physician ID
router.get("/doctororder/physician/:physicianId", getDoctorOrdersByPhysicianId);

// Delete a Doctor Order by ID
router.delete("/doctororder/:id", deleteDoctorOrder);


// Create a new Foley Cath Change record
router.post("/foleycathchange",updateTaskStatus, createFoleyCathChange);

// Update an existing Foley Cath Change record by ID
router.put("/foleycathchange/:id", updateFoleyCathChange);

// Get all Foley Cath Change records
router.get("/foleycathchange", getAllFoleyCathChange);

// Get a specific Foley Cath Change record by ID
router.get("/foleycathchange/:id", getFoleyCathChangeById);

// Get Foley Cath Change records by Physician ID
router.get("/foleycathchange/physician/:physicianId", getFoleyCathChangeByPhysicianId);

// Delete a Foley Cath Change record by ID
router.delete("/foleycathchange/:id", deleteFoleyCathChange);


const {
  createFaceToFace,
  updateFaceToFace,
  getAllFaceToFace,
  getFaceToFaceById,
  getFaceToFaceByPhysicianId,
  deleteFaceToFace,
  createHHAPlanOfCare,
  updateHHAPlanOfCare,
  getAllHHAPlansOfCare,
  getHHAPlanOfCareById,
  getHHAPlansOfCareByPhysicianId,
  deleteHHAPlanOfCare,
} = require("../controller/facetofaceController");

// Create a new FaceToFace record
router.post("/facetoface", createFaceToFace);

// Update an existing FaceToFace record by ID
router.put("/facetoface/:id", updateFaceToFace);

// Get all FaceToFace records
router.get("/facetoface", getAllFaceToFace);

// Get a specific FaceToFace record by ID
router.get("/facetoface/:id", getFaceToFaceById);

// Get FaceToFace records by Physician ID
router.get("/facetoface/physician/:physicianId", getFaceToFaceByPhysicianId);

// Delete a FaceToFace record by ID
router.delete("/facetoface/:id", deleteFaceToFace);


// Create a new HHA Plan of Care
router.post("/hhaplanofcare", createHHAPlanOfCare);

// Update an existing HHA Plan of Care by ID
router.put("/hhaplanofcare/:id", updateHHAPlanOfCare);

// Get all HHA Plans of Care
router.get("/hhaplanofcare", getAllHHAPlansOfCare);

// Get a specific HHA Plan of Care by ID
router.get("/hhaplanofcare/:id", getHHAPlanOfCareById);

// Get HHA Plans of Care by Physician ID
router.get("/hhaplanofcare/physician/:physicianId", getHHAPlansOfCareByPhysicianId);

// Delete a HHA Plan of Care by ID
router.delete("/hhaplanofcare/:id", deleteHHAPlanOfCare);



module.exports = router;
