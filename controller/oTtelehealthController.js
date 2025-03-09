const OTTelehealth = require("../model/oThealth");

// Create a new OT Telehealth Visit
exports.createOTTelehealth = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.primaryDiagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Primary Diagnosis are required",
      });
    }

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Attach adminId to the OT Telehealth Visit document
    const newVisit = new OTTelehealth({
      ...data,
      adminId, // Attach admin ID
    });

    // Save the new OT Telehealth Visit
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "OT Telehealth Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating OT Telehealth Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create OT Telehealth Visit",
      error: error.message,
    });
  }
};


// Update an existing OT Telehealth Visit by ID
exports.updateOTTelehealth = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the OT Telehealth record
    const updatedVisit = await OTTelehealth.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "OT Telehealth Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Telehealth Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating OT Telehealth Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update OT Telehealth Visit",
      error: error.message,
    });
  }
};

// Get all OT Telehealth Visits with pagination and sorting
exports.getAllOTTelehealth = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default: page 1, limit 10

    // Get adminId from token for filtering
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Query with adminId filter
    const query = { adminId };

    // Fetch OT Telehealth Visits with pagination and sorting
    const visits = await OTTelehealth.find(query)
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)) // Limit the number of documents returned
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    const totalRecords = await OTTelehealth.countDocuments(query); // Total number of records

    res.status(200).json({
      success: true,
      message: "All OT Telehealth Visits retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching OT Telehealth Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Telehealth Visits",
      error: error.message,
    });
  }
};


// Get OT Telehealth Visits by Nurse ID with pagination and sorting
exports.getOTTelehealthByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default: page 1, limit 10

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const visits = await OTTelehealth.find({ nurseId })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)) // Limit the number of documents returned
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OT Telehealth Visits found for the specified Nurse ID",
      });
    }

    const totalRecords = await OTTelehealth.countDocuments({ nurseId }); // Total records for the nurse

    res.status(200).json({
      success: true,
      message: "OT Telehealth Visits retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching OT Telehealth Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Telehealth Visits by Nurse ID",
      error: error.message,
    });
  }
};


// Get a specific OT Telehealth Visit by ID
exports.getOTTelehealthById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the OT Telehealth record by ID
    const visit = await OTTelehealth.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "OT Telehealth Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Telehealth Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching OT Telehealth Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Telehealth Visit",
      error: error.message,
    });
  }
};



// Delete an OT Telehealth Visit by ID
exports.deleteOTTelehealth = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the OT Telehealth Visit by ID
    const deletedVisit = await OTTelehealth.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "OT Telehealth Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Telehealth Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting OT Telehealth Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete OT Telehealth Visit",
      error: error.message,
    });
  }
};


const OTReEval = require("../model/otReval");

// Create a new OT Re-Evaluation record
exports.createOTReEval = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.evaluationDate || !data.reason) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Evaluation Date, and Reason are required",
      });
    }

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Attach adminId to the OT Re-Evaluation document
    const newRecord = new OTReEval({
      ...data,
      adminId, // Attach admin ID
    });

    // Save the new OT Re-Evaluation record
    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "OT Re-Evaluation record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating OT Re-Evaluation record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create OT Re-Evaluation record",
      error: error.message,
    });
  }
};


// Update an existing OT Re-Evaluation record by ID
exports.updateOTReEval = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the OT Re-Evaluation record
    const updatedRecord = await OTReEval.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: "OT Re-Evaluation record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Re-Evaluation record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating OT Re-Evaluation record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update OT Re-Evaluation record",
      error: error.message,
    });
  }
};

// Get all OT Re-Evaluation records with pagination and sorting by adminId
exports.getAllOTReEvals = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get adminId from token for filtering
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Query with adminId filter
    const query = { adminId };

    // Fetch OT Re-Evaluation records with pagination and sorting
    const records = await OTReEval.find(query)
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

    // Get the total count of OT Re-Evaluation records
    const totalRecords = await OTReEval.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All OT Re-Evaluation records retrieved successfully",
      data: records,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
        totalItems: totalRecords,
      },
    });
  } catch (error) {
    console.error("Error fetching OT Re-Evaluation records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Re-Evaluation records",
      error: error.message,
    });
  }
};


// Get OT Re-Evaluation records by Nurse ID with pagination and sorting
exports.getOTReEvalsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch OT Re-Evaluation records by Nurse ID with pagination and sorting
    const records = await OTReEval.find({ nurseId })
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

    // Get the total count of OT Re-Evaluation records for the specified Nurse ID
    const totalRecords = await OTReEval.countDocuments({ nurseId });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OT Re-Evaluation records found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Re-Evaluation records retrieved successfully",
      data: records,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalRecords / limit),
        totalItems: totalRecords,
      },
    });
  } catch (error) {
    console.error("Error fetching OT Re-Evaluation records by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Re-Evaluation records by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific OT Re-Evaluation record by ID
exports.getOTReEvalById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the OT Re-Evaluation record by ID
    const record = await OTReEval.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })


    if (!record) {
      return res.status(404).json({
        success: false,
        message: "OT Re-Evaluation record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Re-Evaluation record retrieved successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error fetching OT Re-Evaluation record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Re-Evaluation record",
      error: error.message,
    });
  }
};

// Get OT Re-Evaluation records by Nurse ID

// Delete an OT Re-Evaluation record by ID
exports.deleteOTReEval = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the OT Re-Evaluation record by ID
    const deletedRecord = await OTReEval.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "OT Re-Evaluation record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Re-Evaluation record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting OT Re-Evaluation record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete OT Re-Evaluation record",
      error: error.message,
    });
  }
};


const OTVisit = require("../model/oTvisit");

// Create a new OT Visit
exports.createOTVisit = async (req, res) => {
  try {
    const data = req.body;

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Attach adminId to the OT Visit record
    const newVisit = new OTVisit({
      ...data,
      adminId, // Attach adminId
    });

    // Save the new OT Visit
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "OT Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating OT Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create OT Visit",
      error: error.message,
    });
  }
};

// Update an existing OT Visit by ID
exports.updateOTVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the OT Visit
    const updatedVisit = await OTVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "OT Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating OT Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update OT Visit",
      error: error.message,
    });
  }
};

// Get all OT Visits with pagination and sorting
exports.getAllOTVisits = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get adminId from token for filtering
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Build the filter to include adminId
    const filter = { adminId };

    // Fetch OT Visits with pagination and sorting
    const visits = await OTVisit.find(filter)
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

    // Get the total count of OT Visits matching the filter
    const totalVisits = await OTVisit.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "All OT Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching OT Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Visits",
      error: error.message,
    });
  }
};


// Get OT Visits by Nurse ID with pagination and sorting
exports.getOTVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch OT Visits by Nurse ID with pagination and sorting
    const visits = await OTVisit.find({ nurseId })
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

    // Get the total count of OT Visits for the specified Nurse ID
    const totalVisits = await OTVisit.countDocuments({ nurseId });

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OT Visits found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching OT Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Visits by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific OT Visit by ID
exports.getOTVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the OT Visit by ID
    const visit = await OTVisit.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })


    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "OT Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching OT Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OT Visit",
      error: error.message,
    });
  }
};



// Delete an OT Visit by ID
exports.deleteOTVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the OT Visit by ID
    const deletedVisit = await OTVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "OT Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OT Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting OT Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete OT Visit",
      error: error.message,
    });
  }
};
