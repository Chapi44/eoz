const TherapyVisit = require("../model/therapyVisit");

// Create a new Therapy Visit
const createTherapyVisit = async (req, res) => {
  try {
    const { patientId, therapistId, therapyType, startTime, endTime, functionalAssessment, tasksPerformed, reassessment, dischargePlan, followUp, notes } = req.body;

    const newVisit = new TherapyVisit({
      patientId,
      therapistId,
      therapyType,
      startTime,
      endTime,
      functionalAssessment,
      tasksPerformed,
      reassessment,
      dischargePlan,
      followUp,
      notes
    });

    const savedVisit = await newVisit.save();
    res.status(201).json({ message: "Therapy visit created successfully", data: savedVisit });
  } catch (error) {
    res.status(500).json({ message: "Failed to create therapy visit", error: error.message });
  }
};

// Calculate duration (in minutes)
const calculateDuration = (startTime, endTime) => {
  return Math.abs(new Date(endTime) - new Date(startTime)) / (1000 * 60);
};


const getTherapyVisitById = async (req, res) => {
  try {
    const { id } = req.params;
    const visit = await TherapyVisit.findById(id)
      .populate("patientId therapistId", "firstName lastName email")
      .exec();

    if (!visit) {
      return res.status(404).json({ message: "Therapy visit not found" });
    }

    const duration = calculateDuration(visit.startTime, visit.endTime);

    res.status(200).json({ visit, duration: `${duration} minutes` });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch therapy visit", error: error.message });
  }
};

// Get all Therapy Visits
const getAllTherapyVisits = async (req, res) => {
  try {
    const visits = await TherapyVisit.find()
      .sort({ createdAt: -1 })
      .populate("patientId therapistId", "firstName lastName email name pictures")
      .exec();

    const visitsWithDuration = visits.map((visit) => ({
      ...visit.toObject(),
      duration: `${calculateDuration(visit.startTime, visit.endTime)} minutes`,
    }));

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch therapy visits", error: error.message });
  }
};

// Get Therapy Visits by Patient ID
const getTherapyVisitsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const visits = await TherapyVisit.find({ patientId })
      .sort({ createdAt: -1 })
      .populate("patientId therapistId", "firstName lastName email name pictures")
      .exec();

    const visitsWithDuration = visits.map((visit) => ({
      ...visit.toObject(),
      duration: `${calculateDuration(visit.startTime, visit.endTime)} minutes`,
    }));

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch therapy visits for this patient", error: error.message });
  }
};

// Get Therapy Visits by Therapist ID
const getTherapyVisitsByTherapistId = async (req, res) => {
  try {
    const { therapistId } = req.params;
    const visits = await TherapyVisit.find({ therapistId })
      .sort({ createdAt: -1 })
      .populate("patientId therapistId", "firstName lastName email name pictures")
      .exec();

    const visitsWithDuration = visits.map((visit) => ({
      ...visit.toObject(),
      duration: `${calculateDuration(visit.startTime, visit.endTime)} minutes`,
    }));

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch therapy visits for this therapist", error: error.message });
  }
};
// Update a Therapy Visit by ID
const updateTherapyVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedVisit = await TherapyVisit.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updates comply with schema
    });

    if (!updatedVisit) {
      return res.status(404).json({ message: "Therapy visit not found" });
    }

    res.status(200).json({ message: "Therapy visit updated successfully", data: updatedVisit });
  } catch (error) {
    res.status(500).json({ message: "Failed to update therapy visit", error: error.message });
  }
};

// Delete a Therapy Visit by ID
const deleteTherapyVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVisit = await TherapyVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({ message: "Therapy visit not found" });
    }

    res.status(200).json({ message: "Therapy visit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete therapy visit", error: error.message });
  }
};

module.exports = {
  createTherapyVisit,
  getTherapyVisitById,
  getAllTherapyVisits,
  getTherapyVisitsByPatientId,  // New method to get visits by patientId
  getTherapyVisitsByTherapistId, // New method to get visits by therapistId
  updateTherapyVisit,
  deleteTherapyVisit
};
