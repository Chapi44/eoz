const mongoose = require("mongoose");

const incidentReportSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
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
      type: Boolean,
      default: false,
    },
    physicianNotified: {
      type: Boolean,
      default: false,
    },
    individualsInvolved: {
      patient: { type: Boolean, default: false },
      other: { type: Boolean, default: false },
      caregiver: { type: Boolean, default: false },
      employeeOrContractor: { type: Boolean, default: false },
    },
    typeOfIncident: {
      abuseOrNeglect: { type: Boolean, default: false },
      fallWithoutInjury: { type: Boolean, default: false },
      fallWithInjury: { type: Boolean, default: false },
      nearFall: { type: Boolean, default: false },
      patientCareError: { type: Boolean, default: false },
      complaint: { type: Boolean, default: false },
      medicationIssue: { type: Boolean, default: false },
      physicalAltercation: { type: Boolean, default: false },
      verbalAltercation: { type: Boolean, default: false },
      dmeMalfunction: { type: Boolean, default: false },
      missingOrDamagedProperty: { type: Boolean, default: false },
      phiBreach: { type: Boolean, default: false },
      serviceFailure: { type: Boolean, default: false },
      suicideAttemptOrCompletion: { type: Boolean, default: false },
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
      type: Boolean,
      default: false,
    },
    witnessName: {
      type: String,
    },
    sentinelEvent: {
      occurred: { type: Boolean, default: false },
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
      firstAidProvided: { type: Boolean, default: false },
      patientEducationProvided: { type: Boolean, default: false },
      planOfCareUpdated: { type: Boolean, default: false },
      physicianContacted: { type: Boolean, default: false },
      referredToEmergentCare: { type: Boolean, default: false },
      reportedToAPS: { type: Boolean, default: false },
      visitFrequenciesAdjusted: { type: Boolean, default: false },
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
