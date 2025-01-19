const mongoose = require("mongoose");

const otTelehealthSchema = mongoose.Schema(
  {
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
    visitDate: { type: Date, required: true },
    physicianLastVisit: { type: Date },
    visitStartTime: { type: String },
    visitEndTime: { type: String },
    primaryDiagnosis: { type: String, required: true },
    secondaryDiagnosis: { type: String },
    vitalSigns: {
      type: Map,
      of: String, // For flexible key-value pairs like blood pressure, temperature, etc.
    },
    telehealthAssessment: {
      visitType: {
        type: String,
        enum: ["Televisit (Two-Way Communication)", "Telephone Monitoring"],
        required: true,
      },
      diseaseProcess: {
        type: String,
        enum: ["COVID-19", "COPD", "Diabetes", "Heart Failure", "Therapy", "Other"],
        required: true,
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
    },
    barriersToHealth: {
      exhibitingHeartFailureSymptoms: { type: Boolean, default: false },
      exhibitingOtherCoMorbiditySymptoms: { type: Boolean, default: false },
    },
    interventions: { type: String },
    responseToCare: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const OTTelehealth = mongoose.model("OTTelehealth", otTelehealthSchema);

module.exports = OTTelehealth;

