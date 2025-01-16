const mongoose = require("mongoose");

const foleyCathChangeSchema = mongoose.Schema(
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
    visitStartTime: { type: String }, // e.g., "10:00 AM"
    visitEndTime: { type: String }, // e.g., "11:00 AM"
    surcharge: { type: String }, // Optional surcharge amount
    mileage: { type: Number }, // Distance traveled
    travelStartTime: { type: String },
    travelEndTime: { type: String },
    primaryDiagnosis: { type: String },
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
    infectionControl: {
      precautionsObserved: { type: Boolean, default: true },
      sharpsDisposed: { type: Boolean, default: true },
      soiledWasteDisposed: { type: Boolean, default: true },
      knowledgeDemonstrated: { type: Boolean, default: false },
    },
    mobility: {
      ambulatory: { type: Boolean, default: false },
      assistiveDevice: { type: String }, // e.g., "Cane", "Walker"
      wheelchair: { type: Boolean, default: false },
    },
    homeboundNarrative: { type: String },
    planOfCare: {
      reviewed: { type: Boolean, default: false },
      changesRequired: { type: Boolean, default: false },
    },
    dischargePlanning: {
      discussed: { type: Boolean, default: false },
      noticesGiven: { type: Boolean, default: false },
    },
    caregiverInvolvement: {
      available: { type: Boolean, default: false },
      willing: { type: Boolean, default: false },
    },
    interventions: { type: String },
    responseToCare: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const FoleyCathChange = mongoose.model("FoleyCathChange", foleyCathChangeSchema);

module.exports = FoleyCathChange;
