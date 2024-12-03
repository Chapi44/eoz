const OASISAssessment = require("../model/oasisAssessment");

// Create a new OASISAssessment
exports.createOASISAssessment = async (req, res) => {
  try {
    const data = req.body;

    const newOASISAssessment = new OASISAssessment(data);
    await newOASISAssessment.save();

    res.status(201).json({
      success: true,
      message: "OASIS Assessment created successfully",
      data: newOASISAssessment,
    });
  } catch (error) {
    console.error("Error creating OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create OASIS Assessment",
      error: error.message,
    });
  }
};

// Get all OASISAssessments
// Get all OASIS Assessments (sorted by createdAt and updatedAt descending)
exports.getAllOASISAssessments = async (req, res) => {
  try {
    const oasisAssessments = await OASISAssessment.find()
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt in descending order

    res.status(200).json({
      success: true,
      message: "OASIS Assessments retrieved successfully",
      data: oasisAssessments,
    });
  } catch (error) {
    console.error("Error retrieving OASIS Assessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OASIS Assessments",
      error: error.message,
    });
  }
};

// Get a single OASISAssessment by ID
exports.getOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const oasisAssessment = await OASISAssessment.findById(id).populate("nurseId");

    if (!oasisAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OASIS Assessment retrieved successfully",
      data: oasisAssessment,
    });
  } catch (error) {
    console.error("Error retrieving OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OASIS Assessment",
      error: error.message,
    });
  }
};

// Get OASIS Assessment by nurseId and patientId
exports.getOASISAssessmentByNurseAndPatient = async (req, res) => {
  try {
    const { nurseId, patientId } = req.params;

    const oasisAssessment = await OASISAssessment.findOne({
      nurseId,
      patientId,
    })
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt

    if (!oasisAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found for the given nurseId and patientId",
      });
    }

    res.status(200).json({
      success: true,
      data: oasisAssessment,
    });
  } catch (error) {
    console.error("Error fetching OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OASIS Assessment",
      error: error.message,
    });
  }
};

// Get OASIS Assessments by nurseId (sorted by createdAt and updatedAt descending)
exports.getOASISAssessmentsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;

    const assessments = await OASISAssessment.find({ nurseId })
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt in descending order

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OASIS Assessments found for the given nurseId",
      });
    }

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch (error) {
    console.error("Error fetching OASIS Assessments by nurseId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OASIS Assessments",
      error: error.message,
    });
  }
};

// Get OASIS Assessments by patientId (sorted by createdAt and updatedAt descending)
exports.getOASISAssessmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const assessments = await OASISAssessment.find({ patientId })
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt in descending order

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OASIS Assessments found for the given patientId",
      });
    }

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch (error) {
    console.error("Error fetching OASIS Assessments by patientId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OASIS Assessments",
      error: error.message,
    });
  }
};

// Update a OASISAssessment by ID
exports.updateOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedOASISAssessment = await OASISAssessment.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedOASISAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OASIS Assessment updated successfully",
      data: updatedOASISAssessment,
    });
  } catch (error) {
    console.error("Error updating OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update OASIS Assessment",
      error: error.message,
    });
  }
};

// Delete a OASISAssessment by ID
exports.deleteOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOASISAssessment = await OASISAssessment.findByIdAndDelete(id);

    if (!deletedOASISAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OASIS Assessment deleted successfully",
      data: deletedOASISAssessment,
    });
  } catch (error) {
    console.error("Error deleting OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete OASIS Assessment",
      error: error.message,
    });
  }
};



