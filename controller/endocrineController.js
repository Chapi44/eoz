const EndocrineHematologicalAssessment = require("../model/endocrineHematological");
exports.createEndocrineAssessment = async (req, res) => {
  try {
    const { oasisAssessmentId, ...data } = req.body;

    // Ensure the OasisAssessmentId is provided
    if (!oasisAssessmentId) {
      return res.status(400).json({
        success: false,
        message: "OASIS Assessment ID is required",
      });
    }

    // Create and save the new EndocrineHematologicalAssessment document
    const newAssessment = new EndocrineHematologicalAssessment({
      oasisAssessmentId,
      ...data,
    });

    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Endocrine/Hematological Assessment entry created successfully",
      data: newAssessment,
    });
  } catch (error) {
    console.error("Error creating Endocrine/Hematological Assessment entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Endocrine/Hematological Assessment entry",
      error: error.message,
    });
  }
};

// Get EndocrineHematologicalAssessment by OASIS Assessment ID
exports.getEndocrineAssessmentByOasisId = async (req, res) => {
  console.log('helo ')
  try {
    const { oasisAssessmentId } = req.params;

    // Find the EndocrineHematologicalAssessment entry by oasisAssessmentId
    const assessment = await EndocrineHematologicalAssessment.findOne({
      oasisAssessmentId,
    });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message:
          "Endocrine/Hematological Assessment entry not found for the provided OASIS Assessment ID",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Endocrine/Hematological Assessment entry retrieved successfully",
      data: assessment,
    });
  } catch (error) {
    console.error(
      "Error fetching Endocrine/Hematological Assessment entry:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Endocrine/Hematological Assessment entry",
      error: error.message,
    });
  }
};

// Get EndocrineHematologicalAssessment by its own ID
exports.getEndocrineAssessmentById = async (req, res) => {
  try {
    const { endocrineId } = req.params;

    // Find the EndocrineHematologicalAssessment entry by ID
    const assessment = await EndocrineHematologicalAssessment.findById(
      endocrineId
    );

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Endocrine/Hematological Assessment entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Endocrine/Hematological Assessment entry retrieved successfully",
      data: assessment,
    });
  } catch (error) {
    console.error(
      "Error fetching Endocrine/Hematological Assessment entry by ID:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Endocrine/Hematological Assessment entry",
      error: error.message,
    });
  }
};

// Update an existing EndocrineHematologicalAssessment entry
exports.updateEndocrineAssessment = async (req, res) => {
  try {
    const { endocrineId, oasisAssessmentId } = req.params;
    const data = req.body;

    // Validate input
    if (!oasisAssessmentId) {
      return res.status(400).json({
        success: false,
        message: "OASIS Assessment ID is required",
      });
    }

    if (!endocrineId) {
      return res.status(400).json({
        success: false,
        message: "Endocrine Assessment ID is required",
      });
    }

    // Find and update the document
    const updatedAssessment = await EndocrineHematologicalAssessment.findOneAndUpdate(
      { _id: endocrineId, oasisAssessmentId: oasisAssessmentId }, // Match by both IDs
      data,
      { new: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({
        success: false,
        message:
          "Endocrine/Hematological Assessment entry not found for the provided IDs",
      });
    }

    res.status(200).json({
      success: true,
      message: "Endocrine/Hematological Assessment entry updated successfully",
      data: updatedAssessment,
    });
  } catch (error) {
    console.error(
      "Error updating Endocrine/Hematological Assessment entry:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to update Endocrine/Hematological Assessment entry",
      error: error.message,
    });
  }
};
