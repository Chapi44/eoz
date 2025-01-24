const mongoose = require("mongoose");

const medicationsSchema = new mongoose.Schema({
  medicationAdministration: {
    adminTime: { type: String },
    route: { type: String },
    location: { type: String },
    medicationType: { type: String },
    frequency: { type: String },
    dose: { type: String },
    patientResponse: { type: String },
    PRNReason: { type: String },
    comment: { type: String },
  },
  medicationStatus: {
    medications: {
      received: { type: Boolean, default: false },
      reconciled: { type: Boolean, default: false },
      issuesIdentified: { type: Boolean, default: false },
      adequateUse: { type: Boolean, default: false },
      PRNUse: { type: Boolean, default: false },
      initialPrescriptionsFilled: { type: Boolean, default: false },
      infusion: { type: Boolean, default: false },
    },
    pharmacyInfo: { type: String },
  },
  drugRegimenReview: {
    significantMedicationIssues: { type: String }, // Values like "No issues", "Yes - issues found", etc.
    followUp: { type: String }, // Values like "No", "Yes", etc.
    highRiskEducation: { type: String }, // Values like "No", "Yes", etc.
  },
  medicationManagement: {
    oralMedications: {
      ability: { type: String }, // E.g., "Able to take medications at correct time"
    },
    injectableMedications: {
      ability: { type: String }, // E.g., "Able to independently take correct medication"
    },
  },
  highRiskDrugs: {
    isTaking: { type: Boolean, default: false },
    categories: {
      antipsychotic: { type: Boolean, default: false },
      anticoagulant: { type: Boolean, default: false },
      antibiotic: { type: Boolean, default: false },
      opioid: { type: Boolean, default: false },
      antiepileptic: { type: Boolean, default: false },
      hypoglycemics: { type: Boolean, default: false },
      noneOfTheAbove: { type: Boolean, default: false },
    },
    indicationNeeded: { type: Boolean, default: false },
  },
  comments: { type: String },
  ordersForDisciplineAndTreatment: {
    medicationManagement: { type: Boolean, default: false },
    injections: { type: Boolean, default: false },
    parenteralTherapy: { type: Boolean, default: false },
    diagnosticTesting: { type: Boolean, default: false },
  },
}, { timestamps: true });

const Medications = mongoose.model("Medications", medicationsSchema);

module.exports = Medications;
