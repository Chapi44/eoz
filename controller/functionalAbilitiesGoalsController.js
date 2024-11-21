const FunctionalAbilitiesGoals = require("../model/functionalAbilitiesGoals");

// Create a new FunctionalAbilitiesGoals entry
exports.createFunctionalAbilitiesGoals = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new functional abilities and goals document
    const newFunctionalAbilitiesGoals = new FunctionalAbilitiesGoals(data);
    await newFunctionalAbilitiesGoals.save();

    res.status(201).json({
      success: true,
      message: "Functional Abilities and Goals created successfully",
      data: newFunctionalAbilitiesGoals,
    });
  } catch (error) {
    console.error("Error creating Functional Abilities and Goals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Functional Abilities and Goals",
      error: error.message,
    });
  }
};

// Update an existing FunctionalAbilitiesGoals entry by ID
exports.updateFunctionalAbilitiesGoals = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the document by ID and update it
    const updatedFunctionalAbilitiesGoals = await FunctionalAbilitiesGoals.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedFunctionalAbilitiesGoals) {
      return res.status(404).json({
        success: false,
        message: "Functional Abilities and Goals not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Functional Abilities and Goals updated successfully",
      data: updatedFunctionalAbilitiesGoals,
    });
  } catch (error) {
    console.error("Error updating Functional Abilities and Goals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Functional Abilities and Goals",
      error: error.message,
    });
  }
};

// Get all FunctionalAbilitiesGoals entries
exports.getAllFunctionalAbilitiesGoals = async (req, res) => {
  try {
    const functionalAbilitiesGoals = await FunctionalAbilitiesGoals.find();

    res.status(200).json({
      success: true,
      message: "All Functional Abilities and Goals retrieved successfully",
      data: functionalAbilitiesGoals,
    });
  } catch (error) {
    console.error("Error fetching Functional Abilities and Goals:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Functional Abilities and Goals",
      error: error.message,
    });
  }
};

// Get a specific FunctionalAbilitiesGoals entry by ID
exports.getFunctionalAbilitiesGoalsById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID
    const functionalAbilitiesGoals = await FunctionalAbilitiesGoals.findById(id);

    if (!functionalAbilitiesGoals) {
      return res.status(404).json({
        success: false,
        message: "Functional Abilities and Goals not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Functional Abilities and Goals retrieved successfully",
      data: functionalAbilitiesGoals,
    });
  } catch (error) {
    console.error("Error fetching Functional Abilities and Goals by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Functional Abilities and Goals",
      error: error.message,
    });
  }
};
