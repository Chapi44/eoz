const mongoose = require("mongoose");

const nurseVisitAdvancedSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["ST_TelehealthVisit", "Telehealth_Notes", "Telehealth_PT"],
      required: true,
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
      medicationsReconciled: { type: Boolean, default: false },
      newOrChangedMedications: { type: Boolean, default: false },
      medicationIssuesIdentified: { type: Boolean, default: false },
      pillBoxPreFilled: { type: Boolean, default: false },
      insulinSyringesPreFilled: { type: Boolean, default: false },
      homeEnvironmentAltered: { type: Boolean, default: false },
      suspectedAbuse: { type: Boolean, default: false },
      signsOfHeartFailure: { type: Boolean, default: false },
      signsOfOtherCoMorbidity: { type: Boolean, default: false },
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
