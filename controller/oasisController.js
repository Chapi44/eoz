const OASISAssessment = require("../model/oasisAssessment");

// Create a new OASISAssessment
exports.createOASISAssessment = async (req, res) => {
  try {
    const data = req.body;

    const newOASISAssessment = new OASISAssessment(data);
    await newOASISAssessment.save();

    res.status(201).json({
      success: true,
      message: "OASIS Assessment created successfully",
      data: newOASISAssessment,
    });
  } catch (error) {
    console.error("Error creating OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create OASIS Assessment",
      error: error.message,
    });
  }
};


// Get all OASIS Assessments (sorted by createdAt and updatedAt descending)
exports.getAllOASISAssessments = async (req, res) => {
  try {
    const oasisAssessments = await OASISAssessment.find()
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt in descending order

    res.status(200).json({
      success: true,
      message: "OASIS Assessments retrieved successfully",
      data: oasisAssessments,
    });
  } catch (error) {
    console.error("Error retrieving OASIS Assessments:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OASIS Assessments",
      error: error.message,
    });
  }
};

// Get a single OASISAssessment by ID
exports.getOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const oasisAssessment = await OASISAssessment.findById(id).populate("nurseId");

    if (!oasisAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OASIS Assessment retrieved successfully",
      data: oasisAssessment,
    });
  } catch (error) {
    console.error("Error retrieving OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve OASIS Assessment",
      error: error.message,
    });
  }
};

// Fetch Plan of Care by OASIS ID with Populated Nurse and Patient Data
exports.fetchPlanOfCare = async (req, res) => {
  try {
    const { oasisId } = req.params; // Extract OASIS ID from request parameters

    // Define the fields to select for Plan of Care
    const fieldsToSelect = {
      _id: 1,
      patientId: 1,
      nurseId: 1,
      assessmentDate: 1,
      "demographics.firstName": 1,
      "demographics.lastName": 1,
      "demographics.gender": 1,
      "demographics.birthDate": 1,
      "planOfCare.safetyMeasures": 1,
      "assessmentDate": 1,
      "planOfCare.functionalLimitations": 1,
      "planOfCare.activitiesPermittedRestricted": 1,
      "ordersForDisciplineAndTreatment": 1,
      "trainingAndEducationResources": 1,
      "planOfCareDisciplineOrdersAndTreatment": 1,
      "prognosis": 1,
      "patientHistoryAndDiagnoses": 1,
      "summaryOfCare.patientGoal": 1,
      "summaryOfCare.planOfCareReview": 1,
      "summaryOfCare.planOfCareDisciplineOrdersAndTreatment": 1,
      "summaryOfCare.rehabilitationPotentialAndDischargePlans": 1,
      "disciplineFrequencyAndDuration": 1,
      "medications.medicationAdministration": 1,
      "functionalAbilitiesGoals.selfCarePerformance": 1,
      "functionalAbilitiesGoals.mobilityPerformance": 1,
      "functionalAbilitiesGoals.comments": 1,
      "functionalStatus.fallRiskAssessment": 1,
      "functionalStatus.ambulationLocomotion": 1,
      "nutritionAssessment.nutritionAssessment": 1,
      "nutritionAssessment.planOfCareNutritionalRequirements": 1,
      "therapyNeed": 1,
      "aideCarePlan.ordersForDisciplineAndTreatment": 1,
      "sensoryStatus.sensoryAssessment": 1,
      "painStatus.painAssessment": 1,
      createdAt: 1,
      updatedAt: 1,
    };

    // Fetch the Plan of Care by OASIS ID and populate nurse and patient data
    const planOfCareData = await OASISAssessment.findById(oasisId, fieldsToSelect)
      .populate({
        path: "patientId",
        select: "firstName lastName gender birthDate phone address",
      })
      .populate({
        path: "nurseId",
        select: "name email phone role",
      });

    if (!planOfCareData) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    // Respond with the fetched data
    res.status(200).json({
      success: true,
      message: "Fetched Plan of Care data successfully",
      data: planOfCareData,
    });
  } catch (error) {
    console.error("Error fetching Plan of Care by OASIS ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Plan of Care data",
      error: error.message,
    });
  }
};


// Get OASIS Assessment by nurseId and patientId
exports.getOASISAssessmentByNurseAndPatient = async (req, res) => {
  try {
    const { nurseId, patientId } = req.params;

    const oasisAssessment = await OASISAssessment.findOne({
      nurseId,
      patientId,
    })
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt

    if (!oasisAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found for the given nurseId and patientId",
      });
    }

    res.status(200).json({
      success: true,
      data: oasisAssessment,
    });
  } catch (error) {
    console.error("Error fetching OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OASIS Assessment",
      error: error.message,
    });
  }
};

// Get OASIS Assessments by nurseId (sorted by createdAt and updatedAt descending)
exports.getOASISAssessmentsByNurseId = async (req, res) => {
  try {
    const { nurseId } = req.params;

    const assessments = await OASISAssessment.find({ nurseId })
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt in descending order

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OASIS Assessments found for the given nurseId",
      });
    }

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch (error) {
    console.error("Error fetching OASIS Assessments by nurseId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OASIS Assessments",
      error: error.message,
    });
  }
};

// Get OASIS Assessments by patientId (sorted by createdAt and updatedAt descending)
exports.getOASISAssessmentsByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;

    const assessments = await OASISAssessment.find({ patientId })
      .populate("nurseId")
      .sort({ createdAt: -1, updatedAt: -1 }); // Sorting by createdAt and updatedAt in descending order

    if (!assessments || assessments.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No OASIS Assessments found for the given patientId",
      });
    }

    res.status(200).json({
      success: true,
      data: assessments,
    });
  } catch (error) {
    console.error("Error fetching OASIS Assessments by patientId:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch OASIS Assessments",
      error: error.message,
    });
  }
};

// Update a OASISAssessment by ID
exports.updateOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedOASISAssessment = await OASISAssessment.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    if (!updatedOASISAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OASIS Assessment updated successfully",
      data: updatedOASISAssessment,
    });
  } catch (error) {
    console.error("Error updating OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update OASIS Assessment",
      error: error.message,
    });
  }
};

// Delete a OASISAssessment by ID
exports.deleteOASISAssessmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOASISAssessment = await OASISAssessment.findByIdAndDelete(id);

    if (!deletedOASISAssessment) {
      return res.status(404).json({
        success: false,
        message: "OASIS Assessment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "OASIS Assessment deleted successfully",
      data: deletedOASISAssessment,
    });
  } catch (error) {
    console.error("Error deleting OASIS Assessment:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete OASIS Assessment",
      error: error.message,
    });
  }
};



const nodemailer = require("nodemailer");
const Email = require("../model/Email");

// Send an email with title, description, and file
exports.sendEmail = async (req, res) => {
  try {
    const { title, description, recipient } = req.body;
    const file = req.file ? req.file.path : null;

    // Create a new email record in the database
    const emailData = new Email({ title, description, file, recipient });
    await emailData.save();

    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASSWORD, // your email password
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipient,
      subject: title,
      text: description,
      attachments: file
        ? [
            {
              path: file,
            },
          ]
        : [],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: error.message,
    });
  }
};
