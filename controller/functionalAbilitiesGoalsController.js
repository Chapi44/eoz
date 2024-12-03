const FunctionalAbilitiesGoals = require('../model/functionalAbilitiesGoals')


exports.createFunctionalAbilitiesGoals = async (req, res) => {
  try {
    const { oasisAssessmentId, ...data } = req.body;

    if (!oasisAssessmentId) {
      return res.status(400).json({
        success: false,
        message: "OASIS Assessment ID is required",
      });
    }

    const newEntry = new FunctionalAbilitiesGoals({
      oasisAssessmentId,
      ...data,
    });

    await newEntry.save();

    res.status(201).json({
      success: true,
      message: "Functional Abilities Goals entry created successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("Error creating Functional Abilities Goals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Functional Abilities Goals entry",
      error: error.message,
    });
  }
};

// Get FunctionalAbilitiesGoals by OASIS ID
exports.getFunctionalAbilitiesGoalsByOasisId = async (req, res) => {
  try {
    const { oasisAssessmentId } = req.params;

    const entry = await FunctionalAbilitiesGoals.findOne({
      oasisAssessmentId,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: "Functional Abilities Goals entry not found for the given OASIS Assessment ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Functional Abilities Goals entry retrieved successfully",
      data: entry,
    });
  } catch (error) {
    console.error("Error retrieving Functional Abilities Goals entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Functional Abilities Goals entry",
      error: error.message,
    });
  }
};

// Update FunctionalAbilitiesGoals by ID
// Update FunctionalAbilitiesGoals by functionalId and oasisAssessmentId
exports.updateFunctionalAbilitiesGoals = async (req, res) => {
  try {
    const { functionalId, oasisAssessmentId } = req.params; // IDs from the request parameters
    const data = req.body; // Updated data from the request body

    // Ensure both IDs are provided
    if (!functionalId || !oasisAssessmentId) {
      return res.status(400).json({
        success: false,
        message: "Both functionalId and OASIS Assessment ID are required",
      });
    }

    // Check if the entry exists and belongs to the provided oasisAssessmentId
    const entry = await FunctionalAbilitiesGoals.findOne({
      _id: functionalId,
      oasisAssessmentId,
    });

    if (!entry) {
      return res.status(404).json({
        success: false,
        message:
          "Functional Abilities Goals entry not found for the provided functionalId and OASIS Assessment ID",
      });
    }

    // Update the entry
    const updatedEntry = await FunctionalAbilitiesGoals.findByIdAndUpdate(
      functionalId,
      data,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Functional Abilities Goals entry updated successfully",
      data: updatedEntry,
    });
  } catch (error) {
    console.error("Error updating Functional Abilities Goals entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Functional Abilities Goals entry",
      error: error.message,
    });
  }
};

