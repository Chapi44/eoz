const { v4: uuidv4 } = require('uuid'); // Import UUID library
const Patient = require('../model/patients');

const registerPatient = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      gender,
      dob,
      socialSecurityNumber,
      maritalStatus,
      alternatePhone,
      mobilePhone,
      emailAddress,
      clinicalManager,
      caseManager,
      primaryAddress,
      mailingAddress,
      payers,
      appointment,
      appointmentTimes,
      location
    } = req.body;

    const baseURL = process.env.BASE_URL || "http://localhost:5000";

    // Safely handle file upload
    const pictures = Array.isArray(req.files) && req.files.length > 0
      ? req.files.map(file => baseURL + "/uploads/profilepic/" + file.filename)
      : [];

    // Generate a unique MRN using UUID
    const mrn = uuidv4();

    // Create new Patient instance
    const newPatient = new Patient({
      firstName,
      lastName,
      gender,
      dob,
      socialSecurityNumber,
      maritalStatus,
      alternatePhone,
      mobilePhone,
      emailAddress,
      clinicalManager,
      caseManager,
      primaryAddress,
      mailingAddress,
      pictures,
      payers,
      appointment,
      appointmentTimes,
      location,
      mrn // Unique patient Medical Record Number
    });

    // Save to DB
    const savedPatient = await newPatient.save();

    return res.status(201).json({
      message: "Patient registered successfully",
      data: savedPatient
    });
  } catch (error) {
    console.error("Error registering patient:", error);
    return res.status(500).json({
      message: "An error occurred while registering the patient",
      error: error.message
    });
  }
};




// Get all patients
const getAllPatients = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = Math.max(parseInt(page), 1);
    limit = Math.max(parseInt(limit), 1);
    const skip = (page - 1) * limit;

    // Fetch patients with pagination and sorting by createdAt descending
    const patients = await Patient.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get the total count of patients
    const totalPatients = await Patient.countDocuments();

    res.status(200).json({
      success: true,
      message: "All patients retrieved successfully",
      data: patients,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPatients / limit),
        totalItems: totalPatients,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving patients",
      error: error.message,
    });
  }
};




// Get a patient by ID
const getPatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving the patient",
      error: error.message
    });
  }
};

// Update patient information by ID
const updatePatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const baseURL = process.env.BASE_URL; // Replace with your actual base URL

    if (req.files && req.files.length > 0) {
      const pictures = req.files.map(
        (file) => baseURL + "/uploads/profilepic/" + file.filename
      );
      updateData.pictures = pictures;
    }

    const updatedPatient = await Patient.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    res.status(200).json({
      message: "Patient updated successfully",
      data: updatedPatient
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while updating the patient",
      error: error.message
    });
  }
};

// Delete patient by ID
const deletePatientById = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    
    if (!deletedPatient) {
      return res.status(404).json({
        message: "Patient not found"
      });
    }

    res.status(200).json({
      message: "Patient deleted successfully",
      data: deletedPatient
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the patient",
      error: error.message
    });
  }
};


module.exports={
    registerPatient,
    updatePatientById,
    getAllPatients,
    getPatientById,
    deletePatientById

}