const mongoose = require("mongoose");

const infusionTherapySchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    physicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
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
      universalPrecautions: { type: Boolean, default: false },
      sharpsDisposed: { type: Boolean, default: false },
      soiledWasteDisposed: { type: Boolean, default: false },
      patientDemonstratesKnowledge: { type: Boolean, default: false },
    },
    mobility: {
      ambulatory: { type: Boolean, default: false },
      ambulatoryWithDevice: { type: Boolean, default: false },
      bedfast: { type: Boolean, default: false },
      chairfast: { type: Boolean, default: false },
      assistiveDevice: { type: String }, // e.g., "Cane", "Walker"
      wheelchair: { type: Boolean, default: false },
    },
    caregiverInvolvement: {
      available: { type: Boolean, default: false },
      willingAndAble: { type: Boolean, default: false },
      willingButUnable: { type: Boolean, default: false },
      unwilling: { type: Boolean, default: false },
      barriers: { type: String },
    },
    planOfCare: {
      reviewed: { type: Boolean, default: false },
      changesRequired: { type: Boolean, default: false },
    },
    dischargePlanning: {
      discussed: { type: Boolean, default: false },
      noticesGiven: { type: Boolean, default: false },
    },
    interventions: { type: String },
    responseToCare: { type: String },
    visitNarrative: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const InfusionTherapy = mongoose.model("InfusionTherapy", infusionTherapySchema);

module.exports = InfusionTherapy;
