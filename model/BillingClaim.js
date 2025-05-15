const mongoose = require("mongoose");

const billingClaimSchema = new mongoose.Schema({

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
adminId: {
  type: mongoose.Schema.Types.ObjectId, 
  ref: "User",  // References the "User" model
  required: false,  // Optional, can be removed if you want it to be required
},
  // Section 1-7
  patientControlNumber: String,       // 3a
  medicalRecordNumber: String,        // 3b
  typeOfBill: String,                 // 4
  federalTaxNumber: String,           // 5
  statementPeriod: {
    from: Date,                       // 6 FROM
    through: Date,                    // 6 THROUGH
  },

  // Patient Info (Boxes 8-11)
  patientName: String,                // 8
  patientAddress: {
    type: new mongoose.Schema({
      line1: String,
      line2: String,
      city: String,
      state: String,
      zip: String
    }, { _id: false })
  },
  patientBirthDate: Date,            // 10
  patientSex: String,                // 11 (M/F/U)

  // Admission Info (Boxes 12-17)
  admission: {
    type: new mongoose.Schema({
      date: Date,
      hour: String,
      type: String,
      source: String,
      dischargeHour: String,
      patientStatus: String
    }, { _id: false })
  },

  // Condition Codes (Boxes 18–28)
  conditionCodes: [String],

  // Accident State
  accidentState: String,             // 29

  // Occurrence Codes & Dates (Boxes 31–34)
  occurrences: [{
    code: String,
    date: Date
  }],

  // Occurrence Span Codes (Boxes 35–36)
  occurrenceSpans: [{
    code: String,
    from: Date,
    through: Date
  }],

  // Value Codes & Amounts (Boxes 39–41)
  valueCodes: [{
    code: String,
    amount: Number
  }],

  // Revenue Codes Table (Boxes 42–49)
  revenueLines: [{
    revenueCode: String,            // 42
    description: String,            // 43
    hcpcsCode: String,              // 44
    serviceDate: Date,              // 45
    serviceUnits: Number,           // 46
    totalCharges: Number,           // 47
    nonCoveredCharges: Number       // 48
  }],

  // Payer Info (Boxes 50–65)
  payers: [{
    name: String,                   // 50
    healthPlanId: String,          // 51
    releaseInfoCode: String,       // 52
    assignBenefits: Boolean,       // 53
    priorPayments: Number,         // 54
    estimatedAmountDue: Number,    // 55
    npi: String,                    // 56
    otherProviderId: String,       // 57
    insuredName: String,           // 58
    patientRelationship: String,   // 59
    insuredId: String,             // 60
    groupName: String,             // 61
    insuranceGroupNumber: String   // 62
  }],

  // Authorization, Document Control, Employer (Boxes 63–65)
  treatmentAuthorizationCodes: [String], // 63
  documentControlNumber: String,         // 64
  employerName: String,                  // 65

  // Diagnoses (Boxes 66–67A-Q)
  diagnosisCodes: [String],             // Primary and others

  // Admit and Reason Diagnoses (Boxes 69–70)
  admitDiagnosis: String,
  patientReasonDiagnosis: [String],

  // Procedures (Box 74–74e)
  procedures: [{
    code: String,
    date: Date
  }],

  // PPS and ECI (Boxes 71–72)
  ppsCode: String,
  eciCode: String,

  // Physicians (Boxes 76–79)
  attendingPhysician: {
    type: new mongoose.Schema({
      lastName: String,
      firstName: String,
      npi: String,
      qualifier: String
    }, { _id: false })
  },
  operatingPhysician: {
    lastName: String,
    firstName: String,
    npi: String,
    qualifier: String
  },
  otherPhysicians: [{
    lastName: String,
    firstName: String,
    npi: String,
    qualifier: String
  }],

  // Remarks & Codes (Box 80, 81CC)
  remarks: String,
  codeCode81CC: [String], // a-d

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("BillingClaim", billingClaimSchema);
