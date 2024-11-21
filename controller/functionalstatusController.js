const FunctionalStatus = require("../model/functionalStatusSchema");

// Create a new FunctionalStatus
exports.createFunctionalStatus = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new FunctionalStatus document
    const newFunctionalStatus = new FunctionalStatus(data);
    await newFunctionalStatus.save();

    res.status(201).json({
      success: true,
      message: "Functional Status created successfully",
      data: newFunctionalStatus,
    });
  } catch (error) {
    console.error("Error creating Functional Status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Functional Status",
      error: error.message,
    });
  }
};

// Update an existing FunctionalStatus by ID
exports.updateFunctionalStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the FunctionalStatus by ID and update it
    const updatedFunctionalStatus = await FunctionalStatus.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedFunctionalStatus) {
      return res.status(404).json({
        success: false,
        message: "Functional Status not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Functional Status updated successfully",
      data: updatedFunctionalStatus,
    });
  } catch (error) {
    console.error("Error updating Functional Status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Functional Status",
      error: error.message,
    });
  }
};

// Get all FunctionalStatus records
exports.getAllFunctionalStatus = async (req, res) => {
  try {
    const functionalStatuses = await FunctionalStatus.find();

    res.status(200).json({
      success: true,
      message: "All Functional Status records retrieved successfully",
      data: functionalStatuses,
    });
  } catch (error) {
    console.error("Error fetching Functional Status records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Functional Status records",
      error: error.message,
    });
  }
};

// Get a FunctionalStatus record by ID
exports.getFunctionalStatusById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the FunctionalStatus by ID
    const functionalStatus = await FunctionalStatus.findById(id);

    if (!functionalStatus) {
      return res.status(404).json({
        success: false,
        message: "Functional Status not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Functional Status record retrieved successfully",
      data: functionalStatus,
    });
  } catch (error) {
    console.error("Error fetching Functional Status by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Functional Status record",
      error: error.message,
    });
  }
};
