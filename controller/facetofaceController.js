const { v4: uuidv4 } = require("uuid");
const FaceToFace = require("../model/facetoface");

// Create a new FaceToFace
exports.createFaceToFace = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.encounterDate || !data.primaryReason) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, Encounter Date, and Primary Reason are required",
      });
    }

    // Generate a unique order number
    data.orderNumber = uuidv4();

    // Create and save the new FaceToFace document
    const newFaceToFace = new FaceToFace(data);
    await newFaceToFace.save();

    res.status(201).json({
      success: true,
      message: "Face-to-Face record created successfully",
      data: newFaceToFace,
    });
  } catch (error) {
    console.error("Error creating Face-to-Face record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Face-to-Face record",
      error: error.message,
    });
  }
};

// Update an existing FaceToFace by ID
exports.updateFaceToFace = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the FaceToFace document
    const updatedFaceToFace = await FaceToFace.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedFaceToFace) {
      return res.status(404).json({
        success: false,
        message: "Face-to-Face record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Face-to-Face record updated successfully",
      data: updatedFaceToFace,
    });
  } catch (error) {
    console.error("Error updating Face-to-Face record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Face-to-Face record",
      error: error.message,
    });
  }
};

// Get all FaceToFace records with pagination and sorting
exports.getAllFaceToFace = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const faceToFaceRecords = await FaceToFace.find()
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)) // Limit the number of documents returned
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    const totalRecords = await FaceToFace.countDocuments(); // Total number of records

    res.status(200).json({
      success: true,
      message: "All Face-to-Face records retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: faceToFaceRecords,
    });
  } catch (error) {
    console.error("Error fetching Face-to-Face records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Face-to-Face records",
      error: error.message,
    });
  }
};

// Get FaceToFace records by Physician ID with pagination and sorting
exports.getFaceToFaceByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const faceToFaceRecords = await FaceToFace.find({ physicianId })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)) // Limit the number of documents returned
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!faceToFaceRecords || faceToFaceRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Face-to-Face records found for the specified Physician ID",
      });
    }

    const totalRecords = await FaceToFace.countDocuments({ physicianId }); // Total records for the physician

    res.status(200).json({
      success: true,
      message: "Face-to-Face records retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: faceToFaceRecords,
    });
  } catch (error) {
    console.error("Error fetching Face-to-Face records by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Face-to-Face records by Physician ID",
      error: error.message,
    });
  }
};


// Get a specific FaceToFace by ID
exports.getFaceToFaceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the FaceToFace document by ID
    const faceToFace = await FaceToFace.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!faceToFace) {
      return res.status(404).json({
        success: false,
        message: "Face-to-Face record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Face-to-Face record retrieved successfully",
      data: faceToFace,
    });
  } catch (error) {
    console.error("Error fetching Face-to-Face record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Face-to-Face record",
      error: error.message,
    });
  }
};


// Delete a FaceToFace record by ID
exports.deleteFaceToFace = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the FaceToFace record by ID
    const deletedFaceToFace = await FaceToFace.findByIdAndDelete(id);

    if (!deletedFaceToFace) {
      return res.status(404).json({
        success: false,
        message: "Face-to-Face record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Face-to-Face record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Face-to-Face record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Face-to-Face record",
      error: error.message,
    });
  }
};



const HHAPlanOfCare = require("../model/hhaplanofCare");

// Create a new HHA Plan of Care
exports.createHHAPlanOfCare = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.visitDate || !data.episodePeriod) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, Visit Date, and Episode Period are required",
      });
    }

    // Create and save the new HHA Plan of Care document
    const newPlan = new HHAPlanOfCare(data);
    await newPlan.save();

    res.status(201).json({
      success: true,
      message: "HHA Plan of Care created successfully",
      data: newPlan,
    });
  } catch (error) {
    console.error("Error creating HHA Plan of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create HHA Plan of Care",
      error: error.message,
    });
  }
};

// Update an existing HHA Plan of Care by ID
exports.updateHHAPlanOfCare = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the HHA Plan of Care document
    const updatedPlan = await HHAPlanOfCare.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({
        success: false,
        message: "HHA Plan of Care not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "HHA Plan of Care updated successfully",
      data: updatedPlan,
    });
  } catch (error) {
    console.error("Error updating HHA Plan of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update HHA Plan of Care",
      error: error.message,
    });
  }
};

// Get all HHA Plans of Care
// Get all HHA Plans of Care with pagination and sorting
exports.getAllHHAPlansOfCare = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default: page 1, limit 10

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const plans = await HHAPlanOfCare.find()
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)) // Limit the number of documents returned
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    const totalRecords = await HHAPlanOfCare.countDocuments(); // Total number of records

    res.status(200).json({
      success: true,
      message: "All HHA Plans of Care retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching HHA Plans of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve HHA Plans of Care",
      error: error.message,
    });
  }
};

// Get HHA Plans of Care by Physician ID with pagination and sorting
exports.getHHAPlansOfCareByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Default: page 1, limit 10

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    const plans = await HHAPlanOfCare.find({ physicianId })
      .sort({ createdAt: -1 }) // Sort by `createdAt` in descending order
      .skip(skip) // Skip documents for pagination
      .limit(Number(limit)) // Limit the number of documents returned
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!plans || plans.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No HHA Plans of Care found for the specified Physician ID",
      });
    }

    const totalRecords = await HHAPlanOfCare.countDocuments({ physicianId }); // Total records for the physician

    res.status(200).json({
      success: true,
      message: "HHA Plans of Care retrieved successfully",
      totalRecords,
      currentPage: Number(page),
      totalPages: Math.ceil(totalRecords / limit),
      data: plans,
    });
  } catch (error) {
    console.error("Error fetching HHA Plans of Care by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve HHA Plans of Care by Physician ID",
      error: error.message,
    });
  }
};


// Get a specific HHA Plan of Care by ID
exports.getHHAPlanOfCareById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the HHA Plan of Care document by ID
    const plan = await HHAPlanOfCare.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "HHA Plan of Care not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "HHA Plan of Care retrieved successfully",
      data: plan,
    });
  } catch (error) {
    console.error("Error fetching HHA Plan of Care by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve HHA Plan of Care",
      error: error.message,
    });
  }
};


// Delete a HHA Plan of Care by ID
exports.deleteHHAPlanOfCare = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the HHA Plan of Care document by ID
    const deletedPlan = await HHAPlanOfCare.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "HHA Plan of Care not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "HHA Plan of Care deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting HHA Plan of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete HHA Plan of Care",
      error: error.message,
    });
  }
};
