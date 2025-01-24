const mongoose = require("mongoose");

const nursingVisitSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: [
        "RNVisit",
        "SkilledNurseVisit",
        "SN_BMP",
        "SN_CBC",
        "SN_Diabetic_Daily",
        "SN_IV_Insertion",
        "SN_B12_INJECTION",
        "SN_Haldol_Inj",
        "SN_Insulin_AM",
        "SN_Insulin_HS",
        "SN_Insulin_PM",
        "SN_Labs",
        "SN_WoundCare_Visit",
      ],
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
      start: { type: Date },
      end: { type: Date },
    },
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
      description: { type: String },
      location: { type: String },
      intensity: { type: String },
      frequency: { type: String },
      duration: { type: String },
    },
    infectionControl: {
      precautionsObserved: { type: Boolean, default: false, default: false },
      sharpsDisposed: { type: Boolean, default: false, default: false },
      wasteDisposed: { type: Boolean, default: false, default: false },
      patientKnowledge: { type: Boolean, default: false, default: false },
    },
    homeboundStatus: {
      taxingEffort: { type: Boolean, default: false, default: false },
      needsAssistance: { type: Boolean, default: false, default: false },
      unsafeToLeave: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    planOfCare: {
      reviewed: { type: Boolean, default: false, default: false },
      newOrdersRequired: { type: Boolean, default: false, default: false },
    },
    caregiverInvolvement: {
      available: { type: Boolean, default: false, default: false },
      willingAble: { type: Boolean, default: false, default: false },
      willingUnable: { type: Boolean, default: false, default: false },
      unwilling: { type: Boolean, default: false, default: false },
      barriers: { type: String },
    },
    dischargePlanning: {
      discussed: { type: Boolean, default: false, default: false },
      newOrders: { type: Boolean, default: false, default: false },
    },
    careCoordination: {
      coordinatedWith: { type: String },
      regarding: { type: String },
    },
    interventions: { type: String },
    responseToCare: { type: String },
    medicalNecessity: { type: String },
    visitNarrative: { type: String },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const NursingVisit = mongoose.model("NursingVisitspecial", nursingVisitSchema);

module.exports = NursingVisit;
