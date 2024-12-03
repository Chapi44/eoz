const SupplyManagerDME = require("../model/supplymanager");

// Create a new SupplyManagerDME entry
exports.createSupplyManagerDME = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new record
    const newDME = new SupplyManagerDME(data);
    await newDME.save();

    res.status(201).json({
      success: true,
      message: "Supply Manager DME created successfully",
      data: newDME,
    });
  } catch (error) {
    console.error("Error creating Supply Manager DME:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Supply Manager DME",
      error: error.message,
    });
  }
};

// Update an existing SupplyManagerDME entry by ID
exports.updateSupplyManagerDME = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the document by ID and update it
    const updatedDME = await SupplyManagerDME.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedDME) {
      return res.status(404).json({
        success: false,
        message: "Supply Manager DME not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supply Manager DME updated successfully",
      data: updatedDME,
    });
  } catch (error) {
    console.error("Error updating Supply Manager DME:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Supply Manager DME",
      error: error.message,
    });
  }
};

// Get all SupplyManagerDME entries
exports.getAllSupplyManagerDME = async (req, res) => {
  try {
    const dmEntries = await SupplyManagerDME.find();

    res.status(200).json({
      success: true,
      message: "All Supply Manager DME entries retrieved successfully",
      data: dmEntries,
    });
  } catch (error) {
    console.error("Error fetching Supply Manager DME entries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Supply Manager DME entries",
      error: error.message,
    });
  }
};

// Get a specific SupplyManagerDME entry by ID
exports.getSupplyManagerDMEById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID
    const dmeEntry = await SupplyManagerDME.findById(id);

    if (!dmeEntry) {
      return res.status(404).json({
        success: false,
        message: "Supply Manager DME not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supply Manager DME retrieved successfully",
      data: dmeEntry,
    });
  } catch (error) {
    console.error("Error fetching Supply Manager DME by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Supply Manager DME",
      error: error.message,
    });
  }
};

// Delete a SupplyManagerDME entry by ID
exports.deleteSupplyManagerDME = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID and delete it
    const deletedDME = await SupplyManagerDME.findByIdAndDelete(id);

    if (!deletedDME) {
      return res.status(404).json({
        success: false,
        message: "Supply Manager DME not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supply Manager DME deleted successfully",
      data: deletedDME,
    });
  } catch (error) {
    console.error("Error deleting Supply Manager DME:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Supply Manager DME",
      error: error.message,
    });
  }
};
