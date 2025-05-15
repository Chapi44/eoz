const BillingClaim = require("../model/BillingClaim");

// Create a new billing claim
exports.createBillingClaim = async (req, res) => {
  try {
    const adminId = req.user?.adminId; // Use req.user?.adminId
    if (!adminId) {
      return res.status(403).json({
        success: false,
        message: "Admin ID is missing in token",
      });
    }
    const newClaim = new BillingClaim(req.body);
    const savedClaim = await newClaim.save();
    res.status(201).json({
      success: true,
      message: "Billing claim created successfully.",
      data: savedClaim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create billing claim.",
      error: error.message,
    });
  }
};

// Get all billing claims (optionally paginated)
exports.getAllBillingClaims = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get userId from token for filtering
    const userId = req.userId;
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "User ID is required",
      });
    }

    // Query with userId filter
    const query = { adminId: userId };

    // Fetch Billing Claims with pagination and sorting
    const claims = await BillingClaim.find(query)
      .populate({
        path: "patientId",
        select: "firstName lastName gender dob primaryAddress mobilePhone mrn",
      })
      .populate({
        path: "physicianId",
        select: "name email phone role",
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get the total count of Billing Claims
    const totalClaims = await BillingClaim.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "All Billing Claims retrieved successfully",
      data: claims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalClaims / limit),
        totalItems: totalClaims,
      },
    });
  } catch (error) {
    console.error("Error fetching Billing Claims:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve Billing Claims",
      error: error.message,
    });
  }
};


// Get a single billing claim by ID
exports.getBillingClaimById = async (req, res) => {
  try {
    const claim = await BillingClaim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: "Billing claim not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve billing claim.",
      error: error.message,
    });
  }
};

// Update a billing claim by ID
exports.updateBillingClaim = async (req, res) => {
  try {
    const updatedClaim = await BillingClaim.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedClaim) {
      return res.status(404).json({
        success: false,
        message: "Billing claim not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Billing claim updated successfully.",
      data: updatedClaim,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update billing claim.",
      error: error.message,
    });
  }
};

// Delete a billing claim by ID
exports.deleteBillingClaim = async (req, res) => {
  try {
    const deletedClaim = await BillingClaim.findByIdAndDelete(req.params.id);
    if (!deletedClaim) {
      return res.status(404).json({
        success: false,
        message: "Billing claim not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Billing claim deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete billing claim.",
      error: error.message,
    });
  }
};


// Get billing claims by physician ID
exports.getBillingClaimsByPhysicianId = async (req, res) => {
  try {
    const { physicianId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const claims = await BillingClaim.find({ physicianId })
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await BillingClaim.countDocuments({ physicianId });

    if (!claims || claims.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No billing claims found for the specified physician ID",
      });
    }

    res.status(200).json({
      success: true,
      message: "Billing claims retrieved successfully",
      data: claims,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve billing claims by physician ID",
      error: error.message,
    });
  }
};
