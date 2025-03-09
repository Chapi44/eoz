const mongoose = require("mongoose");

const incidentReportSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // References the "User" model
      required: false,  // Optional, can be removed if you want it to be required
    },

    dateOfIncident: {
      type: Date,
      required: true,
    },
    timeOfIncident: {
      type: String,
    },
    mrn: {
      type: String,
    },
    primaryDiagnosis: {
      type: String,
    },
    secondaryDiagnosis: {
      type: String,
    },
    clinicalManager: {
      type: String,
    },
    caseManager: {
      type: String,
    },
    attendingPhysician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    familyNotified: {
      type: Boolean, default: false,
      default: false,
    },
    physicianNotified: {
      type: Boolean, default: false,
      default: false,
    },
    individualsInvolved: {
      patient: { type: Boolean, default: false, default: false },
      other: { type: Boolean, default: false, default: false },
      caregiver: { type: Boolean, default: false, default: false },
      employeeOrContractor: { type: Boolean, default: false, default: false },
    },
    typeOfIncident: {
      abuseOrNeglect: { type: Boolean, default: false, default: false },
      fallWithoutInjury: { type: Boolean, default: false, default: false },
      fallWithInjury: { type: Boolean, default: false, default: false },
      nearFall: { type: Boolean, default: false, default: false },
      patientCareError: { type: Boolean, default: false, default: false },
      complaint: { type: Boolean, default: false, default: false },
      medicationIssue: { type: Boolean, default: false, default: false },
      physicalAltercation: { type: Boolean, default: false, default: false },
      verbalAltercation: { type: Boolean, default: false, default: false },
      dmeMalfunction: { type: Boolean, default: false, default: false },
      missingOrDamagedProperty: { type: Boolean, default: false, default: false },
      phiBreach: { type: Boolean, default: false, default: false },
      serviceFailure: { type: Boolean, default: false, default: false },
      suicideAttemptOrCompletion: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    severityOfIncident: {
      type: String,
      enum: ["Level 1: Minor", "Level 2: Moderate", "Level 3: Major", "Level 4: Critical"],
    },
    levelOfInjury: {
      type: String,
      enum: ["Minor Injury (First Aid Only)", "Moderate Injury", "ER or Acute Care Admission", "N/A"],
    },
    wasIncidentWitnessed: {
      type: Boolean, default: false,
      default: false,
    },
    witnessName: {
      type: String,
    },
    sentinelEvent: {
      occurred: { type: Boolean, default: false, default: false },
      type: { type: String },
    },
    interventionsProvided: {
      type: [String],
      enum: [
        "Called 911 for Police Assistance",
        "Called 911 for an Ambulance",
        "CPR Provided",
        "DME Changes Made",
        "DME Changes Requested",
        "PRN Visit Made",
        "Medication Change Obtained",
        "Medication Change Requested",
        "New Medication Received",
        "New Orders Received",
        "Facility Staff Education Provided",
      ],
    },
    followUp: {
      firstAidProvided: { type: Boolean, default: false, default: false },
      patientEducationProvided: { type: Boolean, default: false, default: false },
      planOfCareUpdated: { type: Boolean, default: false, default: false },
      physicianContacted: { type: Boolean, default: false, default: false },
      referredToEmergentCare: { type: Boolean, default: false, default: false },
      reportedToAPS: { type: Boolean, default: false, default: false },
      visitFrequenciesAdjusted: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    incidentDescription: {
      type: String,
    },
    followUpComments: {
      type: String,
    },
    signature: {
      type: String,
    },
    signatureDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const IncidentReport = mongoose.model("IncidentReport", incidentReportSchema);

module.exports = IncidentReport;
