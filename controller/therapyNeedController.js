const TherapyNeed = require("../models/TherapyNeed");

// Create a new TherapyNeed entry
exports.createTherapyNeed = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new record
    const newTherapyNeed = new TherapyNeed(data);
    await newTherapyNeed.save();

    res.status(201).json({
      success: true,
      message: "Therapy Need created successfully",
      data: newTherapyNeed,
    });
  } catch (error) {
    console.error("Error creating Therapy Need:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Therapy Need",
      error: error.message,
    });
  }
};

// Update an existing TherapyNeed entry by ID
exports.updateTherapyNeed = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the document by ID and update it
    const updatedTherapyNeed = await TherapyNeed.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedTherapyNeed) {
      return res.status(404).json({
        success: false,
        message: "Therapy Need not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Therapy Need updated successfully",
      data: updatedTherapyNeed,
    });
  } catch (error) {
    console.error("Error updating Therapy Need:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Therapy Need",
      error: error.message,
    });
  }
};

// Get all TherapyNeed entries
exports.getAllTherapyNeeds = async (req, res) => {
  try {
    const therapyNeeds = await TherapyNeed.find();

    res.status(200).json({
      success: true,
      message: "All Therapy Need entries retrieved successfully",
      data: therapyNeeds,
    });
  } catch (error) {
    console.error("Error fetching Therapy Need entries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Therapy Need entries",
      error: error.message,
    });
  }
};

// Get a specific TherapyNeed entry by ID
exports.getTherapyNeedById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID
    const therapyNeed = await TherapyNeed.findById(id);

    if (!therapyNeed) {
      return res.status(404).json({
        success: false,
        message: "Therapy Need not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Therapy Need retrieved successfully",
      data: therapyNeed,
    });
  } catch (error) {
    console.error("Error fetching Therapy Need by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Therapy Need",
      error: error.message,
    });
  }
};

// Delete a TherapyNeed entry by ID
exports.deleteTherapyNeed = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID and delete it
    const deletedTherapyNeed = await TherapyNeed.findByIdAndDelete(id);

    if (!deletedTherapyNeed) {
      return res.status(404).json({
        success: false,
        message: "Therapy Need not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Therapy Need deleted successfully",
      data: deletedTherapyNeed,
    });
  } catch (error) {
    console.error("Error deleting Therapy Need:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Therapy Need",
      error: error.message,
    });
  }
};
