const mongoose = require("mongoose");

const nurseVisitAdvancedSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ST_TelehealthVisit", "Telehealth_Notes", "Telehealth_PT"],
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // References the "User" model
      required: false,  // Optional, can be removed if you want it to be required
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    physicianLastVisit: {
      type: Date,
    },
    visitStartTime: {
      type: String,
    },
    visitEndTime: {
      type: String,
    },
    primaryDiagnosis: {
      type: String,
    },
    secondaryDiagnosis: {
      type: String,
    },
    vitalSigns: {
      temperature: { type: String },
      respirationRate: { type: String },
      heartRate: { type: String },
      bloodPressure: { type: String },
      oxygenSaturation: { type: String },
    },
    telehealthAssessment: {
      visitType: {
        type: String,
        enum: ["Televisit", "Telephone Monitoring"],
      },
      diseaseProcess: {
        type: String,
        enum: [
          "COVID-19",
          "COPD",
          "Diabetes",
          "Heart Failure",
          "Therapy",
          "Other",
        ],
      },
    },
    healthManagement: {
      medicationsReconciled: { type: Boolean, default: false, default: false },
      newOrChangedMedications: { type: Boolean, default: false, default: false },
      medicationIssuesIdentified: { type: Boolean, default: false, default: false },
      pillBoxPreFilled: { type: Boolean, default: false, default: false },
      insulinSyringesPreFilled: { type: Boolean, default: false, default: false },
      homeEnvironmentAltered: { type: Boolean, default: false, default: false },
      suspectedAbuse: { type: Boolean, default: false, default: false },
      signsOfHeartFailure: { type: Boolean, default: false, default: false },
      signsOfOtherCoMorbidity: { type: Boolean, default: false, default: false },
    },
    interventions: {
      type: String,
    },
    responseToCare: {
      type: String,
    },
    clinicianSignature: {
      type: String,
    },
    signatureDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const NurseVisitAdvanced = mongoose.model(
  "NurseVisitAdvanced",
  nurseVisitAdvancedSchema
);

module.exports = NurseVisitAdvanced;
