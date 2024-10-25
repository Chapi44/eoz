const MSWVisit = require("../model/mswVisit"); // Import the MSW Visit model

// Create a new MSW Visit
const createMSWVisit = async (req, res) => {
  try {
    const { patientId, mswId, startTime, endTime, visitNotes } = req.body;

    const newVisit = new MSWVisit({
      patientId,
      mswId,
      startTime,
      endTime,
      visitNotes,
    });

    const savedVisit = await newVisit.save();
    res.status(201).json({ message: "MSW visit created successfully", data: savedVisit });
  } catch (error) {
    res.status(500).json({ message: "Failed to create MSW visit", error: error.message });
  }
};

// Get a specific MSW Visit by ID
const getMSWVisitById = async (req, res) => {
    try {
      const { id } = req.params;
      const visit = await MSWVisit.findById(id)
        .populate("patientId mswId", "firstName lastName email profession ,name") // Populate patient and MSW details
        .exec();
  
      if (!visit) {
        return res.status(404).json({ message: "MSW visit not found" });
      }
  
      // Calculate duration in minutes
      const duration = Math.abs(
        new Date(visit.endTime) - new Date(visit.startTime)
      ) / (1000 * 60); // Convert milliseconds to minutes
  
      res.status(200).json({
        visit,
        duration: `${duration} minutes`,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MSW visit", error: error.message });
    }
  };
  
// Get all MSW Visits
const getAllMSWVisits = async (req, res) => {
    try {
      const visits = await MSWVisit.find()
        .sort({ createdAt: -1 }) // Sort by the latest visits first
        .populate("patientId mswId", "firstName lastName email profession ,name") // Populate patient and MSW details
        .exec();
  
      // Map through visits to add duration to each
      const visitsWithDuration = visits.map((visit) => {
        const duration = Math.abs(
          new Date(visit.endTime) - new Date(visit.startTime)
        ) / (1000 * 60); // Convert to minutes
  
        return {
          ...visit.toObject(), // Convert Mongoose doc to plain object
          duration: `${duration} minutes`,
        };
      });
  
      res.status(200).json(visitsWithDuration);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MSW visits", error: error.message });
    }
  };
  

// Get MSW Visits by Patient ID
const getMSWVisitsByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
      const visits = await MSWVisit.find({ patientId })
        .sort({ createdAt: -1 }) // Sort by latest visits first
        .populate("patientId mswId", "firstName lastName email profession ,name") // Populate MSW details
        .exec();
  
      const visitsWithDuration = visits.map((visit) => {
        const duration = Math.abs(
          new Date(visit.endTime) - new Date(visit.startTime)
        ) / (1000 * 60); // Convert to minutes
  
        return {
          ...visit.toObject(),
          duration: `${duration} minutes`,
        };
      });
  
      res.status(200).json(visitsWithDuration);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MSW visits for this patient", error: error.message });
    }
  };
  

// Get MSW Visits by MSW ID
const getMSWVisitsByMSWId = async (req, res) => {
    try {
      const { mswId } = req.params;
      const visits = await MSWVisit.find({ mswId })
        .sort({ createdAt: -1 }) // Sort by latest visits first
        .populate("patientId", "firstName lastName email") // Populate patient details
        .exec();
  
      const visitsWithDuration = visits.map((visit) => {
        const duration = Math.abs(
          new Date(visit.endTime) - new Date(visit.startTime)
        ) / (1000 * 60); // Convert to minutes
  
        return {
          ...visit.toObject(),
          duration: `${duration} minutes`,
        };
      });
  
      res.status(200).json(visitsWithDuration);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch MSW visits for this MSW", error: error.message });
    }
  };
  
// Update an MSW Visit by ID
const updateMSWVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedVisit = await MSWVisit.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
    });

    if (!updatedVisit) {
      return res.status(404).json({ message: "MSW visit not found" });
    }

    res.status(200).json({ message: "MSW visit updated successfully", data: updatedVisit });
  } catch (error) {
    res.status(500).json({ message: "Failed to update MSW visit", error: error.message });
  }
};

// Delete an MSW Visit by ID
const deleteMSWVisit = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVisit = await MSWVisit.findByIdAndDelete(id);

    if (!deletedVisit) {
      return res.status(404).json({ message: "MSW visit not found" });
    }

    res.status(200).json({ message: "MSW visit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete MSW visit", error: error.message });
  }
};

module.exports = {
  createMSWVisit,
  getMSWVisitById,
  getAllMSWVisits,
  getMSWVisitsByPatientId,
  getMSWVisitsByMSWId,
  updateMSWVisit,
  deleteMSWVisit,
};
