const PsychNurseAssessment = require("../model/psychNurseAssessment");

// Create a new Psych Nurse Assessment
exports.createPsychNurseAssessment = async (req, res) => {
  try {
    const data = req.body;

    // // Validate required fields
    // if (!data.patientId || !data.nurseId || !data.visitDate || !data.episodeRange || !data.primaryDiagnosis) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Patient ID, Nurse ID, Visit Date, Episode Range, and Primary Diagnosis are required",
    //   });
    // }

    // Create and save the new Psych Nurse Assessment
    const newAssessment = new PsychNurseAssessment(data);
    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Psych Nurse Assessment created successfully",
      data: newAssessment,
    });
  } catch (error) {
    console.error("Error creating Psych Nurse Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Psych Nurse Assessment",
      error: error.message,
    });
  }
};

// Update an existing Psych Nurse Assessment by ID
exports.updatePsychNurseAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Psych Nurse Assessment
    const updatedAssessment = await PsychNurseAssessment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({
        success: false,
        message: "Psych Nurse Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Psych Nurse Assessment updated successfully",
      data: updatedAssessment,
    });
  } catch (error) {
    console.error("Error updating Psych Nurse Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Psych Nurse Assessment",
      error: error.message,
    });
  }
};

// Get all Psych Nurse Assessments with pagination and sorting
exports.getAllPsychNurseAssessments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Psych Nurse Assessments with pagination and sorting
    const assessments = await PsychNurseAssessment.find()
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

    // Get the total count of Psych Nurse Assessments
    const totalAssessments = await PsychNurseAssessment.countDocuments();

    res.status(200).json({
      success: true,
      message: "All Psych Nurse Assessments retrieved successfully",
      data: assessments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAssessments / limit),
        totalItems: totalAssessments,
      },
    });
  } catch (error) {
    console.error("Error fetching Psych Nurse Assessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Psych Nurse Assessments",
      error: error.message,
    });
  }
};

// Get Psych Nurse Assessments by Nurse ID with pagination and sorting
exports.getPsychNurseAssessmentsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Psych Nurse Assessments by Nurse ID with pagination and sorting
    const assessments = await PsychNurseAssessment.find({ nurseId })
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

    // Get the total count of Psych Nurse Assessments for the specified Nurse ID
    const totalAssessments = await PsychNurseAssessment.countDocuments({ nurseId });

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Psych Nurse Assessments found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Psych Nurse Assessments retrieved successfully",
      data: assessments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAssessments / limit),
        totalItems: totalAssessments,
      },
    });
  } catch (error) {
    console.error("Error fetching Psych Nurse Assessments by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Psych Nurse Assessments by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific Psych Nurse Assessment by ID
exports.getPsychNurseAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Psych Nurse Assessment by ID
    const assessment = await PsychNurseAssessment.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })


    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Psych Nurse Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Psych Nurse Assessment retrieved successfully",
      data: assessment,
    });
  } catch (error) {
    console.error("Error fetching Psych Nurse Assessment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Psych Nurse Assessment",
      error: error.message,
    });
  }
};



// Delete a Psych Nurse Assessment by ID
exports.deletePsychNurseAssessment = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Psych Nurse Assessment by ID
    const deletedAssessment = await PsychNurseAssessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({
        success: false,
        message: "Psych Nurse Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Psych Nurse Assessment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Psych Nurse Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Psych Nurse Assessment",
      error: error.message,
    });
  }
};

const PTEvaluation = require("../model/ptEvaluation");

// Create a new PT Evaluation
exports.createPTEvaluation = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    // if (!data.patientId || !data.nurseId || !data.visitDate || !data.episodePeriod || !data.physician) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Patient ID, Nurse ID, Visit Date, Episode Period, and Physician are required",
    //   });
    // }

    // Create and save the new PT Evaluation
    const newEvaluation = new PTEvaluation(data);
    await newEvaluation.save();

    res.status(201).json({
      success: true,
      message: "PT Evaluation created successfully",
      data: newEvaluation,
    });
  } catch (error) {
    console.error("Error creating PT Evaluation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create PT Evaluation",
      error: error.message,
    });
  }
};

// Update an existing PT Evaluation by ID
exports.updatePTEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the PT Evaluation
    const updatedEvaluation = await PTEvaluation.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedEvaluation) {
      return res.status(404).json({
        success: false,
        message: "PT Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Evaluation updated successfully",
      data: updatedEvaluation,
    });
  } catch (error) {
    console.error("Error updating PT Evaluation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update PT Evaluation",
      error: error.message,
    });
  }
};

// Get all PT Evaluations with pagination and sorting
exports.getAllPTEvaluations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch PT Evaluations with pagination and sorting
    const evaluations = await PTEvaluation.find()
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

    // Get the total count of PT Evaluations
    const totalEvaluations = await PTEvaluation.countDocuments();

    res.status(200).json({
      success: true,
      message: "All PT Evaluations retrieved successfully",
      data: evaluations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalEvaluations / limit),
        totalItems: totalEvaluations,
      },
    });
  } catch (error) {
    console.error("Error fetching PT Evaluations:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Evaluations",
      error: error.message,
    });
  }
};

// Get PT Evaluations by Nurse ID with pagination and sorting
exports.getPTEvaluationsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch PT Evaluations by Nurse ID with pagination and sorting
    const evaluations = await PTEvaluation.find({ nurseId })
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

    // Get the total count of PT Evaluations for the specified Nurse ID
    const totalEvaluations = await PTEvaluation.countDocuments({ nurseId });

    if (!evaluations || evaluations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No PT Evaluations found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Evaluations retrieved successfully",
      data: evaluations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalEvaluations / limit),
        totalItems: totalEvaluations,
      },
    });
  } catch (error) {
    console.error("Error fetching PT Evaluations by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Evaluations by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific PT Evaluation by ID
exports.getPTEvaluationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the PT Evaluation by ID
    const evaluation = await PTEvaluation.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })


    if (!evaluation) {
      return res.status(404).json({
        success: false,
        message: "PT Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Evaluation retrieved successfully",
      data: evaluation,
    });
  } catch (error) {
    console.error("Error fetching PT Evaluation by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT Evaluation",
      error: error.message,
    });
  }
};



// Delete a PT Evaluation by ID
exports.deletePTEvaluation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the PT Evaluation by ID
    const deletedEvaluation = await PTEvaluation.findByIdAndDelete(id);

    if (!deletedEvaluation) {
      return res.status(404).json({
        success: false,
        message: "PT Evaluation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT Evaluation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting PT Evaluation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete PT Evaluation",
      error: error.message,
    });
  }
};



const PTWithINR = require("../model/ptWithINR");

// Create a new PT with INR
exports.createPTWithINR = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.primaryDiagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Primary Diagnosis are required",
      });
    }

    // Create and save the new PT with INR
    const newPTWithINR = new PTWithINR(data);
    await newPTWithINR.save();

    res.status(201).json({
      success: true,
      message: "PT with INR created successfully",
      data: newPTWithINR,
    });
  } catch (error) {
    console.error("Error creating PT with INR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create PT with INR",
      error: error.message,
    });
  }
};

// Update an existing PT with INR by ID
exports.updatePTWithINR = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the PT with INR
    const updatedPTWithINR = await PTWithINR.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedPTWithINR) {
      return res.status(404).json({
        success: false,
        message: "PT with INR not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT with INR updated successfully",
      data: updatedPTWithINR,
    });
  } catch (error) {
    console.error("Error updating PT with INR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update PT with INR",
      error: error.message,
    });
  }
};

// Get all PT with INR records
exports.getAllPTWithINR = async (req, res) => {
  try {
    const records = await PTWithINR.find()
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
      message: "All PT with INR records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching PT with INR records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT with INR records",
      error: error.message,
    });
  }
};

// Get a specific PT with INR record by ID
exports.getPTWithINRById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the PT with INR record by ID
    const record = await PTWithINR.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "PT with INR record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT with INR record retrieved successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error fetching PT with INR record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT with INR record",
      error: error.message,
    });
  }
};

// Get PT with INR records by Nurse ID
exports.getPTWithINRByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;

    // Find PT with INR records by Nurse ID
    const records = await PTWithINR.find({ nurseId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No PT with INR records found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT with INR records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching PT with INR records by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve PT with INR records by Nurse ID",
      error: error.message,
    });
  }
};

// Delete a PT with INR record by ID
exports.deletePTWithINR = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the PT with INR record by ID
    const deletedRecord = await PTWithINR.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "PT with INR record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "PT with INR record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting PT with INR record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete PT with INR record",
      error: error.message,
    });
  }
};
