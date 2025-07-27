const mongoose = require("mongoose");

const nurseVisitAdvancedSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "ST_TelehealthVisit",
        "Telehealth_Notes",
        "Telehealth_PT",
        "OT Telehealth",
      ],
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the "User" model
      required: false, // Optional, can be removed if you want it to be required
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
      temperature: {
        value: { type: Number },
        route: { type: String }, // oral, axillary, etc
      },
      respirations: { type: Number },
      o2Saturation: { type: Number },
      pulseRate: {
        value: { type: Number },
        method: { type: String },
        location: { type: String },
      },
      bloodPressure: {
        left: {
          lying: { type: String }, // e.g. "120/80"
          sitting: { type: String },
          standing: { type: String },
        },
        right: {
          lying: { type: String },
          sitting: { type: String },
          standing: { type: String },
        },
      },
      bmi: {
        weight: { type: Number },
        height: { type: Number },
        calculated: { type: String }, // calculated BMI value or N/A
      },
      unableToCollectAllVitals: { type: Boolean, default: false },
      notified: {
        physician: { type: Boolean, default: false },
        clinicalManager: { type: Boolean, default: false },
      },
    },
    telehealthAssessment: {
      visitType: [
        {
          type: String,
          // Optionally, you can validate allowed options here
        },
      ],
      diseaseProcesses: [
        {
          name: { type: String }, // E.g., "COVID-19", "COPD", "Diabetes", etc.
          notes: { type: String }, // Free text, assessment/subjective, etc.
        },
      ],
    },
    healthManagement: {
      medicationsReconciled: { type: Boolean, default: false, default: false },
      newOrChangedMedications: {
        type: Boolean,
        default: false,
        default: false,
      },
      medicationIssuesIdentified: {
        checked: { type: Boolean, default: false },
        issuesOptions: [{ type: String }],
        medicationDescription: { type: String, default: "" },
        notifications: [{ type: String }],
      },

      pillBoxPreFilled: { type: Boolean, default: false, default: false },
      insulinSyringesPreFilled: {
        type: Boolean,
        default: false,
        default: false,
      },
      homeEnvironmentAltered: { type: String },
      suspectedAbuse: { type: String },
    },
    barriersToHealth: {
      type: String,
    },
    exhibitingHeartFailureSymptoms: { type: String },
    exhibitingOtherCoMorbiditySymptoms: { type: String },
    interventions: { type: String },
    responseToCare: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const NurseVisitAdvanced = mongoose.model(
  "NurseVisitAdvanced",
  nurseVisitAdvancedSchema
);

module.exports = NurseVisitAdvanced;
