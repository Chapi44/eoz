const mongoose = require("mongoose");

const coordinationOfCareSchema = mongoose.Schema(
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
    visitDate: { type: Date, required: true },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    primaryDiagnosis: { type: String },
    secondaryDiagnosis: { type: String },
    functionalLimitations: {
      amputation: { type: Boolean, default: false },
      bowelIncontinence: { type: Boolean, default: false },
      contracture: { type: Boolean, default: false },
      hearing: { type: Boolean, default: false },
      paralysis: { type: Boolean, default: false },
      endurance: { type: Boolean, default: false },
      ambulation: { type: Boolean, default: false },
      speech: { type: Boolean, default: false },
      legallyBlind: { type: Boolean, default: false },
      dyspnea: { type: Boolean, default: false },
      other: { type: String },
    },
    patientCondition: {
      stable: { type: Boolean, default: false },
      improved: { type: Boolean, default: false },
      unchanged: { type: Boolean, default: false },
      unstable: { type: Boolean, default: false },
      declined: { type: Boolean, default: false },
    },
    servicesProvided: {
      sn: { type: Boolean, default: false }, // Skilled Nursing
      pt: { type: Boolean, default: false }, // Physical Therapy
      ot: { type: Boolean, default: false }, // Occupational Therapy
      st: { type: Boolean, default: false }, // Speech Therapy
      msw: { type: Boolean, default: false }, // Medical Social Worker
      hha: { type: Boolean, default: false }, // Home Health Aide
      other: { type: String },
    },
    vitalSignRanges: {
      sbp: { min: { type: Number }, max: { type: Number } }, // Systolic Blood Pressure
      dbp: { min: { type: Number }, max: { type: Number } }, // Diastolic Blood Pressure
      hr: { min: { type: Number }, max: { type: Number } },  // Heart Rate
      resp: { min: { type: Number }, max: { type: Number } }, // Respiratory Rate
      temp: { min: { type: Number }, max: { type: Number } }, // Temperature
      weight: { min: { type: Number }, max: { type: Number } }, // Weight
      bg: { min: { type: Number }, max: { type: Number } },    // Blood Glucose
    },
    homeBoundStatus: {
      considerableEffort: { type: Boolean, default: false },
      requiresAssistance: { type: Boolean, default: false },
      severeDyspnea: { type: Boolean, default: false },
      unsafeUnassisted: { type: Boolean, default: false },
      psychiatricImpairments: { type: Boolean, default: false },
      medicalRestrictions: { type: Boolean, default: false },
      other: { type: String },
    },
    homeEnvironment: { type: String },
    transferFacility: {
      name: { type: String },
      phone: { type: String },
      contactPerson: { type: String },
      servicesProvided: { type: String },
    },
    summaryOfCare: { type: String }, // Summary of care provided
    pocSentWithPatient: { type: Boolean, default: false }, // Plan of Care sent with the patient
    medicationSentWithPatient: { type: Boolean, default: false },
    signature: { type: String }, // RN signature
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const CoordinationOfCare = mongoose.model("CoordinationOfCare", coordinationOfCareSchema);

module.exports = CoordinationOfCare;
