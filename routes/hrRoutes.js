const express = require("express");
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

// Add a new employee record
router.post("/hr/addEmployee", authMiddleware, addEmployeeRecord);

// Update employee information
router.put("/hr/updateEmployee/:id",authMiddleware, updateEmployeeInfo);

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

module.exports = router;
