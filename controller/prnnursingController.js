const PRNNursingVisit = require("../model/prnnursing");

// Create a new PRN Nursing Visit
exports.createPRNNursingVisit = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.primaryDiagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Primary Diagnosis are required",
      });
    }

    // Create and save the new PRN Nursing Visit
    const newVisit = new PRNNursingVisit(data);
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "PRN Nursing Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating PRN Nursing Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create PRN Nursing Visit",
      error: error.message,
    });
  }
};

// Update an existing PRN Nursing Visit by ID
exports.updatePRNNursingVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the PRN Nursing Visit
    const updatedVisit = await PRNNursingVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "PRN Nursing Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PRN Nursing Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating PRN Nursing Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update PRN Nursing Visit",
      error: error.message,
    });
  }
};

// Get all PRN Nursing Visits
exports.getAllPRNNursingVisits = async (req, res) => {
  try {
    const visits = await PRNNursingVisit.find()
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
      message: "All PRN Nursing Visits retrieved successfully",
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching PRN Nursing Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PRN Nursing Visits",
      error: error.message,
    });
  }
};

// Get a specific PRN Nursing Visit by ID
exports.getPRNNursingVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the PRN Nursing Visit by ID
    const visit = await PRNNursingVisit.findById(id)
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
        message: "PRN Nursing Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PRN Nursing Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching PRN Nursing Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PRN Nursing Visit",
      error: error.message,
    });
  }
};

// Get PRN Nursing Visits by Nurse ID
exports.getPRNNursingVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;

    // Find PRN Nursing Visits by Nurse ID
    const visits = await PRNNursingVisit.find({ nurseId })
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
        message: "No PRN Nursing Visits found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "PRN Nursing Visits retrieved successfully",
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching PRN Nursing Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PRN Nursing Visits by Nurse ID",
      error: error.message,
    });
  }
};

// Delete a PRN Nursing Visit by ID
exports.deletePRNNursingVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the PRN Nursing Visit by ID
    const deletedVisit = await PRNNursingVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "PRN Nursing Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PRN Nursing Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting PRN Nursing Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete PRN Nursing Visit",
      error: error.message,
    });
  }
};


const PTVisit = require("../model/ptVisit");

// Create a new PT Visit
exports.createPTVisit = async (req, res) => {
  try {
    const data = req.body;

    // // Validate required fields
    // if (!data.patientId || !data.nurseId || !data.visitDate || !data.episodePeriod || !data.physician) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Patient ID, Nurse ID, Visit Date, Episode Period, and Physician are required",
    //   });
    // }

    // Create and save the new PT Visit
    const newVisit = new PTVisit(data);
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "PT Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating PT Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create PT Visit",
      error: error.message,
    });
  }
};

// Update an existing PT Visit by ID
exports.updatePTVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the PT Visit
    const updatedVisit = await PTVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "PT Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating PT Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update PT Visit",
      error: error.message,
    });
  }
};

// Get all PT Visits with pagination and sorting
exports.getAllPTVisits = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch PT Visits with pagination and sorting
    const visits = await PTVisit.find()
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

    // Get the total count of PT Visits
    const totalVisits = await PTVisit.countDocuments();

    res.status(200).json({
      success: true,
      message: "All PT Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching PT Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Visits",
      error: error.message,
    });
  }
};

// Get PT Visits by Nurse ID with pagination and sorting
exports.getPTVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch PT Visits by Nurse ID with pagination and sorting
    const visits = await PTVisit.find({ nurseId })
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

    // Get the total count of PT Visits for the specified Nurse ID
    const totalVisits = await PTVisit.countDocuments({ nurseId });

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No PT Visits found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching PT Visits by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Visits by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific PT Visit by ID
exports.getPTVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the PT Visit by ID
    const visit = await PTVisit.findById(id)
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
        message: "PT Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching PT Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Visit",
      error: error.message,
    });
  }
};



// Delete a PT Visit by ID
exports.deletePTVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the PT Visit by ID
    const deletedVisit = await PTVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "PT Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting PT Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete PT Visit",
      error: error.message,
    });
  }
};


const PTReassessment = require("../model/ptReassessment");

// Create a new PT Reassessment
exports.createPTReassessment = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    // if (!data.patientId || !data.nurseId || !data.visitDate || !data.episodePeriod || !data.physician) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Patient ID, Nurse ID, Visit Date, Episode Period, and Physician are required",
    //   });
    // }

    // Create and save the new PT Reassessment
    const newReassessment = new PTReassessment(data);
    await newReassessment.save();

    res.status(201).json({
      success: true,
      message: "PT Reassessment created successfully",
      data: newReassessment,
    });
  } catch (error) {
    console.error("Error creating PT Reassessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create PT Reassessment",
      error: error.message,
    });
  }
};

// Update an existing PT Reassessment by ID
exports.updatePTReassessment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the PT Reassessment
    const updatedReassessment = await PTReassessment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedReassessment) {
      return res.status(404).json({
        success: false,
        message: "PT Reassessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Reassessment updated successfully",
      data: updatedReassessment,
    });
  } catch (error) {
    console.error("Error updating PT Reassessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update PT Reassessment",
      error: error.message,
    });
  }
};

// Get all PT Reassessments with pagination and sorting
exports.getAllPTReassessments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch PT Reassessments with pagination and sorting
    const reassessments = await PTReassessment.find()
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

    // Get the total count of PT Reassessments
    const totalReassessments = await PTReassessment.countDocuments();

    res.status(200).json({
      success: true,
      message: "All PT Reassessments retrieved successfully",
      data: reassessments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReassessments / limit),
        totalItems: totalReassessments,
      },
    });
  } catch (error) {
    console.error("Error fetching PT Reassessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Reassessments",
      error: error.message,
    });
  }
};

// Get PT Reassessments by Nurse ID with pagination and sorting
exports.getPTReassessmentsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch PT Reassessments by Nurse ID with pagination and sorting
    const reassessments = await PTReassessment.find({ nurseId })
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

    // Get the total count of PT Reassessments for the specified Nurse ID
    const totalReassessments = await PTReassessment.countDocuments({ nurseId });

    if (!reassessments || reassessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No PT Reassessments found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Reassessments retrieved successfully",
      data: reassessments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalReassessments / limit),
        totalItems: totalReassessments,
      },
    });
  } catch (error) {
    console.error("Error fetching PT Reassessments by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Reassessments by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific PT Reassessment by ID
exports.getPTReassessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the PT Reassessment by ID
    const reassessment = await PTReassessment.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })


    if (!reassessment) {
      return res.status(404).json({
        success: false,
        message: "PT Reassessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Reassessment retrieved successfully",
      data: reassessment,
    });
  } catch (error) {
    console.error("Error fetching PT Reassessment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Reassessment",
      error: error.message,
    });
  }
};



// Delete a PT Reassessment by ID
exports.deletePTReassessment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the PT Reassessment by ID
    const deletedReassessment = await PTReassessment.findByIdAndDelete(id);

    if (!deletedReassessment) {
      return res.status(404).json({
        success: false,
        message: "PT Reassessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Reassessment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting PT Reassessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete PT Reassessment",
      error: error.message,
    });
  }
};
