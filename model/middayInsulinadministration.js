const mongoose = require("mongoose");

const middayInsulinAdministrationSchema = mongoose.Schema(
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
    surcharge: { type: String },
    mileage: { type: Number },
    travelStartTime: { type: String },
    travelEndTime: { type: String },
    primaryDiagnosis: { type: String, required: true },
    secondaryDiagnosis: { type: String },
    vitalSigns: {
      neurological: { type: String },
      respiratory: { type: String },
      cardiovascular: { type: String },
      gastrointestinal: { type: String },
      genitourinary: { type: String },
      musculoskeletal: { type: String },
      integumentary: { type: String },
    },
    painProfile: {
      hasPain: { type: Boolean, default: false },
      description: { type: String },
    },
    endocrineHematologic: {
      anemia: { type: Boolean, default: false },
      anticoagulantUse: { type: Boolean, default: false },
      cancer: { type: Boolean, default: false },
      hypothyroidism: { type: Boolean, default: false },
      hyperthyroidism: { type: Boolean, default: false },
    },
    nutrition: {
      poorAppetite: { type: Boolean, default: false },
      poorHydration: { type: Boolean, default: false },
      soreThroat: { type: Boolean, default: false },
      tubeFeedingPresent: { type: Boolean, default: false },
      tpnOrLipids: { type: Boolean, default: false },
      weightLoss: { type: Boolean, default: false },
      weightGain: { type: Boolean, default: false },
    },
    infectionControl: {
      universalPrecautionsObserved: { type: Boolean, default: false },
      sharpsDisposed: { type: Boolean, default: false },
      soiledWasteDisposed: { type: Boolean, default: false },
      patientDemonstratesKnowledge: { type: Boolean, default: false },
    },
    homeboundStatus: {
      narrative: { type: String },
    },
    planOfCare: {
      reviewed: { type: Boolean, default: false },
      newOrdersRequired: { type: Boolean, default: false },
    },
    caregiverInvolvement: {
      availability: { type: Boolean, default: false },
      willingAble: { type: Boolean, default: false },
      willingUnable: { type: Boolean, default: false },
      unwilling: { type: Boolean, default: false },
      barriers: { type: String },
    },
    dischargePlanning: {
      discussed: { type: Boolean, default: false },
      noticesGiven: { type: Boolean, default: false },
    },
    careCoordination: {
      coordinatedWith: { type: String },
      regarding: { type: String },
    },
    healthManagement: {
      medicationsReconciled: { type: Boolean, default: false },
      newMedications: { type: Boolean, default: false },
      medicationIssuesIdentified: { type: Boolean, default: false },
      pillBoxPreFilled: { type: Boolean, default: false },
      insulinSyringesPreFilled: { type: Boolean, default: false },
    },
    interventions: { type: String },
    responseToCare: { type: String },
    visitNarrative: { type: String },
    medicalNecessity: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const MiddayInsulinAdministration = mongoose.model(
  "MiddayInsulinAdministration",
  middayInsulinAdministrationSchema
);

module.exports = MiddayInsulinAdministration;
