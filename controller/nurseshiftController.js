const NurseVisit = require("../model/nurseVisit");

// Create a new Nurse Visit
const createNurseVisit = async (req, res) => {
  try {
    const { patientId, nurseId, visitType, startTime, endTime, servicesProvided, notes, followUp, location } = req.body;

    const newVisit = new NurseVisit({
      patientId,
      nurseId,
      visitType,
      startTime,
      endTime,
      servicesProvided,
      notes,
      followUp,
      location
    });

    const savedVisit = await newVisit.save();
    res.status(201).json({ message: "Nurse visit created successfully", data: savedVisit });
  } catch (error) {
    res.status(500).json({ message: "Failed to create nurse visit", error: error.message });
  }
};

// Get a specific Nurse Visit by ID
const getNurseVisitById = async (req, res) => {
  try {
    const { id } = req.params;
    const visit = await NurseVisit.findById(id)
      .populate("patientId nurseId", "firstName lastName email name pictures") // Populate related details
      .exec();

    if (!visit) {
      return res.status(404).json({ message: "Nurse visit not found" });
    }

    // Calculate the duration of the visit in minutes
    const duration = Math.abs(new Date(visit.endTime) - new Date(visit.startTime)) / (1000 * 60); // Convert ms to minutes

    res.status(200).json({
      visit,
      duration: `${duration} minutes`,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nurse visit", error: error.message });
  }
};

// Get all Nurse Visits
const getAllNurseVisits = async (req, res) => {
  try {
    const visits = await NurseVisit.find()
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .populate("patientId nurseId", "firstName lastName email name pictures") // Populate patient and nurse details
      .exec();

    // Calculate the duration for each visit
    const visitsWithDuration = visits.map((visit) => {
      const duration = Math.abs(new Date(visit.endTime) - new Date(visit.startTime)) / (1000 * 60); // Convert to minutes
      return {
        ...visit.toObject(), // Convert the Mongoose doc to a plain JS object
        duration: `${duration} minutes`,
      };
    });

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nurse visits", error: error.message });
  }
};

// Update a Nurse Visit by ID
const updateNurseVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedVisit = await NurseVisit.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the updates comply with schema
    });

    if (!updatedVisit) {
      return res.status(404).json({ message: "Nurse visit not found" });
    }

    res.status(200).json({ message: "Nurse visit updated successfully", data: updatedVisit });
  } catch (error) {
    res.status(500).json({ message: "Failed to update nurse visit", error: error.message });
  }
};

// Delete a Nurse Visit by ID
const deleteNurseVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVisit = await NurseVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({ message: "Nurse visit not found" });
    }

    res.status(200).json({ message: "Nurse visit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete nurse visit", error: error.message });
  }
};


// Get Nurse Visits by Patient ID
const getNurseVisitsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const visits = await NurseVisit.find({ patientId })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .populate("nurseId", "firstName lastName email name pictures") // Populate nurse details
      .exec();

    const visitsWithDuration = visits.map((visit) => {
      const duration = Math.abs(new Date(visit.endTime) - new Date(visit.startTime)) / (1000 * 60); // Duration in minutes
      return { ...visit.toObject(), duration: `${duration} minutes` };
    });

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nurse visits for this patient", error: error.message });
  }
};

// Get Nurse Visits by Nurse ID
const getNurseVisitsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const visits = await NurseVisit.find({ nurseId })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .populate("patientId", "firstName lastName email name pictures") // Populate patient details
      .exec();

    const visitsWithDuration = visits.map((visit) => {
      const duration = Math.abs(new Date(visit.endTime) - new Date(visit.startTime)) / (1000 * 60); // Duration in minutes
      return { ...visit.toObject(), duration: `${duration} minutes` };
    });

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nurse visits for this nurse", error: error.message });
  }
};

// Get Nurse Visits by Patient ID and Nurse ID
const getNurseVisitsByPatientAndNurse = async (req, res) => {
  try {
    const { patientId, nurseId } = req.params;
    const visits = await NurseVisit.find({ patientId, nurseId })
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .exec();

    const visitsWithDuration = visits.map((visit) => {
      const duration = Math.abs(new Date(visit.endTime) - new Date(visit.startTime)) / (1000 * 60); // Duration in minutes
      return { ...visit.toObject(), duration: `${duration} minutes` };
    });

    res.status(200).json(visitsWithDuration);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch nurse visits", error: error.message });
  }
};

module.exports = {
  createNurseVisit,
  getNurseVisitById,
  getAllNurseVisits,
  updateNurseVisit,
  deleteNurseVisit,
  getNurseVisitsByPatientId, // New function to get visits by patient ID
  getNurseVisitsByNurseId, // New function to get visits by nurse ID
  getNurseVisitsByPatientAndNurse, // New function to get visits by both patient and nurse IDs
};
