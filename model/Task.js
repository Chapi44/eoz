const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "pastdue", "ongoing"],
      default: "pending",
    },
    comment: {
      type: String,
      default: "",
    },
    shift: {
      type: Boolean, default: false,
      default: false,
    },
    nurseStatus: {
      type: String,
      enum: ["available", "full"],
      default: "available",
    },
    personalNote: {
      type: String,
      default: "",
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    nursesigniturepictures: {
      type: [String],
      default: [],
    },
    patientsigniturepictures: {
      type: [String],
      default: [],
    },
    location: {
      type: [String], // Location as an array of strings, e.g., ["latitude", "longitude"]
      default: [],
    },
    price: {
      type: Number, // Added price field
      default: 0, // Default value for the price
    },
    taskType: {
      type: String,
      enum: [
        "Aide Visit",
        "AideSupervisory",
        "CommunicationNote",
        "CoordinationOfCare",
        "Doctor Order",
        "FaceToFace",
        "FoleyCathChange",
        "HHA Plan of Care",
        "Incident Report",
        "Infection Report",
        "INFUSION THERAPY",
        "LPN Supervisory",
        "LPN SupervisoryVisit",
        "LVNHourly",
        "LVNVisit",
        "Midday Insulin Administration",
        "OASIS E1 DISCHARGE",
        "OASIS TRANSFER",
        "OT Telehealth",
        "OTReEval",
        "OTVisit",
        "PRN Nursing Visit",
        "Psych Nurse Assessment",
        "PT Visit",
        "PTEval",
        "PTReassessment",
        "PTWithINR",
        "Recertification E-1",
        "Resumption Of Care",
        "RNVisit",
        "SkilledNurseVisit",
        "SN BMP",
        "SN CBC",
        "SN Diabetic Daily",
        "SN IV Insertion",
        "SN_Psychiatric_Nurse_Visit",
        "SNB12INJECTION",
        "SNHaldolInj",
        "SNInsulinAM",
        "SNInsulinHS",
        "SNInsulinPM",
        "SNLabs",
        "SNPediatric Hourly",
        "SNPediatricVisit",
        "SNWoundCare Visit",
        "Speech Therapy Visit",
        "ST ReEval",
        "ST TelehealthVisit",
        "Telehealth Notes",
        "Telehealth PT"
      ],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
