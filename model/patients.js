const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: { type: Date, required: true },
    socialSecurityNumber: { type: String },
    maritalStatus: { type: String, enum: ["Single", "Married", "Widowed", "Divorced"] },
    alternatePhone: { type: String },
    mobilePhone: { type: String },
    emailAddress: { type: String },
    pictures: {
      type: [String],
      default: "https://gratify.letsgotnt.com/uploads/profile/pictures-1713961058221.png",
    },
    primaryAddress: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      zipCode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    ethnicity: { type: [String] }, // Allows multiple selections like "Hispanic, Non-Hispanic"
    race: { type: [String] }, // Allows multiple selections like "White, Asian"
    preferredLanguage: { type: String },
    interpreterRequired: { type: Boolean, default: false },
    livingSituation: { type: String }, // E.g., Alone, With Family
    payers: {
      mbiNumber: { type: String },
      healthInsuranceClaimNumber: { type: String },
      medicaidNumber: { type: String },
      alternateMedicaidNumber: { type: String },
      verifyMedicaidEligibility: { type: Boolean, default: false },
    },
    clinicalRecords: {
      physicianName: { type: String },
      physicianNPI: { type: String },
      referralDate: { type: Date },
    },
    mrn: { type: String, required: true }, 
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patients", patientSchema);

module.exports = Patient;
