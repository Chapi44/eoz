const Patient = require('../model/patients');

// Register a new patient
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

    const baseURL = process.env.BASE_URL; // Replace with your actual base URL

    const pictures = req.files.map(
      (file) => baseURL + "/uploads/profilepic/" + file.filename
    );


    // Create a new patient
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
      location
    });
    
    // Save the patient to the database
    const savedPatient = await newPatient.save();
    
    res.status(201).json({
      message: "Patient registered successfully",
      data: savedPatient
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while registering the patient",
      error: error.message
    });
  }
};




// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    const totalPatients = await Patient.countDocuments(); // Get the total count of patients

    res.status(200).json({
      totalPatients, // Add total count of patients to the response
      patients // The list of patients
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while retrieving patients",
      error: error.message
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