const mongoose = require("mongoose");

const nurseVisitSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["SN_Psychiatric_Nurse_Visit", "SNPediatricHourly", "SNPediatricVisit"],
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
    visitDate: { type: Date, required: true },
    timeIn: { type: String },
    timeOut: { type: String },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    primaryDiagnosis: { type: String },
    secondaryDiagnosis: { type: String },
    vitalSigns: {
      temperature: { type: String },
      respiration: { type: String },
      apicalPulse: { type: String },
      radialPulse: { type: String },
      bloodPressure: {
        lying: { type: String },
        sitting: { type: String },
        standing: { type: String },
      },
      pulseOximetry: { type: String },
      weight: { type: String },
      comments: { type: String },
    },
    painProfile: {
      intensity: { type: String },
      description: { type: String },
      duration: { type: String },
      primarySite: { type: String },
      frequency: { type: String },
      managementEffectiveness: { type: String },
    },
    mentalStatus: {
      overallStatus: { type: String },
      levelOfConsciousness: { type: String },
      hallucinationsDelusions: { type: Boolean },
      suicidalTendencies: { type: Boolean },
      orientedTo: {
        time: { type: Boolean, default: false },
        place: { type: Boolean, default: false },
        person: { type: Boolean, default: false },
      },
    },
    infectionControl: {
      universalPrecautions: { type: Boolean, default: false },
      sharpsWasteDisposal: { type: Boolean, default: false },
      newInfectionDetected: { type: Boolean, default: false },
      comments: { type: String },
    },
    homeboundStatus: {
      taxingEffortToLeaveHome: { type: Boolean, default: false },
      needsAssistance: { type: Boolean, default: false },
      severeDyspnea: { type: Boolean, default: false },
      unsafeToLeaveHome: { type: Boolean, default: false },
      medicalRestrictions: { type: Boolean, default: false },
      other: { type: String },
    },
    interventions: {
      description: { type: String },
      teachingTopics: { type: [String] },
    },
    careCoordination: {
      coordinatedWith: { type: String },
      regarding: { type: String },
    },
    dischargePlanning: {
      discussed: { type: Boolean, default: false },
      newOrders: { type: Boolean, default: false },
      dischargeReason: { type: String },
      dischargePlan: { type: String },
    },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const NurseVisit = mongoose.model("NurseVisitpsy", nurseVisitSchema);

module.exports = NurseVisit;
