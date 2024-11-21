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
      received: { type: Boolean },
      reconciled: { type: Boolean },
      issuesIdentified: { type: Boolean },
      adequateUse: { type: Boolean },
      PRNUse: { type: Boolean },
      initialPrescriptionsFilled: { type: Boolean },
      infusion: { type: Boolean },
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
    isTaking: { type: Boolean },
    categories: {
      antipsychotic: { type: Boolean },
      anticoagulant: { type: Boolean },
      antibiotic: { type: Boolean },
      opioid: { type: Boolean },
      antiepileptic: { type: Boolean },
      hypoglycemics: { type: Boolean },
      noneOfTheAbove: { type: Boolean },
    },
    indicationNeeded: { type: Boolean },
  },
  comments: { type: String },
  ordersForDisciplineAndTreatment: {
    medicationManagement: { type: Boolean },
    injections: { type: Boolean },
    parenteralTherapy: { type: Boolean },
    diagnosticTesting: { type: Boolean },
  },
}, { timestamps: true });

const Medications = mongoose.model("Medications", medicationsSchema);

module.exports = Medications;
