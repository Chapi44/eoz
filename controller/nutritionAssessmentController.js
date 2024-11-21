const NutritionAssessment = require("../model/nutritionAssessmen");

// Create a new NutritionAssessment entry
exports.createNutritionAssessment = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new record
    const newAssessment = new NutritionAssessment(data);
    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Nutrition Assessment created successfully",
      data: newAssessment,
    });
  } catch (error) {
    console.error("Error creating Nutrition Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Nutrition Assessment",
      error: error.message,
    });
  }
};

// Update an existing NutritionAssessment entry by ID
exports.updateNutritionAssessment = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the document by ID and update it
    const updatedAssessment = await NutritionAssessment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({
        success: false,
        message: "Nutrition Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition Assessment updated successfully",
      data: updatedAssessment,
    });
  } catch (error) {
    console.error("Error updating Nutrition Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Nutrition Assessment",
      error: error.message,
    });
  }
};

// Get all NutritionAssessment entries
exports.getAllNutritionAssessments = async (req, res) => {
  try {
    const assessments = await NutritionAssessment.find();

    res.status(200).json({
      success: true,
      message: "All Nutrition Assessments retrieved successfully",
      data: assessments,
    });
  } catch (error) {
    console.error("Error fetching Nutrition Assessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nutrition Assessments",
      error: error.message,
    });
  }
};

// Get a specific NutritionAssessment entry by ID
exports.getNutritionAssessmentById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID
    const assessment = await NutritionAssessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Nutrition Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition Assessment retrieved successfully",
      data: assessment,
    });
  } catch (error) {
    console.error("Error fetching Nutrition Assessment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nutrition Assessment",
      error: error.message,
    });
  }
};

// Delete a NutritionAssessment entry by ID
exports.deleteNutritionAssessment = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID and delete it
    const deletedAssessment = await NutritionAssessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({
        success: false,
        message: "Nutrition Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nutrition Assessment deleted successfully",
      data: deletedAssessment,
    });
  } catch (error) {
    console.error("Error deleting Nutrition Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Nutrition Assessment",
      error: error.message,
    });
  }
};
