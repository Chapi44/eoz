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

    // Create and save the new LPN Supervisory Visit document
    const newVisit = new LPNSupervisoryVisit(data);
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

// Get all LPN Supervisory Visits
exports.getAllLPNSupervisoryVisits = async (req, res) => {
  try {
    const visits = await LPNSupervisoryVisit.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "lpnId",
        select: "name email phone role",
      });

    res.status(200).json({
      success: true,
      message: "All LPN Supervisory Visits retrieved successfully",
      data: visits,
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
exports.getLPNSupervisoryVisitsByLPNId = async (req, res) => {
  try {
    const { lpnId } = req.params;

    // Find LPN Supervisory Visits by LPN ID
    const visits = await LPNSupervisoryVisit.find({ lpnId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "lpnId",
        select: "name email phone role",
      });

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
