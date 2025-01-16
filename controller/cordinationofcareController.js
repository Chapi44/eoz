const CoordinationOfCare = require("../model/coordination");

// Create a new CoordinationOfCare
exports.createCoordinationOfCare = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.visitDate || !data.episodePeriod) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, Visit Date, and Episode Period are required",
      });
    }

    // Create and save the new CoordinationOfCare document
    const newCoordination = new CoordinationOfCare(data);
    await newCoordination.save();

    res.status(201).json({
      success: true,
      message: "Coordination of Care created successfully",
      data: newCoordination,
    });
  } catch (error) {
    console.error("Error creating Coordination of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Coordination of Care",
      error: error.message,
    });
  }
};

// Update an existing CoordinationOfCare by ID
exports.updateCoordinationOfCare = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the CoordinationOfCare document
    const updatedCoordination = await CoordinationOfCare.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedCoordination) {
      return res.status(404).json({
        success: false,
        message: "Coordination of Care not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coordination of Care updated successfully",
      data: updatedCoordination,
    });
  } catch (error) {
    console.error("Error updating Coordination of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Coordination of Care",
      error: error.message,
    });
  }
};

// Get all CoordinationOfCare documents
exports.getAllCoordinationOfCare = async (req, res) => {
  try {
    const coordinations = await CoordinationOfCare.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    res.status(200).json({
      success: true,
      message: "All Coordination of Care documents retrieved successfully",
      data: coordinations,
    });
  } catch (error) {
    console.error("Error fetching Coordination of Care documents:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Coordination of Care documents",
      error: error.message,
    });
  }
};

// Get a specific CoordinationOfCare by ID
exports.getCoordinationOfCareById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the CoordinationOfCare by ID
    const coordination = await CoordinationOfCare.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!coordination) {
      return res.status(404).json({
        success: false,
        message: "Coordination of Care not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coordination of Care retrieved successfully",
      data: coordination,
    });
  } catch (error) {
    console.error("Error fetching Coordination of Care by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Coordination of Care",
      error: error.message,
    });
  }
};

// Delete a CoordinationOfCare by ID
exports.deleteCoordinationOfCare = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the CoordinationOfCare by ID
    const deletedCoordination = await CoordinationOfCare.findByIdAndDelete(id);

    if (!deletedCoordination) {
      return res.status(404).json({
        success: false,
        message: "Coordination of Care not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coordination of Care deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Coordination of Care:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Coordination of Care",
      error: error.message,
    });
  }
};


exports.getAllCoordinationOfCareByPhysicianId = async (req, res) => {
    try {
      const { physicianId } = req.params;
  
      // Find CoordinationOfCare documents by Physician ID
      const coordinations = await CoordinationOfCare.find({ physicianId })
        .populate({
          path: "patientId",
          select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
        })
        .populate({
          path: "physicianId",
          select: "name email phone role",
        });
  
      if (!coordinations || coordinations.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Coordination of Care documents found for the specified Physician ID",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Coordination of Care documents retrieved successfully",
        data: coordinations,
      });
    } catch (error) {
      console.error("Error fetching Coordination of Care documents by Physician ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Coordination of Care documents by Physician ID",
        error: error.message,
      });
    }
  };


