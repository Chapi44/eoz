const AideCarePlan = require("../model/aidecare");

// Create a new AideCarePlan
exports.createAideCarePlan = async (req, res) => {
  try {
    const data = req.body;

    // Create and save the new AideCarePlan document
    const newAideCarePlan = new AideCarePlan(data);
    await newAideCarePlan.save();

    res.status(201).json({
      success: true,
      message: "Aide Care Plan created successfully",
      data: newAideCarePlan,
    });
  } catch (error) {
    console.error("Error creating Aide Care Plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Aide Care Plan",
      error: error.message,
    });
  }
};

// Update an existing AideCarePlan by ID
exports.updateAideCarePlan = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters
    const updates = req.body; // Get update data from request body

    // Find the AideCarePlan by ID and update it
    const updatedAideCarePlan = await AideCarePlan.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedAideCarePlan) {
      return res.status(404).json({
        success: false,
        message: "Aide Care Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Care Plan updated successfully",
      data: updatedAideCarePlan,
    });
  } catch (error) {
    console.error("Error updating Aide Care Plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Aide Care Plan",
      error: error.message,
    });
  }
};

// Get all AideCarePlans
exports.getAllAideCarePlans = async (req, res) => {
  try {
    const aideCarePlans = await AideCarePlan.find();

    res.status(200).json({
      success: true,
      message: "All Aide Care Plans retrieved successfully",
      data: aideCarePlans,
    });
  } catch (error) {
    console.error("Error fetching Aide Care Plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Aide Care Plans",
      error: error.message,
    });
  }
};

// Get a specific AideCarePlan by ID
exports.getAideCarePlanById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the AideCarePlan by ID
    const aideCarePlan = await AideCarePlan.findById(id);

    if (!aideCarePlan) {
      return res.status(404).json({
        success: false,
        message: "Aide Care Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Care Plan retrieved successfully",
      data: aideCarePlan,
    });
  } catch (error) {
    console.error("Error fetching Aide Care Plan by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Aide Care Plan",
      error: error.message,
    });
  }
};
