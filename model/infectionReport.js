const mongoose = require("mongoose");

const infectionReportSchema = mongoose.Schema(
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
    episode: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    startOfCareDate: { type: Date },
    primaryDiagnosis: { type: String, required: true },
    secondaryDiagnosis: { type: String },
    clinicalManager: { type: String },
    caseManager: { type: String },
    mrn: { type: String },
    dateOfInfection: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    physicianNotified: { type: Boolean, default: false, default: false },
    evaluationAndTreatment: {
      nosocomial: { type: Boolean, default: false, default: false }, // Healthcare-associated
      communityAcquired: { type: Boolean, default: false, default: false }, // Acquired after admission
      chestXRayObtained: { type: Boolean, default: false, default: false },
      chestXRayDate: { type: Date },
      labsCompleted: { type: Boolean, default: false, default: false },
      cultureCompleted: { type: Boolean, default: false, default: false },
      cultureDate: { type: Date },
      organismPresent: { type: Boolean, default: false, default: false },
      treatmentPrescribed: { type: Boolean, default: false, default: false },
      antibioticPrescribed: { type: Boolean, default: false, default: false },
    },
    typeOfInfection: {
      feverOfUndeterminedOrigin: { type: Boolean, default: false, default: false },
      catheterAssociatedUTI: { type: Boolean, default: false, default: false },
      centralVenousCatheter: { type: Boolean, default: false, default: false },
      surgicalWound: { type: Boolean, default: false, default: false },
      urinary: { type: Boolean, default: false, default: false },
      respiratory: { type: Boolean, default: false, default: false },
      gastrointestinal: { type: Boolean, default: false, default: false },
      softTissueWounds: { type: Boolean, default: false, default: false },
      piccLine: { type: Boolean, default: false, default: false },
      otherVenousAccessDevice: { type: Boolean, default: false, default: false },
      eyeEarNoseMouth: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    reportableDiseases: {
      reportableDiseasePresent: { type: Boolean, default: false, default: false },
    },
    infectionControl: {
      universalPrecautions: { type: Boolean, default: false, default: false },
      dropletPrecautions: { type: Boolean, default: false, default: false },
      isolation: { type: Boolean, default: false, default: false },
      contactPrecautions: { type: Boolean, default: false, default: false },
    },
    comments: { type: String },
    reportingClinician: {
      name: { type: String },
      date: { type: Date },
      time: { type: String },
    },
    followUp: {
      followUpDocumentationPerformed: { type: Boolean, default: false, default: false },
      followUpComments: { type: String },
    },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const InfectionReport = mongoose.model("InfectionReport", infectionReportSchema);

module.exports = InfectionReport;
