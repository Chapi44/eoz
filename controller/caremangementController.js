const CareManagement = require("../model/careManagement");

// Create a new CareManagement entry
exports.createCareManagement = async (req, res) => {
  try {
    const { oasisAssessmentId, ...data } = req.body;

    // Ensure the OasisAssessmentId is provided
    if (!oasisAssessmentId) {
      return res.status(400).json({
        success: false,
        message: "OASIS Assessment ID is required",
      });
    }

    // Create and save the new CareManagement document
    const newCareManagement = new CareManagement({
      oasisAssessmentId,
      ...data,
    });

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

// Get CareManagement by OASIS Assessment ID
exports.getCareManagementByOasisId = async (req, res) => {
  try {
    const { oasisAssessmentId } = req.params;

    // Find the CareManagement entry by oasisAssessmentId
    const careManagement = await CareManagement.findOne({ oasisAssessmentId });

    if (!careManagement) {
      return res.status(404).json({
        success: false,
        message: "Care Management entry not found for the provided OASIS Assessment ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Care Management entry retrieved successfully",
      data: careManagement,
    });
  } catch (error) {
    console.error("Error fetching Care Management entry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Care Management entry",
      error: error.message,
    });
  }
};


exports.getCareManagementById = async (req, res) => {
  console.log("getCareManagement")
  try {
    const { careManagementId } = req.params;

    console.log("Request careManagementId:", careManagementId);

    // Find the CareManagement entry by ID
    const careManagement = await CareManagement.findById(careManagementId);

    // if (!careManagement) {
    //   console.log("Care Management entry not found");
    //   return res.status(404).json({
    //     success: false,
    //     message: "Care Management entry not found",
    //   });
    // }

    console.log("Found Care Management entry:", careManagement);

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


// Update CareManagement by OASIS Assessment ID and CareManagement ID
exports.updateCareManagement = async (req, res) => {
  try {
    const { oasisAssessmentId, careManagementId } = req.params;
    const updates = req.body;

    // Find the CareManagement entry by oasisAssessmentId and careManagementId
    const careManagement = await CareManagement.findOneAndUpdate(
      { _id: careManagementId, oasisAssessmentId },
      updates,
      { new: true } // Return the updated document
    );

    if (!careManagement) {
      return res.status(404).json({
        success: false,
        message:
          "Care Management entry not found for the provided OASIS Assessment ID and CareManagement ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Care Management entry updated successfully",
      data: careManagement,
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