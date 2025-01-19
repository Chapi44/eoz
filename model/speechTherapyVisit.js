const mongoose = require("mongoose");

const speechTherapyVisitSchema = mongoose.Schema(
  {
    orderNumber: {
      type: String,
      default: () => `STV-${Math.floor(100000 + Math.random() * 900000)}`, // Randomly generated order number
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
    visitDate: { type: Date, required: true },
    timeIn: { type: String },
    timeOut: { type: String },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    treatmentDiagnosis: { type: String },
    subjective: { type: String },
    homeboundReason: {
      considerableEffort: { type: Boolean, default: false },
      medicalRestriction: { type: Boolean, default: false },
      needsTransferAssist: { type: Boolean, default: false },
      needsAmbulationAssist: { type: Boolean, default: false },
      needsAssistLeavingHome: { type: Boolean, default: false },
      unableUpLongPeriod: { type: Boolean, default: false },
      severeSOB: { type: Boolean, default: false },
      unsafeAlone: { type: Boolean, default: false },
    },
    skilledTreatment: {
      evaluation: { type: Boolean, default: false },
      dysphagiaTreatments: { type: Boolean, default: false },
      safeSwallowingEvaluation: { type: Boolean, default: false },
      patientFamilyEducation: { type: Boolean, default: false },
      languageDisorders: { type: Boolean, default: false },
      speechDysphagiaInstruction: { type: Boolean, default: false },
      voiceDisorders: { type: Boolean, default: false },
      auralRehabilitation: { type: Boolean, default: false },
      communicationSystem: { type: Boolean, default: false },
      articulationDisorders: { type: Boolean, default: false },
      nonOralCommunication: { type: Boolean, default: false },
      painManagement: { type: Boolean, default: false },
      alaryngealSpeechSkills: { type: Boolean, default: false },
      languageProcessing: { type: Boolean, default: false },
      foodTextureRecommendations: { type: Boolean, default: false },
      other: { type: String },
    },
    homeMaintenanceProgram: {
      copyToPatient: { type: Boolean, default: false },
      copyAttachedToChart: { type: Boolean, default: false },
    },
    assessment: { type: String },
    progress: { type: String },
    patientCaregiverResponse: { type: String },
    teaching: { type: String },
    plan: { type: String },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const SpeechTherapyVisit = mongoose.model("SpeechTherapyVisit", speechTherapyVisitSchema);

module.exports = SpeechTherapyVisit;
