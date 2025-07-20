const HumanResources = require("../model/humanResources");
const baseURL = process.env.BASE_URL || "http://localhost:5000";

const addEmployeeRecord = async (req, res) => {
  try {
    const {
      employeeId,
      jobTitle,
      department,
      dateOfHire,
      salary,
      payrollDetails,
      evv
    } = req.body;

    const hrId = req.userId;

    // Safely parse payrollDetails
    let parsedPayroll = {};
    if (payrollDetails) {
      try {
        parsedPayroll = JSON.parse(payrollDetails);
      } catch (err) {
        return res.status(400).json({ message: "Invalid payrollDetails format. Must be valid JSON." });
      }
    }

    // Safely parse evv
    let parsedEVV = [];
    if (evv) {
      try {
        parsedEVV = JSON.parse(evv);
        if (!Array.isArray(parsedEVV)) {
          return res.status(400).json({ message: "EVV must be a JSON array." });
        }
      } catch (err) {
        return res.status(400).json({ message: "Invalid EVV format. Must be a JSON array." });
      }
    }

    // Handle document uploads
    const documentPaths = {
      socialSecurity: req.files['socialSecurity'] ? baseURL + "/uploads/documents/" + req.files['socialSecurity'][0].filename : null,
      driversLicense: req.files['driversLicense'] ? baseURL + "/uploads/documents/" + req.files['driversLicense'][0].filename : null,
      greenCard: req.files['greenCard'] ? baseURL + "/uploads/documents/" + req.files['greenCard'][0].filename : null,
      workPermit: req.files['workPermit'] ? baseURL + "/uploads/documents/" + req.files['workPermit'][0].filename : null,
      citizenship: req.files['citizenship'] ? baseURL + "/uploads/documents/" + req.files['citizenship'][0].filename : null,
      cprFirstAid: req.files['cprFirstAid'] ? baseURL + "/uploads/documents/" + req.files['cprFirstAid'][0].filename : null,
      professionalLicenses: req.files['professionalLicenses'] ? baseURL + "/uploads/documents/" + req.files['professionalLicenses'][0].filename : null,
    };

    const newRecord = new HumanResources({
      employeeId,
      jobTitle,
      department,
      dateOfHire,
      salary,
      payrollDetails: parsedPayroll,
      hrId,
      documents: documentPaths,
      evv: parsedEVV
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

    // Fetch existing record to preserve current document paths
    const existingRecord = await HumanResources.findById(id);
    if (!existingRecord) {
      return res.status(404).json({ message: "Employee record not found" });
    }

    const documentPaths = {
      socialSecurity: req.files['socialSecurity'] ? baseURL + "/uploads/documents/" + req.files['socialSecurity'][0].filename : existingRecord.documents?.socialSecurity,
      driversLicense: req.files['driversLicense'] ? baseURL + "/uploads/documents/" + req.files['driversLicense'][0].filename : existingRecord.documents?.driversLicense,
      greenCard: req.files['greenCard'] ? baseURL + "/uploads/documents/" + req.files['greenCard'][0].filename : existingRecord.documents?.greenCard,
      workPermit: req.files['workPermit'] ? baseURL + "/uploads/documents/" + req.files['workPermit'][0].filename : existingRecord.documents?.workPermit,
      citizenship: req.files['citizenship'] ? baseURL + "/uploads/documents/" + req.files['citizenship'][0].filename : existingRecord.documents?.citizenship,
      cprFirstAid: req.files['cprFirstAid'] ? baseURL + "/uploads/documents/" + req.files['cprFirstAid'][0].filename : existingRecord.documents?.cprFirstAid,
      professionalLicenses: req.files['professionalLicenses'] ? baseURL + "/uploads/documents/" + req.files['professionalLicenses'][0].filename : existingRecord.documents?.professionalLicenses,
    };

    // Parse EVV if provided
    if (updatedData.evv && typeof updatedData.evv === 'string') {
      updatedData.evv = JSON.parse(updatedData.evv);
    }

    updatedData.documents = documentPaths;

    const updatedRecord = await HumanResources.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

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