const MiddayInsulinAdministration = require("../model/middayInsulinadministration");

// Create a new Midday Insulin Administration record
exports.createMiddayInsulinAdministration = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.primaryDiagnosis) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Primary Diagnosis are required",
      });
    }

    // Create and save the new Midday Insulin Administration record
    const newRecord = new MiddayInsulinAdministration(data);
    await newRecord.save();

    res.status(201).json({
      success: true,
      message: "Midday Insulin Administration record created successfully",
      data: newRecord,
    });
  } catch (error) {
    console.error("Error creating Midday Insulin Administration record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Midday Insulin Administration record",
      error: error.message,
    });
  }
};

// Update an existing Midday Insulin Administration record by ID
exports.updateMiddayInsulinAdministration = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Midday Insulin Administration record
    const updatedRecord = await MiddayInsulinAdministration.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: "Midday Insulin Administration record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Midday Insulin Administration record updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating Midday Insulin Administration record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Midday Insulin Administration record",
      error: error.message,
    });
  }
};

// Get all Midday Insulin Administration records
exports.getAllMiddayInsulinAdministrations = async (req, res) => {
  try {
    const records = await MiddayInsulinAdministration.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    res.status(200).json({
      success: true,
      message: "All Midday Insulin Administration records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching Midday Insulin Administration records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Midday Insulin Administration records",
      error: error.message,
    });
  }
};

// Get a specific Midday Insulin Administration record by ID
exports.getMiddayInsulinAdministrationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Midday Insulin Administration record by ID
    const record = await MiddayInsulinAdministration.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Midday Insulin Administration record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Midday Insulin Administration record retrieved successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error fetching Midday Insulin Administration record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Midday Insulin Administration record",
      error: error.message,
    });
  }
};

// Get Midday Insulin Administration records by Nurse ID
exports.getMiddayInsulinAdministrationsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;

    // Find Midday Insulin Administration records by Nurse ID
    const records = await MiddayInsulinAdministration.find({ nurseId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Midday Insulin Administration records found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Midday Insulin Administration records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching Midday Insulin Administration records by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Midday Insulin Administration records by Nurse ID",
      error: error.message,
    });
  }
};

// Delete a Midday Insulin Administration record by ID
exports.deleteMiddayInsulinAdministration = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Midday Insulin Administration record by ID
    const deletedRecord = await MiddayInsulinAdministration.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Midday Insulin Administration record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Midday Insulin Administration record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Midday Insulin Administration record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Midday Insulin Administration record",
      error: error.message,
    });
  }
};
