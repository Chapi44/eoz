const Medications = require("../model/medicationsSchema");

// Create a new Medications entry
exports.createMedication = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new medication document
    const newMedication = new Medications(data);
    await newMedication.save();

    res.status(201).json({
      success: true,
      message: "Medication record created successfully",
      data: newMedication,
    });
  } catch (error) {
    console.error("Error creating medication record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create medication record",
      error: error.message,
    });
  }
};

// Update an existing Medications entry by ID
exports.updateMedication = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the document by ID and update it
    const updatedMedication = await Medications.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedMedication) {
      return res.status(404).json({
        success: false,
        message: "Medication record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medication record updated successfully",
      data: updatedMedication,
    });
  } catch (error) {
    console.error("Error updating medication record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update medication record",
      error: error.message,
    });
  }
};

// Get all Medications entries
exports.getAllMedications = async (req, res) => {
  try {
    const medications = await Medications.find();

    res.status(200).json({
      success: true,
      message: "All medication records retrieved successfully",
      data: medications,
    });
  } catch (error) {
    console.error("Error fetching medication records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve medication records",
      error: error.message,
    });
  }
};

// Get a specific Medications entry by ID
exports.getMedicationById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID
    const medication = await Medications.findById(id);

    if (!medication) {
      return res.status(404).json({
        success: false,
        message: "Medication record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medication record retrieved successfully",
      data: medication,
    });
  } catch (error) {
    console.error("Error fetching medication record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve medication record",
      error: error.message,
    });
  }
};

// Delete a Medications entry by ID
exports.deleteMedication = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the document by ID and delete it
    const deletedMedication = await Medications.findByIdAndDelete(id);

    if (!deletedMedication) {
      return res.status(404).json({
        success: false,
        message: "Medication record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medication record deleted successfully",
      data: deletedMedication,
    });
  } catch (error) {
    console.error("Error deleting medication record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete medication record",
      error: error.message,
    });
  }
};
