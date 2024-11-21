const CareManagement = require("../model/careManagement");

// Create a new CareManagement entry
exports.createCareManagement = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new CareManagement document
    const newCareManagement = new CareManagement(data);
    await newCareManagement.save();

    res.status(201).json({
      success: true,
      message: "Care Management entry created successfully",
      data: newCareManagement,
    });
  } catch (error) {
    console.error("Error creating Care Management entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Care Management entry",
      error: error.message,
    });
  }
};

// Update an existing CareManagement entry by ID
exports.updateCareManagement = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the CareManagement entry by ID and update it
    const updatedCareManagement = await CareManagement.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCareManagement) {
      return res.status(404).json({
        success: false,
        message: "Care Management entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Care Management entry updated successfully",
      data: updatedCareManagement,
    });
  } catch (error) {
    console.error("Error updating Care Management entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Care Management entry",
      error: error.message,
    });
  }
};

// Get all CareManagement entries
exports.getAllCareManagement = async (req, res) => {
  try {
    const careManagementEntries = await CareManagement.find();

    res.status(200).json({
      success: true,
      message: "All Care Management entries retrieved successfully",
      data: careManagementEntries,
    });
  } catch (error) {
    console.error("Error fetching Care Management entries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Care Management entries",
      error: error.message,
    });
  }
};

// Get a specific CareManagement entry by ID
exports.getCareManagementById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the CareManagement entry by ID
    const careManagement = await CareManagement.findById(id);

    if (!careManagement) {
      return res.status(404).json({
        success: false,
        message: "Care Management entry not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Care Management entry retrieved successfully",
      data: careManagement,
    });
  } catch (error) {
    console.error("Error fetching Care Management entry by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Care Management entry",
      error: error.message,
    });
  }
};
