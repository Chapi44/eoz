const InfectionReport = require("../model/infectionReport");

// Create a new Infection Report
exports.createInfectionReport = async (req, res) => {
  try {
    const data = req.body;

    // // Validate required fields
    // if (!data.patientId || !data.nurseId || !data.attendingPhysician || !data.dateOfInfection || !data.primaryDiagnosis) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Patient ID, Nurse ID, Attending Physician, Date of Infection, and Primary Diagnosis are required",
    //   });
    // }

    // Create and save the new Infection Report document
    const newReport = new InfectionReport(data);
    await newReport.save();

    res.status(201).json({
      success: true,
      message: "Infection Report created successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating Infection Report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Infection Report",
      error: error.message,
    });
  }
};

// Update an existing Infection Report by ID
exports.updateInfectionReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Infection Report document
    const updatedReport = await InfectionReport.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Infection Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infection Report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating Infection Report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Infection Report",
      error: error.message,
    });
  }
};

// Get all Infection Reports with pagination and sorting
exports.getAllInfectionReports = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Infection Reports with pagination and sorting by createdAt in descending order
    const reports = await InfectionReport.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of Infection Reports
    const totalReports = await InfectionReport.countDocuments();

    res.status(200).json({
      success: true,
      message: "All Infection Reports retrieved successfully",
      data: reports,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReports / limit),
        totalItems: totalReports,
      },
    });
  } catch (error) {
    console.error("Error fetching Infection Reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Infection Reports",
      error: error.message,
    });
  }
};

// Get Infection Reports by Nurse ID with pagination and sorting
exports.getInfectionReportsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Infection Reports for the specified Nurse ID with pagination and sorting
    const reports = await InfectionReport.find({ nurseId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of Infection Reports for the specified Nurse ID
    const totalReports = await InfectionReport.countDocuments({ nurseId });

    if (!reports || reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Infection Reports found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infection Reports retrieved successfully",
      data: reports,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReports / limit),
        totalItems: totalReports,
      },
    });
  } catch (error) {
    console.error("Error fetching Infection Reports by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Infection Reports by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific Infection Report by ID
exports.getInfectionReportById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Infection Report by ID
    const report = await InfectionReport.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Infection Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infection Report retrieved successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error fetching Infection Report by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Infection Report",
      error: error.message,
    });
  }
};

// Get Infection Reports by Nurse ID


// Delete an Infection Report by ID
exports.deleteInfectionReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Infection Report by ID
    const deletedReport = await InfectionReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        message: "Infection Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infection Report deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Infection Report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Infection Report",
      error: error.message,
    });
  }
};





const InfusionTherapy = require("../model/infusionTherapy");

// Create a new Infusion Therapy record
exports.createInfusionTherapy = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.visitDate || !data.primaryDiagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, Visit Date, and Primary Diagnosis are required",
      });
    }

    // Create and save the new Infusion Therapy document
    const newRecord = new InfusionTherapy(data);
    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Infusion Therapy record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating Infusion Therapy record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Infusion Therapy record",
      error: error.message,
    });
  }
};

// Update an existing Infusion Therapy record by ID
exports.updateInfusionTherapy = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Infusion Therapy document
    const updatedRecord = await InfusionTherapy.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: "Infusion Therapy record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infusion Therapy record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating Infusion Therapy record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Infusion Therapy record",
      error: error.message,
    });
  }
};

// Get all Infusion Therapy records
exports.getAllInfusionTherapies = async (req, res) => {
  try {
    const records = await InfusionTherapy.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    res.status(200).json({
      success: true,
      message: "All Infusion Therapy records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching Infusion Therapy records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Infusion Therapy records",
      error: error.message,
    });
  }
};

// Get a specific Infusion Therapy record by ID
exports.getInfusionTherapyById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Infusion Therapy document by ID
    const record = await InfusionTherapy.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Infusion Therapy record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infusion Therapy record retrieved successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error fetching Infusion Therapy record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Infusion Therapy record",
      error: error.message,
    });
  }
};

// Get Infusion Therapy records by Physician ID
exports.getInfusionTherapiesByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;

    // Find Infusion Therapy records by Physician ID
    const records = await InfusionTherapy.find({ physicianId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Infusion Therapy records found for the specified Physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infusion Therapy records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching Infusion Therapy records by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Infusion Therapy records by Physician ID",
      error: error.message,
    });
  }
};

// Delete an Infusion Therapy record by ID
exports.deleteInfusionTherapy = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Infusion Therapy record by ID
    const deletedRecord = await InfusionTherapy.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Infusion Therapy record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Infusion Therapy record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Infusion Therapy record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Infusion Therapy record",
      error: error.message,
    });
  }
};
