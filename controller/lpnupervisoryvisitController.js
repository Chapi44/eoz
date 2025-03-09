const LPNSupervisoryVisit = require("../model/lpnSupervisory");

// Create a new LPN Supervisory Visit
exports.createLPNSupervisoryVisit = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.lpnId || !data.visitDate) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, LPN ID, and Visit Date are required",
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

    // Attach adminId to the LPN Supervisory Visit document
    const newVisit = new LPNSupervisoryVisit({
      ...data,
      adminId, // Attach admin ID
    });

    // Save the new LPN Supervisory Visit
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "LPN Supervisory Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating LPN Supervisory Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create LPN Supervisory Visit",
      error: error.message,
    });
  }
};


// Update an existing LPN Supervisory Visit by ID
exports.updateLPNSupervisoryVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the LPN Supervisory Visit document
    const updatedVisit = await LPNSupervisoryVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "LPN Supervisory Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "LPN Supervisory Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating LPN Supervisory Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update LPN Supervisory Visit",
      error: error.message,
    });
  }
};

// Get all LPN Supervisory Visits with pagination and sorting by adminId
exports.getAllLPNSupervisoryVisits = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get userId from token for filtering
    const userId = req.userId;
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Query with userId filter
    const query = { adminId: userId };

    // Fetch LPN Supervisory Visits with pagination and sorting
    const visits = await LPNSupervisoryVisit.find(query)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "lpnId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of LPN Supervisory Visits
    const totalVisits = await LPNSupervisoryVisit.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All LPN Supervisory Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching LPN Supervisory Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LPN Supervisory Visits",
      error: error.message,
    });
  }
};


// Get LPN Supervisory Visits by LPN ID with pagination and sorting
exports.getLPNSupervisoryVisitsByLPNId = async (req, res) => {
  try {
    const { lpnId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch LPN Supervisory Visits for the specified LPN ID with pagination and sorting
    const visits = await LPNSupervisoryVisit.find({ lpnId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "lpnId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of LPN Supervisory Visits for the specified LPN ID
    const totalVisits = await LPNSupervisoryVisit.countDocuments({ lpnId });

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No LPN Supervisory Visits found for the specified LPN ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "LPN Supervisory Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching LPN Supervisory Visits by LPN ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LPN Supervisory Visits by LPN ID",
      error: error.message,
    });
  }
};


// Get a specific LPN Supervisory Visit by ID
exports.getLPNSupervisoryVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the LPN Supervisory Visit document by ID
    const visit = await LPNSupervisoryVisit.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "lpnId",
        select: "name email phone role",
      });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "LPN Supervisory Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "LPN Supervisory Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching LPN Supervisory Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LPN Supervisory Visit",
      error: error.message,
    });
  }
};

// Get LPN Supervisory Visits by LPN ID

// Delete an LPN Supervisory Visit by ID
exports.deleteLPNSupervisoryVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the LPN Supervisory Visit by ID
    const deletedVisit = await LPNSupervisoryVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "LPN Supervisory Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "LPN Supervisory Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting LPN Supervisory Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete LPN Supervisory Visit",
      error: error.message,
    });
  }
};



const LVNHourlyVisit = require("../model/lvnHourlyVisit");

// Create a new LVN Hourly Visit
exports.createLVNHourlyVisit = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.primaryDiagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Primary Diagnosis are required",
      });
    }

    // Create and save the new LVN Hourly Visit document
    const newVisit = new LVNHourlyVisit(data);
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "LVN Hourly Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating LVN Hourly Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create LVN Hourly Visit",
      error: error.message,
    });
  }
};

// Update an existing LVN Hourly Visit by ID
exports.updateLVNHourlyVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the LVN Hourly Visit document
    const updatedVisit = await LVNHourlyVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "LVN Hourly Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "LVN Hourly Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating LVN Hourly Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update LVN Hourly Visit",
      error: error.message,
    });
  }
};

// Get all LVN Hourly Visits
exports.getAllLVNHourlyVisits = async (req, res) => {
  try {
    const visits = await LVNHourlyVisit.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    res.status(200).json({
      success: true,
      message: "All LVN Hourly Visits retrieved successfully",
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching LVN Hourly Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LVN Hourly Visits",
      error: error.message,
    });
  }
};

// Get a specific LVN Hourly Visit by ID
exports.getLVNHourlyVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the LVN Hourly Visit document by ID
    const visit = await LVNHourlyVisit.findById(id)
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
        message: "LVN Hourly Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "LVN Hourly Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching LVN Hourly Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LVN Hourly Visit",
      error: error.message,
    });
  }
};

// Get LVN Hourly Visits by Nurse ID
exports.getLVNHourlyVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;

    // Find LVN Hourly Visits by Nurse ID
    const visits = await LVNHourlyVisit.find({ nurseId })
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
        message: "No LVN Hourly Visits found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "LVN Hourly Visits retrieved successfully",
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching LVN Hourly Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve LVN Hourly Visits by Nurse ID",
      error: error.message,
    });
  }
};

// Delete an LVN Hourly Visit by ID
exports.deleteLVNHourlyVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the LVN Hourly Visit by ID
    const deletedVisit = await LVNHourlyVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "LVN Hourly Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "LVN Hourly Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting LVN Hourly Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete LVN Hourly Visit",
      error: error.message,
    });
  }
};
