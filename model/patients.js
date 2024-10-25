const mongoose = require("mongoose");

const patientSchema = mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    gender: { type: String },
    dob: { type: Date },
    socialSecurityNumber: { type: String },
    maritalStatus: { type: String },
    alternatePhone: { type: String },
    mobilePhone: { type: String },
    emailAddress: { type: String },
    pictures: {
      type: [String],
      default: "https://gratify.letsgotnt.com/uploads/profile/pictures-1713961058221.png",
    },
    clinicalManager: { type: String },  
    caseManager: { type: String },     
    primaryAddress: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      zipCode: { type: String },
      state: { type: String },
      country: { type: String },
    },
    mailingAddress: {
      addressLine1: { type: String },
      addressLine2: { type: String },
      zipCode: { type: String },
      state: { type: String },
      country: { type: String },
    },
    payers: {
      mbiNumber: { type: String },
      healthInsuranceClaimNumber: { type: String },
      medicaidNumber: { type: String },
      alternateMedicaidNumber: { type: String },
      verifyMedicaidEligibility: { type: Boolean },
    },
    appointment: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    appointmentTimes: [{
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      startTime: { type: String },
      endTime: { type: String },
    }],
    location: {
      type: [String],
      // e.g., ["latitude", "longitude", "address"] if needed
    },
  },
  {
    timestamps: true,
  }
);

const Patient = mongoose.model("Patients", patientSchema);

module.exports = Patient;
