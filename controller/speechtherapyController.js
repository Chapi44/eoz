const SpeechTherapyVisit = require("../model/speechTherapyVisit");

// Create a new Speech Therapy Visit
exports.createSpeechTherapyVisit = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    // if (!data.patientId || !data.nurseId || !data.visitDate || !data.episodePeriod || !data.physician) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Patient ID, Nurse ID, Visit Date, Episode Period, and Physician are required",
    //   });
    // }

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Attach adminId to the Speech Therapy Visit document
    const newVisit = new SpeechTherapyVisit({
      ...data,
      adminId, // Attach admin ID
    });

    // Save the new Speech Therapy Visit
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "Speech Therapy Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating Speech Therapy Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Speech Therapy Visit",
      error: error.message,
    });
  }
};


// Update an existing Speech Therapy Visit by ID
exports.updateSpeechTherapyVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Speech Therapy Visit
    const updatedVisit = await SpeechTherapyVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Speech Therapy Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech Therapy Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating Speech Therapy Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Speech Therapy Visit",
      error: error.message,
    });
  }
};

// Get all Speech Therapy Visits with pagination and sorting
exports.getAllSpeechTherapyVisits = async (req, res) => {
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

    // Fetch Speech Therapy Visits with pagination and sorting
    const visits = await SpeechTherapyVisit.find(query)
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

    const totalRecords = await SpeechTherapyVisit.countDocuments(query); // Total number of records

    res.status(200).json({
      success: true,
      message: "All Speech Therapy Visits retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching Speech Therapy Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Speech Therapy Visits",
      error: error.message,
    });
  }
};


// Get Speech Therapy Visits by Nurse ID with pagination and sorting
exports.getSpeechTherapyVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Speech Therapy Visits for the specified Nurse ID with pagination and sorting
    const visits = await SpeechTherapyVisit.find({ nurseId })
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

    // Get the total count of Speech Therapy Visits for the specified Nurse ID
    const totalVisits = await SpeechTherapyVisit.countDocuments({ nurseId });

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Speech Therapy Visits found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech Therapy Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Speech Therapy Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Speech Therapy Visits by Nurse ID",
      error: error.message,
    });
  }
};


// Get a specific Speech Therapy Visit by ID
exports.getSpeechTherapyVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Speech Therapy Visit by ID
    const visit = await SpeechTherapyVisit.findById(id)
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
        message: "Speech Therapy Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech Therapy Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching Speech Therapy Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Speech Therapy Visit",
      error: error.message,
    });
  }
};



// Delete a Speech Therapy Visit by ID
exports.deleteSpeechTherapyVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Speech Therapy Visit by ID
    const deletedVisit = await SpeechTherapyVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Speech Therapy Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech Therapy Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Speech Therapy Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Speech Therapy Visit",
      error: error.message,
    });
  }
};


const STReEvaluation = require("../model/stReEvaluation");

// Create a new ST Re-Evaluation
exports.createSTReEvaluation = async (req, res) => {
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

    // Attach adminId to the ST Re-Evaluation record
    const newReEvaluation = new STReEvaluation({
      ...data,
      adminId, // Attach adminId
    });

    // Save the new ST Re-Evaluation
    await newReEvaluation.save();

    res.status(201).json({
      success: true,
      message: "ST Re-Evaluation created successfully",
      data: newReEvaluation,
    });
  } catch (error) {
    console.error("Error creating ST Re-Evaluation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ST Re-Evaluation",
      error: error.message,
    });
  }
};


// Update an existing ST Re-Evaluation by ID
exports.updateSTReEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the ST Re-Evaluation
    const updatedReEvaluation = await STReEvaluation.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedReEvaluation) {
      return res.status(404).json({
        success: false,
        message: "ST Re-Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "ST Re-Evaluation updated successfully",
      data: updatedReEvaluation,
    });
  } catch (error) {
    console.error("Error updating ST Re-Evaluation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update ST Re-Evaluation",
      error: error.message,
    });
  }
};

// Get all ST Re-Evaluations with pagination and sorting
exports.getAllSTReEvaluations = async (req, res) => {
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

    // Fetch ST Re-Evaluations with pagination and sorting
    const reEvaluations = await STReEvaluation.find(filter)
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

    // Get the total count of ST Re-Evaluations matching the filter
    const totalReEvaluations = await STReEvaluation.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "All ST Re-Evaluations retrieved successfully",
      data: reEvaluations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReEvaluations / limit),
        totalItems: totalReEvaluations,
      },
    });
  } catch (error) {
    console.error("Error fetching ST Re-Evaluations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve ST Re-Evaluations",
      error: error.message,
    });
  }
};

// Get ST Re-Evaluations by Nurse ID with pagination and sorting
exports.getSTReEvaluationsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch ST Re-Evaluations by Nurse ID with pagination and sorting
    const reEvaluations = await STReEvaluation.find({ nurseId })
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

    // Get the total count of ST Re-Evaluations for the specified Nurse ID
    const totalReEvaluations = await STReEvaluation.countDocuments({ nurseId });

    if (!reEvaluations || reEvaluations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No ST Re-Evaluations found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "ST Re-Evaluations retrieved successfully",
      data: reEvaluations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReEvaluations / limit),
        totalItems: totalReEvaluations,
      },
    });
  } catch (error) {
    console.error("Error fetching ST Re-Evaluations by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve ST Re-Evaluations by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific ST Re-Evaluation by ID
exports.getSTReEvaluationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the ST Re-Evaluation by ID
    const reEvaluation = await STReEvaluation.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })


    if (!reEvaluation) {
      return res.status(404).json({
        success: false,
        message: "ST Re-Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "ST Re-Evaluation retrieved successfully",
      data: reEvaluation,
    });
  } catch (error) {
    console.error("Error fetching ST Re-Evaluation by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve ST Re-Evaluation",
      error: error.message,
    });
  }
};



// Delete a ST Re-Evaluation by ID
exports.deleteSTReEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the ST Re-Evaluation by ID
    const deletedReEvaluation = await STReEvaluation.findByIdAndDelete(id);

    if (!deletedReEvaluation) {
      return res.status(404).json({
        success: false,
        message: "ST Re-Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "ST Re-Evaluation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ST Re-Evaluation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete ST Re-Evaluation",
      error: error.message,
    });
  }
};

