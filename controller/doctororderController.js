const { v4: uuidv4 } = require("uuid");
const DoctorOrder = require("../model/doctororder");

// Create a new DoctorOrder
exports.createDoctorOrder = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.orderDate || !data.effectiveDate) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, Order Date, and Effective Date are required",
      });
    }

    // Generate a random order number using UUID
    data.orderNumber = uuidv4();

    // Create and save the new DoctorOrder document
    const newDoctorOrder = new DoctorOrder(data);
    await newDoctorOrder.save();

    res.status(201).json({
      success: true,
      message: "Doctor Order created successfully",
      data: newDoctorOrder,
    });
  } catch (error) {
    console.error("Error creating Doctor Order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Doctor Order",
      error: error.message,
    });
  }
};

// Update an existing DoctorOrder by ID
exports.updateDoctorOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the DoctorOrder document
    const updatedOrder = await DoctorOrder.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Doctor Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating Doctor Order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Doctor Order",
      error: error.message,
    });
  }
};

// Get all DoctorOrders
exports.getAllDoctorOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Doctor Orders with pagination
    const orders = await DoctorOrder.find()
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      })
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    // Get the total count of Doctor Orders
    const totalOrders = await DoctorOrder.countDocuments();

    res.status(200).json({
      success: true,
      message: "All Doctor Orders retrieved successfully",
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / limit),
        totalItems: totalOrders,
      },
    });
  } catch (error) {
    console.error("Error fetching Doctor Orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Doctor Orders",
      error: error.message,
    });
  }
};

exports.getDoctorOrdersByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;
    const { page = 1, limit = 10 } = req.query; // Extract page and limit from query, default to page 1 and limit 10
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Fetch Doctor Orders by Physician ID with pagination
    const orders = await DoctorOrder.find({ physicianId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      })
      .skip(skip)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    // Get the total count of Doctor Orders for the specified Physician ID
    const totalOrders = await DoctorOrder.countDocuments({ physicianId });

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Doctor Orders found for the specified Physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Orders retrieved successfully",
      data: orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / limit),
        totalItems: totalOrders,
      },
    });
  } catch (error) {
    console.error("Error fetching Doctor Orders by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Doctor Orders by Physician ID",
      error: error.message,
    });
  }
};

// Get a specific DoctorOrder by ID
exports.getDoctorOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the DoctorOrder by ID
    const order = await DoctorOrder.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Doctor Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Order retrieved successfully",
      data: order,
    });
  } catch (error) {
    console.error("Error fetching Doctor Order by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Doctor Order",
      error: error.message,
    });
  }
};

// Get DoctorOrders by Physician ID


// Delete a DoctorOrder by ID
exports.deleteDoctorOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the DoctorOrder by ID
    const deletedOrder = await DoctorOrder.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Doctor Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor Order deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Doctor Order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Doctor Order",
      error: error.message,
    });
  }
};




const FoleyCathChange = require("../model/foleyCathChange");

// Create a new FoleyCathChange
exports.createFoleyCathChange = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.patientId || !data.physicianId || !data.visitDate) {
      return res.status(400).json({
        success: false,
        message: "Patient ID, Physician ID, and Visit Date are required",
      });
    }

    // Create and save the new FoleyCathChange document
    const newFoleyCathChange = new FoleyCathChange(data);
    await newFoleyCathChange.save();

    res.status(201).json({
      success: true,
      message: "Foley Cath Change record created successfully",
      data: newFoleyCathChange,
    });
  } catch (error) {
    console.error("Error creating Foley Cath Change record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Foley Cath Change record",
      error: error.message,
    });
  }
};

// Update an existing FoleyCathChange by ID
exports.updateFoleyCathChange = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the FoleyCathChange document
    const updatedFoleyCathChange = await FoleyCathChange.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedFoleyCathChange) {
      return res.status(404).json({
        success: false,
        message: "Foley Cath Change record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Foley Cath Change record updated successfully",
      data: updatedFoleyCathChange,
    });
  } catch (error) {
    console.error("Error updating Foley Cath Change record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Foley Cath Change record",
      error: error.message,
    });
  }
};

// Get all FoleyCathChange records
exports.getAllFoleyCathChange = async (req, res) => {
  try {
    const records = await FoleyCathChange.find()
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
      message: "All Foley Cath Change records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching Foley Cath Change records:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Foley Cath Change records",
      error: error.message,
    });
  }
};

// Get a specific FoleyCathChange by ID
exports.getFoleyCathChangeById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the FoleyCathChange document by ID
    const record = await FoleyCathChange.findById(id)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Foley Cath Change record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Foley Cath Change record retrieved successfully",
      data: record,
    });
  } catch (error) {
    console.error("Error fetching Foley Cath Change record by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Foley Cath Change record",
      error: error.message,
    });
  }
};

// Get FoleyCathChange records by Physician ID
exports.getFoleyCathChangeByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;

    // Find FoleyCathChange records by Physician ID
    const records = await FoleyCathChange.find({ physicianId })
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      });

    if (!records || records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Foley Cath Change records found for the specified Physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Foley Cath Change records retrieved successfully",
      data: records,
    });
  } catch (error) {
    console.error("Error fetching Foley Cath Change records by Physician ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Foley Cath Change records by Physician ID",
      error: error.message,
    });
  }
};

// Delete a FoleyCathChange record by ID
exports.deleteFoleyCathChange = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the FoleyCathChange record by ID
    const deletedRecord = await FoleyCathChange.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: "Foley Cath Change record not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Foley Cath Change record deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Foley Cath Change record:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Foley Cath Change record",
      error: error.message,
    });
  }
};
