const mongoose = require("mongoose");

const lvnHourlyVisitSchema = mongoose.Schema(
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
    visitDate: {
      type: Date,
      required: true,
    },
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
      hasPain: { type: Boolean, default: false, default: false },
      description: { type: String },
    },
    endocrineHematologic: {
      anemia: { type: Boolean, default: false, default: false },
      anticoagulantUse: { type: Boolean, default: false, default: false },
      cancer: { type: Boolean, default: false, default: false },
      hypothyroidism: { type: Boolean, default: false, default: false },
      hyperthyroidism: { type: Boolean, default: false, default: false },
    },
    nutrition: {
      poorAppetite: { type: Boolean, default: false, default: false },
      poorHydration: { type: Boolean, default: false, default: false },
      soreThroat: { type: Boolean, default: false, default: false },
      tubeFeedingPresent: { type: Boolean, default: false, default: false },
      tpnOrLipids: { type: Boolean, default: false, default: false },
      weightLoss: { type: Boolean, default: false, default: false },
      weightGain: { type: Boolean, default: false, default: false },
    },
    infectionControl: {
      universalPrecautionsObserved: { type: Boolean, default: false, default: false },
      sharpsDisposed: { type: Boolean, default: false, default: false },
      soiledWasteDisposed: { type: Boolean, default: false, default: false },
      patientDemonstratesKnowledge: { type: Boolean, default: false, default: false },
    },
    homeboundStatus: {
      narrative: { type: String },
    },
    planOfCare: {
      reviewed: { type: Boolean, default: false, default: false },
      newOrdersRequired: { type: Boolean, default: false, default: false },
    },
    caregiverInvolvement: {
      availability: { type: Boolean, default: false, default: false },
      willingAble: { type: Boolean, default: false, default: false },
      willingUnable: { type: Boolean, default: false, default: false },
      unwilling: { type: Boolean, default: false, default: false },
      barriers: { type: String },
    },
    dischargePlanning: {
      discussed: { type: Boolean, default: false, default: false },
      noticesGiven: { type: Boolean, default: false, default: false },
    },
    careCoordination: {
      coordinatedWith: { type: String },
      regarding: { type: String },
    },
    healthManagement: {
      medicationsReconciled: { type: Boolean, default: false, default: false },
      newMedications: { type: Boolean, default: false, default: false },
      medicationIssuesIdentified: { type: Boolean, default: false, default: false },
      pillBoxPreFilled: { type: Boolean, default: false, default: false },
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

const LVNHourlyVisit = mongoose.model("LVNHourlyVisit", lvnHourlyVisitSchema);

module.exports = LVNHourlyVisit;
