const NurseVisit = require("../model/nursevisitpsyc");

// Create a new Nurse Visit
exports.createNurseVisit = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.type) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Type are required",
      });
    }

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Attach adminId to the Nurse Visit document
    const newVisit = new NurseVisit({
      ...data,
      adminId, // Attach adminId
    });

    // Save the new Nurse Visit
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "Nurse Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating Nurse Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Nurse Visit",
      error: error.message,
    });
  }
};


// Update an existing Nurse Visit by ID
exports.updateNurseVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Nurse Visit
    const updatedVisit = await NurseVisit.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Nurse Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating Nurse Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Nurse Visit",
      error: error.message,
    });
  }
};

// Get all Nurse Visits with pagination and sorting
exports.getAllNurseVisits = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query; // Extract type, page, and limit from query
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get adminId from token for filtering
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    const filter = {
      adminId, // Filter by adminId
      ...(type ? { type } : {}), // Filter by type if provided
    };

    // Fetch Nurse Visits with pagination and sorting
    const visits = await NurseVisit.find(filter)
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

    // Get the total count of Nurse Visits matching the filter
    const totalVisits = await NurseVisit.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "All Nurse Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Nurse Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nurse Visits",
      error: error.message,
    });
  }
};


// Get a specific Nurse Visit by ID
exports.getNurseVisitById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Nurse Visit by ID
    const visit = await NurseVisit.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Nurse Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching Nurse Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nurse Visit",
      error: error.message,
    });
  }
};


// Get Nurse Visits by Type
exports.getNurseVisitsByTypeAndNurseId = async (req, res) => {
    try {
      const { nurseId } = req.params;
      const { type } = req.query;

      // Construct filter object
      const filter = { nurseId };
      if (type) {
        filter.type = type;
      }

      // Find Nurse Visits by Type and Nurse ID
      const visits = await NurseVisit.find(filter)
        .populate({
          path: "patientId",
          select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
        })
        .populate({
          path: "nurseId",
          select: "name email phone role",
        });

      if (!visits || visits.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Nurse Visits found for the specified type and nurse ID",
        });
      }

      res.status(200).json({
        success: true,
        message: "Nurse Visits retrieved successfully",
        data: visits,
      });
    } catch (error) {
      console.error("Error fetching Nurse Visits by Type and Nurse ID:", error);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve Nurse Visits by Type and Nurse ID",
        error: error.message,
      });
    }
  };
  

// Delete a Nurse Visit by ID
exports.deleteNurseVisit = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Nurse Visit by ID
    const deletedVisit = await NurseVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Nurse Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Nurse Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Nurse Visit",
      error: error.message,
    });
  }
};


const NursingVisitSpecialist = require("../model/nursingVisitspecial");

// Create a new Nursing Visit
exports.createNursingVisitSpecial = async (req, res) => {
  try {
    const data = req.body;

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.type) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Type are required",
      });
    }

    // Attach adminId to the Nursing Visit record
    const newVisit = new NursingVisitSpecialist({
      ...data,
      adminId,
    });

    // Save the new Nursing Visit
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "Nursing Visit created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating Nursing Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Nursing Visit",
      error: error.message,
    });
  }
};
// Update an existing Nursing Visit by ID
exports.updateNursingVisitSpecial = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Nursing Visit
    const updatedVisit = await NursingVisitSpecialist.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Nursing Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing Visit updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating Nursing Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Nursing Visit",
      error: error.message,
    });
  }
};

// Get all Nursing Visits with pagination and sorting
exports.getAllNursingVisitsSpecial = async (req, res) => {
  try {
    const { page = 1, limit = 10, type } = req.query; // Extract page, limit, and type from query
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Build the filter with adminId and optional type
    const filter = { adminId };
    if (type) {
      filter.type = type;
    }

    // Fetch Nursing Visits with pagination and sorting
    const visits = await NursingVisitSpecialist.find(filter)
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

    // Get the total count of Nursing Visits matching the filter
    const totalVisits = await NursingVisitSpecialist.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "All Nursing Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Nursing Visits:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nursing Visits",
      error: error.message,
    });
  }
};

// Get Nursing Visits by Type and Nurse ID with pagination and sorting
exports.getNursingVisitsByTypeAndNurseIdSpecial = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { page = 1, limit = 10, type } = req.query; // Extract page, limit, and type from query
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Construct filter object
    const filter = { nurseId };
    if (type) {
      filter.type = type;
    }

    // Fetch Nursing Visits by Type and Nurse ID with pagination and sorting
    const visits = await NursingVisitSpecialist.find(filter)
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

    // Get the total count of Nursing Visits for the specified filter
    const totalVisits = await NursingVisitSpecialist.countDocuments(filter);

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Nursing Visits found for the specified type and nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing Visits retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Nursing Visits by Type and Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nursing Visits by Type and Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific Nursing Visit by ID
exports.getNursingVisitByIdSpecial = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Nursing Visit by ID
    const visit = await NursingVisitSpecialist.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Nursing Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing Visit retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching Nursing Visit by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nursing Visit",
      error: error.message,
    });
  }
};



// Delete a Nursing Visit by ID
exports.deleteNursingVisitSpecial = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Nursing Visit by ID
    const deletedVisit = await NursingVisitSpecialist.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Nursing Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nursing Visit deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Nursing Visit:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Nursing Visit",
      error: error.message,
    });
  }
};

const NurseVisitAdvanced = require("../model/nurseVisitAdvanced");

// Create a new Nurse Visit Advanced
exports.createNurseVisitAdvanced = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.nurseId || !data.visitDate || !data.type) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Nurse ID, Visit Date, and Type are required",
      });
    }

    // Get adminId from token for filtering
    const adminId = req.user?.adminId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Attach adminId to the Nurse Visit Advanced document
    const newVisit = new NurseVisitAdvanced({
      ...data,
      adminId, // Attach adminId
    });

    // Save the new Nurse Visit Advanced
    await newVisit.save();

    res.status(201).json({
      success: true,
      message: "Nurse Visit Advanced created successfully",
      data: newVisit,
    });
  } catch (error) {
    console.error("Error creating Nurse Visit Advanced:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Nurse Visit Advanced",
      error: error.message,
    });
  }
};

// Update an existing Nurse Visit Advanced by ID
exports.updateNurseVisitAdvanced = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the Nurse Visit Advanced
    const updatedVisit = await NurseVisitAdvanced.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedVisit) {
      return res.status(404).json({
        success: false,
        message: "Nurse Visit Advanced not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visit Advanced updated successfully",
      data: updatedVisit,
    });
  } catch (error) {
    console.error("Error updating Nurse Visit Advanced:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Nurse Visit Advanced",
      error: error.message,
    });
  }
};

// Get all Nurse Visit Advanced with pagination and sorting
exports.getAllNurseVisitsAdvanced = async (req, res) => {
  try {
    const { type, page = 1, limit = 10 } = req.query; // Extract type, page, and limit from query
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get adminId from token for filtering
    const adminId = req.userId;
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }

    // Build the filter for the query
    const filter = {
      adminId, // Filter by adminId
      ...(type ? { type } : {}), // Filter by type if provided
    };

    // Fetch Nurse Visit Advanced with pagination and sorting
    const visits = await NurseVisitAdvanced.find(filter)
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

    // Get the total count of Nurse Visit Advanced matching the filter
    const totalVisits = await NurseVisitAdvanced.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "All Nurse Visit Advanced records retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Nurse Visit Advanced records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nurse Visit Advanced records",
      error: error.message,
    });
  }
};


// Get Nurse Visits Advanced by Type and Nurse ID with pagination and sorting
exports.getNurseVisitsAdvancedByTypeAndNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const { type, page = 1, limit = 10 } = req.query; // Extract type, page, and limit from query
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Construct filter object
    const filter = { nurseId };
    if (type) {
      filter.type = type;
    }

    // Fetch Nurse Visits Advanced by Type and Nurse ID with pagination and sorting
    const visits = await NurseVisitAdvanced.find(filter)
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

    // Get the total count of Nurse Visits Advanced matching the filter
    const totalVisits = await NurseVisitAdvanced.countDocuments(filter);

    if (!visits || visits.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Nurse Visits Advanced found for the specified type and nurse ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visits Advanced retrieved successfully",
      data: visits,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalVisits / limit),
        totalItems: totalVisits,
      },
    });
  } catch (error) {
    console.error("Error fetching Nurse Visits Advanced by Type and Nurse ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nurse Visits Advanced by Type and Nurse ID",
      error: error.message,
    });
  }
};

// Get a specific Nurse Visit Advanced by ID
exports.getNurseVisitAdvancedById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Nurse Visit Advanced by ID
    const visit = await NurseVisitAdvanced.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Nurse Visit Advanced not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visit Advanced retrieved successfully",
      data: visit,
    });
  } catch (error) {
    console.error("Error fetching Nurse Visit Advanced by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Nurse Visit Advanced",
      error: error.message,
    });
  }
};



// Delete a Nurse Visit Advanced by ID
exports.deleteNurseVisitAdvanced = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the Nurse Visit Advanced by ID
    const deletedVisit = await NurseVisitAdvanced.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({
        success: false,
        message: "Nurse Visit Advanced not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Nurse Visit Advanced deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Nurse Visit Advanced:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Nurse Visit Advanced",
      error: error.message,
    });
  }
};
