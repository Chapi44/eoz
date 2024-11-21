const HumanResources = require("../model/humanResources");

// Add a new employee record
const addEmployeeRecord = async (req, res) => {
  try {
    const { employeeId, jobTitle, department, dateOfHire, salary, payrollDetails } = req.body;
    const hrId = req.userId

    const newRecord = new HumanResources({
      employeeId,
      jobTitle,
      department,
      dateOfHire,
      salary,
      payrollDetails,
      hrId
    });

    const savedRecord = await newRecord.save();
    res.status(201).json({ message: "Employee record added successfully", data: savedRecord });
  } catch (error) {
    res.status(500).json({ message: "Failed to add employee record", error: error.message });
  }
};

// Update employee information
const updateEmployeeInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedRecord = await HumanResources.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    res.status(200).json({ message: "Employee information updated successfully", data: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: "Failed to update employee information", error: error.message });
  }
};

// Add a performance evaluation
const addPerformanceEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, rating, feedback } = req.body;

    const employeeRecord = await HumanResources.findById(id);
    if (!employeeRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    employeeRecord.performanceEvaluations.push({ date, rating, feedback });
    await employeeRecord.save();

    res.status(200).json({ message: "Performance evaluation added successfully", data: employeeRecord });
  } catch (error) {
    res.status(500).json({ message: "Failed to add performance evaluation", error: error.message });
  }
};

// Add a leave record
const addLeaveRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { leaveType, startDate, endDate } = req.body;

    const employeeRecord = await HumanResources.findById(id);
    if (!employeeRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    employeeRecord.leaveRecords.push({ leaveType, startDate, endDate });
    await employeeRecord.save();

    res.status(200).json({ message: "Leave record added successfully", data: employeeRecord });
  } catch (error) {
    res.status(500).json({ message: "Failed to add leave record", error: error.message });
  }
};

// Calculate net salary
const calculateNetSalary = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeRecord = await HumanResources.findById(id);

    if (!employeeRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    const deductionsTotal = employeeRecord.payrollDetails.deductions.reduce((sum, item) => sum + item.amount, 0);
    const netSalary = employeeRecord.salary - deductionsTotal;

    employeeRecord.payrollDetails.netSalary = netSalary;
    await employeeRecord.save();

    res.status(200).json({ message: "Net salary calculated and updated", netSalary });
  } catch (error) {
    res.status(500).json({ message: "Failed to calculate net salary", error: error.message });
  }
};

// Update employment status
const updateEmploymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { employmentStatus } = req.body;

    const employeeRecord = await HumanResources.findByIdAndUpdate(id, { employmentStatus }, { new: true });
    if (!employeeRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    res.status(200).json({ message: "Employment status updated", data: employeeRecord });
  } catch (error) {
    res.status(500).json({ message: "Failed to update employment status", error: error.message });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await HumanResources.find()
      .populate("employeeId", "name email phoneNumber") // Populate basic employee details
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .exec();
    
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees", error: error.message });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await HumanResources.findById(id)
      .populate("employeeId", "name email phoneNumber")
      .exec();

    if (!employee) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee", error: error.message });
  }
};

module.exports = {
  addEmployeeRecord,
  updateEmployeeInfo,
  addPerformanceEvaluation,
  addLeaveRecord,
  calculateNetSalary,
  updateEmploymentStatus,
  getAllEmployees,
  getEmployeeById,
};