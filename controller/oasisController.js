const OASISAssessment = require("../model/oasisAssessment"); // Import the model

// Create a new OASIS Assessment
const createOASISAssessment = async (req, res) => {
  try {
    const { 
      patientId, 
      nurseId, 
      assessmentDate, 
      nursesigniturepictures = [], 
      patientsigniturepictures = [], 
      ...otherFields 
    } = req.body;

    // Create a new OASIS Assessment object with provided data
    const newAssessment = new OASISAssessment({
      patientId,
      nurseId,
      assessmentDate,
      nursesigniturepictures,  // Expecting array of signature URLs as JSON input
      patientsigniturepictures, // Expecting array of signature URLs as JSON input
      ...otherFields, // Spread additional OASIS fields
    });

    const savedAssessment = await newAssessment.save();
    res.status(201).json({
      message: "OASIS Assessment created successfully",
      data: savedAssessment,
    });
  } catch (error) {
    console.error("Error creating OASIS Assessment:", error);
    res.status(500).json({
      message: "Failed to create OASIS Assessment",
      error: error.message,
    });
  }
};

// Get a specific OASIS Assessment by ID
const getOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await OASISAssessment.findById(id)
    .populate("patientId nurseId", "firstName lastName email name pictures") 
      .exec();
      
    if (!assessment) {
      return res.status(404).json({ message: "OASIS Assessment not found" });
    }

    res.status(200).json(assessment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch OASIS Assessment", error: error.message });
  }
};

// Get all OASIS Assessments for a patient
const getOASISAssessmentsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const assessments = await OASISAssessment.find({ patientId })
      .populate("nurseId", "name email pictures")
      .exec();

    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch OASIS Assessments", error: error.message });
  }
};
// Get all OASIS Assessments by Nurse ID
const getOASISAssessmentsByNurse = async (req, res) => {
  try {
    const { nurseId } = req.params;
    const assessments = await OASISAssessment.find({ nurseId })
      .populate("patientId", "firstName lastName email")
      .exec();

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({ message: "No OASIS Assessments found for this nurse" });
    }

    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch OASIS Assessments by nurse", error: error.message });
  }
};

// Update an OASIS Assessment

const updateOASISAssessment = async (req, res) => {
  try {
    const { id } = req.params; // Get the assessment ID from the route parameters
    const updatedData = req.body; // Extract the updated data from the request body

    // Ensure nurse and patient signature pictures are handled as JSON arrays
    if (updatedData.nursesigniturepictures) {
      updatedData.nursesigniturepictures = Array.isArray(updatedData.nursesigniturepictures)
        ? updatedData.nursesigniturepictures
        : [updatedData.nursesigniturepictures];
    }

    if (updatedData.patientsigniturepictures) {
      updatedData.patientsigniturepictures = Array.isArray(updatedData.patientsigniturepictures)
        ? updatedData.patientsigniturepictures
        : [updatedData.patientsigniturepictures];
    }

    // Perform the database update operation
    const updatedAssessment = await OASISAssessment.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure updates comply with schema validation
      }
    );

    // Check if the assessment exists
    if (!updatedAssessment) {
      return res.status(404).json({ message: "OASIS Assessment not found" });
    }

    // Send success response
    res.status(200).json({
      message: "OASIS Assessment updated successfully",
      data: updatedAssessment,
    });
  } catch (error) {
    console.error("Error updating OASIS Assessment:", error);
    // Handle errors
    res.status(500).json({
      message: "Failed to update OASIS Assessment",
      error: error.message,
    });
  }
};



// Delete an OASIS Assessment
const deleteOASISAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAssessment = await OASISAssessment.findByIdAndDelete(id);

    if (!deletedAssessment) {
      return res.status(404).json({ message: "OASIS Assessment not found" });
    }

    res.status(200).json({ message: "OASIS Assessment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete OASIS Assessment", error: error.message });
  }
};

const getAllOASISAssessments = async (req, res) => {
  try {
    const assessments = await OASISAssessment.find({})
      .sort({ createdAt: -1 }) // Sort by 'createdAt' in descending order (-1)
      .populate("patientId nurseId", "firstName lastName email name pictures") // Populate patient and nurse details
      .exec();

    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch OASIS Assessments", error: error.message });
  }
};

const updateDischargeStatus = async (req, res) => {
  try {
    const { id } = req.params; // OASIS Assessment ID from the URL params

    // Find the assessment by ID and update the discharge field to true
    const updatedAssessment = await OASISAssessment.findByIdAndUpdate(
      id,
      { discharge: true },
      { new: true, runValidators: true } // Return updated document & run validators
    );

    if (!updatedAssessment) {
      return res.status(404).json({ message: "OASIS Assessment not found" });
    }

    res.status(200).json({
      message: "Discharge status updated successfully",
      data: updatedAssessment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update discharge status",
      error: error.message,
    });
  }
};
module.exports = {
  createOASISAssessment,
  getOASISAssessmentById,
  getOASISAssessmentsByPatient,
  updateOASISAssessment,
  deleteOASISAssessment,
  getAllOASISAssessments,
  getOASISAssessmentsByNurse,
  updateDischargeStatus
};
