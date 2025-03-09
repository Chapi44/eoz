const AideCarePlan = require("../model/aidecare");

// Create a new AideCarePlan
exports.createAideCarePlan = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, and Visit Date are required",
      });
    }

    // Attach adminId from token to AideCarePlan
    const adminId = req.user?.adminId; // Get from JWT token payload
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Include adminId in the document
    const newAideCarePlan = new AideCarePlan({
      ...data,
      adminId: adminId, // Attach admin ID
    });

    // Save to database
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

// Get all AideCarePlans with pagination and sorting
exports.getAllAideCarePlans = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get adminId from token for filtering
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    // Build query with adminId filter
    const query = { adminId };

    // Fetch AideCarePlans with pagination and sorting
    const aideCarePlans = await AideCarePlan.find(query)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count of AideCarePlans for the admin
    const totalAideCarePlans = await AideCarePlan.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Aide Care Plans retrieved successfully",
      data: aideCarePlans,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAideCarePlans / limit),
        totalItems: totalAideCarePlans,
      },
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


// Get AideCarePlans by Nurse ID with pagination and sorting
exports.getAideCarePlansByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params; // Get Nurse ID from route parameters
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch AideCarePlans for the specified Nurse ID with pagination and sorting
    const aideCarePlans = await AideCarePlan.find({ nurseId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of AideCarePlans for the specified Nurse ID
    const totalAideCarePlans = await AideCarePlan.countDocuments({ nurseId });

    if (!aideCarePlans || aideCarePlans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Aide Care Plans found for the specified Nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Care Plans retrieved successfully",
      data: aideCarePlans,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalAideCarePlans / limit),
        totalItems: totalAideCarePlans,
      },
    });
  } catch (error) {
    console.error("Error fetching Aide Care Plans by Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Aide Care Plans by Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific AideCarePlan by ID
exports.getAideCarePlanById = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from route parameters

    // Find the AideCarePlan by ID
    const aideCarePlan = await AideCarePlan.findById(id).populate({
      path: "patientId",
      select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
    })
    .populate({
      path: "nurseId",
      select: "name email phone role",
    });;

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

// Delete an AideCarePlan by ID
exports.deleteAideCarePlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the AideCarePlan by ID and delete it
    const deletedAideCarePlan = await AideCarePlan.findByIdAndDelete(id);

    if (!deletedAideCarePlan) {
      return res.status(404).json({
        success: false,
        message: "Aide Care Plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Aide Care Plan deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Aide Care Plan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Aide Care Plan",
      error: error.message,
    });
  }
};


