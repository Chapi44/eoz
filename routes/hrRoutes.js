const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addEmployeeRecord,
  updateEmployeeInfo,
  addPerformanceEvaluation,
  addLeaveRecord,
  calculateNetSalary,
  updateEmploymentStatus,
  getAllEmployees,
  getEmployeeById,
} = require("../controller/hrController");
const {
    authAuthorization ,
    authMiddleware ,
  } = require("../middelware/authMiddleware");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "pictures") {
      cb(null, 'uploads/profilepic/');
    } else if (
      [
        "socialSecurity",
        "driversLicense",
        "greenCard",
        "workPermit",
        "citizenship",
        "cprFirstAid",
        "professionalLicenses"
      ].includes(file.fieldname)
    ) {
      cb(null, 'uploads/documents/');
    } else if (file.fieldname === "shopImage") {
      cb(null, 'uploads/shopImage/');
    } else if (file.fieldname === "brochureImage") {
      cb(null, 'uploads/brochureImage/');
    } else {
      cb(null, 'uploads/');
    }
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const ext = path.extname(file.originalname);   // ✅ Safe extension
    const baseName = file.fieldname;               // use field name as prefix
    cb(null, `${baseName}-${timestamp}${ext}`);    // final format
  }
});


const upload = multer({ storage });

// Fields expected in upload
const uploadFields = upload.fields([
  { name: 'socialSecurity', maxCount: 1 },
  { name: 'driversLicense', maxCount: 1 },
  { name: 'greenCard', maxCount: 1 },
  { name: 'workPermit', maxCount: 1 },
  { name: 'citizenship', maxCount: 1 },
  { name: 'cprFirstAid', maxCount: 1 },
  { name: 'professionalLicenses', maxCount: 1 }
]);


// HR routes
router.post("/hr/addEmployee", authMiddleware, uploadFields, addEmployeeRecord);
router.put("/hr/updateEmployee/:id", authMiddleware, uploadFields, updateEmployeeInfo);

// Add a performance evaluation for an employee
router.post("/hr/addEvaluation/:id", authMiddleware, addPerformanceEvaluation);

// Add a leave record for an employee
router.post("/hr/addLeave/:id", authMiddleware, addLeaveRecord);

// Calculate and update net salary for an employee
router.get("/hr/calculateNetSalary/:id", calculateNetSalary);

// Update employment status for an employee
router.put("/hr/updateEmploymentStatus/:id", updateEmploymentStatus);

// Get all employees
router.get("/hr/employees", getAllEmployees);

// Get an employee by ID
router.get("/hr/employees/:id", getEmployeeById);



const agencyController = require('../controller/homeHealthAgencyController');

// CRUD Routes
router.post('/agencies', agencyController.createAgency);
router.get('/agencies', agencyController.getAllAgencies);
router.get('/agencies/:id', agencyController.getAgencyById);
router.put('/agencies/:id', agencyController.updateAgency);
router.delete('/agencies/:id', agencyController.deleteAgency);


module.exports = router;
