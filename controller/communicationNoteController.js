const CommunicationNote = require("../model/communicationNote");

// Create a new CommunicationNote
exports.createCommunicationNote = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.date) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, and Date are required",
      });
    }

    // Attach adminId from token
    const adminId = req.user?.adminId; // Use req.user?.adminId like you requested
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Include adminId in the document
    const newCommunicationNote = new CommunicationNote({
      ...data,
      adminId, // Attach admin ID
    });

    // Save to database
    await newCommunicationNote.save();

    res.status(201).json({
      success: true,
      message: "Communication Note created successfully",
      data: newCommunicationNote,
    });
  } catch (error) {
    console.error("Error creating Communication Note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Communication Note",
      error: error.message,
    });
  }
};


// Update an existing CommunicationNote by ID
exports.updateCommunicationNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the CommunicationNote document
    const updatedNote = await CommunicationNote.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Communication Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Communication Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating Communication Note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Communication Note",
      error: error.message,
    });
  }
};

// Get all CommunicationNotes
exports.getAllCommunicationNotes = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Use req.userId for admin filter as requested
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    // Query with adminId filter
    const query = { adminId };

    // Fetch Communication Notes
    const notes = await CommunicationNote.find(query)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Total count for pagination
    const totalNotes = await CommunicationNote.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All Communication Notes retrieved successfully",
      data: notes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalNotes / limit),
        totalItems: totalNotes,
      },
    });
  } catch (error) {
    console.error("Error fetching Communication Notes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Communication Notes",
      error: error.message,
    });
  }
};


exports.getCommunicationNotesByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Communication Notes for the specified Physician ID with pagination
    const notes = await CommunicationNote.find({ physicianId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of Communication Notes for the specified Physician ID
    const totalNotes = await CommunicationNote.countDocuments({ physicianId });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Communication Notes found for the specified Physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Communication Notes retrieved successfully",
      data: notes,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalNotes / limit),
        totalItems: totalNotes,
      },
    });
  } catch (error) {
    console.error("Error fetching Communication Notes by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Communication Notes by Physician ID",
      error: error.message,
    });
  }
};


// Get a specific CommunicationNote by ID
exports.getCommunicationNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the CommunicationNote by ID
    const note = await CommunicationNote.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Communication Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Communication Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error fetching Communication Note by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Communication Note",
      error: error.message,
    });
  }
};

// Get CommunicationNotes by Physician ID
exports.getCommunicationNotesByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;

    // Find all CommunicationNotes for the specified Physician ID
    const notes = await CommunicationNote.find({ physicianId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!notes || notes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Communication Notes found for the specified Physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Communication Notes retrieved successfully",
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching Communication Notes by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Communication Notes by Physician ID",
      error: error.message,
    });
  }
};

// Delete a CommunicationNote by ID
exports.deleteCommunicationNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the CommunicationNote by ID
    const deletedNote = await CommunicationNote.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Communication Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Communication Note deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Communication Note:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Communication Note",
      error: error.message,
    });
  }
};



const IncidentReport = require("../model/incidentReport");

// Create a new Incident Report
exports.createIncidentReport = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    // Validate required fields
    if (!data.patientId || !data.dateOfIncident || !data.severityOfIncident) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Date of Incident, and Severity of Incident are required",
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

    // Attach adminId to the incident report
    const newReport = new IncidentReport({
      ...data,
      adminId, // Attach admin ID
    });

    // Save the new incident report
    await newReport.save();

    res.status(201).json({
      success: true,
      message: "Incident Report created successfully",
      data: newReport,
    });
  } catch (error) {
    console.error("Error creating Incident Report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Incident Report",
      error: error.message,
    });
  }
};

// Update an existing Incident Report by ID
exports.updateIncidentReport = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Incident Report document
    const updatedReport = await IncidentReport.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedReport) {
      return res.status(404).json({
        success: false,
        message: "Incident Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident Report updated successfully",
      data: updatedReport,
    });
  } catch (error) {
    console.error("Error updating Incident Report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Incident Report",
      error: error.message,
    });
  }
};

// Get all Incident Reports with pagination and sorting by adminId
exports.getAllIncidentReports = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query
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

    // Fetch Incident Reports with pagination and sorting
    const reports = await IncidentReport.find(query)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "attendingPhysician",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of Incident Reports
    const totalReports = await IncidentReport.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All Incident Reports retrieved successfully",
      data: reports,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReports / limit),
        totalItems: totalReports,
      },
    });
  } catch (error) {
    console.error("Error fetching Incident Reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Incident Reports",
      error: error.message,
    });
  }
};


// Get Incident Reports by Physician ID with pagination and sorting
exports.getIncidentReportsByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params; // Get Physician ID from route parameters
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Incident Reports for the specified Physician ID with pagination and sorting
    const reports = await IncidentReport.find({ physicianId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "attendingPhysician",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of Incident Reports for the specified Physician ID
    const totalReports = await IncidentReport.countDocuments({ attendingPhysician: physicianId });

    if (!reports || reports.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Incident Reports found for the specified Physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident Reports retrieved successfully",
      data: reports,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReports / limit),
        totalItems: totalReports,
      },
    });
  } catch (error) {
    console.error("Error fetching Incident Reports by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Incident Reports by Physician ID",
      error: error.message,
    });
  }
};

// Get a specific Incident Report by ID
exports.getIncidentReportById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Incident Report by ID
    const report = await IncidentReport.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "attendingPhysician",
        select: "name email phone role",
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Incident Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident Report retrieved successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error fetching Incident Report by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Incident Report",
      error: error.message,
    });
  }
};



// Delete an Incident Report by ID
exports.deleteIncidentReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Incident Report by ID
    const deletedReport = await IncidentReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        message: "Incident Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Incident Report deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Incident Report:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Incident Report",
      error: error.message,
    });
  }
};
