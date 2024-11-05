const HealthMetrics = require("../model/healthMetrics"); // Import the Health Metrics model

// Create a new Health Metric
const createHealthMetric = async (req, res) => {
  try {
    const { patientId, visitId, painLevel, bloodSugar, functionalStatus } = req.body;

    const newMetric = new HealthMetrics({
      patientId,
      visitId,
      painLevel,
      bloodSugar,
      functionalStatus,
    });

    const savedMetric = await newMetric.save();
    res.status(201).json({ message: "Health metric created successfully", data: savedMetric });
  } catch (error) {
    res.status(500).json({ message: "Failed to create health metric", error: error.message });
  }
};

// Get a specific Health Metric by ID
const getHealthMetricById = async (req, res) => {
  try {
    const { id } = req.params;
    const metric = await HealthMetrics.findById(id)
      .populate("patientId visitId", "firstName lastName visitType") // Populate patient and visit details
      .exec();

    if (!metric) {
      return res.status(404).json({ message: "Health metric not found" });
    }

    res.status(200).json(metric);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health metric", error: error.message });
  }
};

// Get all Health Metrics
const getAllHealthMetrics = async (req, res) => {
  try {
    const metrics = await HealthMetrics.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("patientId visitId", "firstName lastName visitType") // Populate patient and visit details
      .exec();

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health metrics", error: error.message });
  }
};

// Get Health Metrics by Patient ID
const getHealthMetricsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const metrics = await HealthMetrics.find({ patientId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("visitId", "visitType") // Populate visit details
      .exec();

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health metrics for this patient", error: error.message });
  }
};

// Get Health Metrics by Visit ID
const getHealthMetricsByVisitId = async (req, res) => {
  try {
    const { visitId } = req.params;
    const metrics = await HealthMetrics.find({ visitId })
      .sort({ createdAt: -1 }) // Sort by newest first
      .populate("patientId", "firstName lastName") // Populate patient details
      .exec();

    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch health metrics for this visit", error: error.message });
  }
};

// Update a Health Metric by ID
const updateHealthMetric = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedMetric = await HealthMetrics.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updates comply with the schema
    });

    if (!updatedMetric) {
      return res.status(404).json({ message: "Health metric not found" });
    }

    res.status(200).json({ message: "Health metric updated successfully", data: updatedMetric });
  } catch (error) {
    res.status(500).json({ message: "Failed to update health metric", error: error.message });
  }
};

// Delete a Health Metric by ID
const deleteHealthMetric = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMetric = await HealthMetrics.findByIdAndDelete(id);

    if (!deletedMetric) {
      return res.status(404).json({ message: "Health metric not found" });
    }

    res.status(200).json({ message: "Health metric deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete health metric", error: error.message });
  }
};

module.exports = {
  createHealthMetric,
  getHealthMetricById,
  getAllHealthMetrics,
  getHealthMetricsByPatientId,
  getHealthMetricsByVisitId,
  updateHealthMetric,
  deleteHealthMetric,
};
