const EndocrineHematologicalAssessment = require("../model/endocrineHematological");

// Create a new EndocrineHematologicalAssessment entry
exports.createAssessment = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new assessment document
    const newAssessment = new EndocrineHematologicalAssessment(data);
    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Endocrine Hematological Assessment created successfully",
      data: newAssessment,
    });
  } catch (error) {
    console.error("Error creating assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create assessment",
      error: error.message,
    });
  }
};

// Update an existing EndocrineHematologicalAssessment entry by ID
exports.updateAssessment = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the assessment by ID and update it
    const updatedAssessment = await EndocrineHematologicalAssessment.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedAssessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assessment updated successfully",
      data: updatedAssessment,
    });
  } catch (error) {
    console.error("Error updating assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update assessment",
      error: error.message,
    });
  }
};

// Get all EndocrineHematologicalAssessment entries
exports.getAllAssessments = async (req, res) => {
  try {
    const assessments = await EndocrineHematologicalAssessment.find();

    res.status(200).json({
      success: true,
      message: "All assessments retrieved successfully",
      data: assessments,
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve assessments",
      error: error.message,
    });
  }
};

// Get a specific EndocrineHematologicalAssessment entry by ID
exports.getAssessmentById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the assessment by ID
    const assessment = await EndocrineHematologicalAssessment.findById(id);

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assessment retrieved successfully",
      data: assessment,
    });
  } catch (error) {
    console.error("Error fetching assessment by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve assessment",
      error: error.message,
    });
  }
};
