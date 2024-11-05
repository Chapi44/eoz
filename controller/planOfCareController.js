const PlanOfCare = require("../model/planOfCare");

// Create a new Plan of Care (POC)
const createPlanOfCare = async (req, res) => {
  try {
    const {
      patientId,
      careManagerId,
      startDate,
      endDate,
      goals,
      interventions,
      healthMetrics,
      followUpSchedule,
      dischargePlan,
      notes,
    } = req.body;

    const newPOC = new PlanOfCare({
      patientId,
      careManagerId,
      startDate,
      endDate,
      goals,
      interventions,
      healthMetrics,
      followUpSchedule,
      dischargePlan,
      notes,
    });

    const savedPOC = await newPOC.save();
    res.status(201).json({ message: "Plan of Care created successfully", data: savedPOC });
  } catch (error) {
    res.status(500).json({ message: "Failed to create Plan of Care", error: error.message });
  }
};

// Get a specific Plan of Care by ID
const getPlanOfCareById = async (req, res) => {
  try {
    const { id } = req.params;
    const poc = await PlanOfCare.findById(id)
      .populate("patientId careManagerId", "firstName lastName email name")
      .exec();

    if (!poc) {
      return res.status(404).json({ message: "Plan of Care not found" });
    }

    res.status(200).json(poc);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Plan of Care", error: error.message });
  }
};

// Get all Plans of Care
const getAllPlansOfCare = async (req, res) => {
  try {
    const pocs = await PlanOfCare.find()
      .sort({ createdAt: -1 })
      .populate("patientId careManagerId", "firstName lastName email name")
      .exec();

    res.status(200).json(pocs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Plans of Care", error: error.message });
  }
};

// Update a Plan of Care by ID
const updatePlanOfCare = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedPOC = await PlanOfCare.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedPOC) {
      return res.status(404).json({ message: "Plan of Care not found" });
    }

    res.status(200).json({ message: "Plan of Care updated successfully", data: updatedPOC });
  } catch (error) {
    res.status(500).json({ message: "Failed to update Plan of Care", error: error.message });
  }
};

// Delete a Plan of Care by ID
const deletePlanOfCare = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPOC = await PlanOfCare.findByIdAndDelete(id);

    if (!deletedPOC) {
      return res.status(404).json({ message: "Plan of Care not found" });
    }

    res.status(200).json({ message: "Plan of Care deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete Plan of Care", error: error.message });
  }
};

// Get Plans of Care by Patient ID
const getPlansOfCareByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const pocs = await PlanOfCare.find({ patientId })
      .sort({ createdAt: -1 })
      .populate("careManagerId", "firstName lastName email")
      .exec();

    res.status(200).json(pocs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Plans of Care for this patient", error: error.message });
  }
};

// Get Plans of Care by Care Manager ID
const getPlansOfCareByCareManagerId = async (req, res) => {
  try {
    const { careManagerId } = req.params;
    const pocs = await PlanOfCare.find({ careManagerId })
      .sort({ createdAt: -1 })
      .populate("patientId", "firstName lastName email")
      .exec();

    res.status(200).json(pocs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Plans of Care for this care manager", error: error.message });
  }
};

module.exports = {
  createPlanOfCare,
  getPlanOfCareById,
  getAllPlansOfCare,
  updatePlanOfCare,
  deletePlanOfCare,
  getPlansOfCareByPatientId,
  getPlansOfCareByCareManagerId,
};
