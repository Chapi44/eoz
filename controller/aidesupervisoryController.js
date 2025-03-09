const AideSupervisoryVisit = require("../model/aideSupervisory");

// Create a new AideSupervisoryVisit
exports.createAideSupervisoryVisit = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, and Visit Date are required",
      });
    }

    // Attach adminId from token
    const adminId = req.user?.adminId; // Get from JWT token payload
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Include adminId in the document
    const newSupervisoryVisit = new AideSupervisoryVisit({
      ...data,
      adminId, // Attach admin ID
    });

    // Save to database
    await newSupervisoryVisit.save();

    res.status(201).json({
      success: true,
      message: "Aide Supervisory Visit created successfully",
      data: newSupervisoryVisit,
    });
  } catch (error) {
    console.error("Error creating Aide Supervisory Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Aide Supervisory Visit",
      error: error.message,
    });
  }
};


// Update an existing AideSupervisoryVisit by ID
exports.updateAideSupervisoryVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the AideSupervisoryVisit document
    const updatedVisit = await AideSupervisoryVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Aide Supervisory Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Supervisory Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating Aide Supervisory Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Aide Supervisory Visit",
      error: error.message,
    });
  }
};

// Get all AideSupervisoryVisits
exports.getAllAideSupervisoryVisits = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Attach adminId from req.userId
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    // Build query with adminId filter
    const query = { adminId };

    // Fetch visits with pagination and sorting
    const visits = await AideSupervisoryVisit.find(query)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by creation date (latest first)
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of visits
    const totalVisits = await AideSupervisoryVisit.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Aide Supervisory Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Aide Supervisory Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Aide Supervisory Visits",
      error: error.message,
    });
  }
};


exports.getAideSupervisoryVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params; // Get Nurse ID from route parameters
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch AideSupervisoryVisits for the specified Nurse ID with pagination
    const supervisoryVisits = await AideSupervisoryVisit.find({ nurseId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt (newest first)
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of AideSupervisoryVisits for the specified Nurse ID
    const totalVisits = await AideSupervisoryVisit.countDocuments({ nurseId });

    if (!supervisoryVisits || supervisoryVisits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Aide Supervisory Visits found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Supervisory Visits retrieved successfully",
      data: supervisoryVisits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Aide Supervisory Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Aide Supervisory Visits by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific AideSupervisoryVisit by ID
exports.getAideSupervisoryVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the AideSupervisoryVisit by ID
    const visit = await AideSupervisoryVisit.findById(id)      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });;

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Aide Supervisory Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Supervisory Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching Aide Supervisory Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Aide Supervisory Visit",
      error: error.message,
    });
  }
};

// Delete an AideSupervisoryVisit by ID
exports.deleteAideSupervisoryVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the AideSupervisoryVisit by ID
    const deletedVisit = await AideSupervisoryVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Aide Supervisory Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Supervisory Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Aide Supervisory Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Aide Supervisory Visit",
      error: error.message,
    });
  }
};



