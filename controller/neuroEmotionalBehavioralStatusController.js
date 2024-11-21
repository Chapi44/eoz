const NeuroEmotionalBehavioralStatus = require("../models/NeuroEmotionalBehavioralStatus");

// Create a new NeuroEmotionalBehavioralStatus entry
exports.createNeuroEmotionalBehavioralStatus = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new document
    const newStatus = new NeuroEmotionalBehavioralStatus(data);
    await newStatus.save();

    res.status(201).json({
      success: true,
      message: "NeuroEmotionalBehavioralStatus record created successfully",
      data: newStatus,
    });
  } catch (error) {
    console.error("Error creating NeuroEmotionalBehavioralStatus:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create NeuroEmotionalBehavioralStatus record",
      error: error.message,
    });
  }
};

// Update an existing NeuroEmotionalBehavioralStatus entry by ID
exports.updateNeuroEmotionalBehavioralStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the document by ID and update it
    const updatedStatus = await NeuroEmotionalBehavioralStatus.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({
        success: false,
        message: "NeuroEmotionalBehavioralStatus record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "NeuroEmotionalBehavioralStatus record updated successfully",
      data: updatedStatus,
    });
  } catch (error) {
    console.error("Error updating NeuroEmotionalBehavioralStatus:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update NeuroEmotionalBehavioralStatus record",
      error: error.message,
    });
  }
};

// Get all NeuroEmotionalBehavioralStatus entries
exports.getAllNeuroEmotionalBehavioralStatus = async (req, res) => {
  try {
    const statuses = await NeuroEmotionalBehavioralStatus.find();

    res.status(200).json({
      success: true,
      message: "All NeuroEmotionalBehavioralStatus records retrieved successfully",
      data: statuses,
    });
  } catch (error) {
    console.error("Error fetching NeuroEmotionalBehavioralStatus records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve NeuroEmotionalBehavioralStatus records",
      error: error.message,
    });
  }
};

// Get a specific NeuroEmotionalBehavioralStatus entry by ID
exports.getNeuroEmotionalBehavioralStatusById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID
    const status = await NeuroEmotionalBehavioralStatus.findById(id);

    if (!status) {
      return res.status(404).json({
        success: false,
        message: "NeuroEmotionalBehavioralStatus record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "NeuroEmotionalBehavioralStatus record retrieved successfully",
      data: status,
    });
  } catch (error) {
    console.error("Error fetching NeuroEmotionalBehavioralStatus record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve NeuroEmotionalBehavioralStatus record",
      error: error.message,
    });
  }
};

// Delete a NeuroEmotionalBehavioralStatus entry by ID
exports.deleteNeuroEmotionalBehavioralStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID and delete it
    const deletedStatus = await NeuroEmotionalBehavioralStatus.findByIdAndDelete(id);

    if (!deletedStatus) {
      return res.status(404).json({
        success: false,
        message: "NeuroEmotionalBehavioralStatus record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "NeuroEmotionalBehavioralStatus record deleted successfully",
      data: deletedStatus,
    });
  } catch (error) {
    console.error("Error deleting NeuroEmotionalBehavioralStatus record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete NeuroEmotionalBehavioralStatus record",
      error: error.message,
    });
  }
};
