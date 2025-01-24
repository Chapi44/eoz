const mongoose = require("mongoose");

const ptReassessmentSchema = mongoose.Schema(
  {
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
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timeIn: { type: String },
    timeOut: { type: String },
    reassessmentType: { type: String },
    associatedMileage: { type: String },
    surcharge: { type: String },
    vitalSigns: {
      sbp: { type: String },
      dbp: { type: String },
      heartRate: { type: String },
      respiratoryRate: { type: String },
      temperature: { type: String },
      weight: { type: String },
      oxygenSaturation: { type: String },
    },
    mentalAssessment: {
      orientation: { type: String },
      levelOfConsciousness: { type: String },
      comments: { type: String },
    },
    medicalDiagnosis: {
      primary: { type: String },
      onset: { type: Date },
    },
    ptDiagnosis: {
      primary: { type: String },
      onset: { type: Date },
    },
    painAssessment: {
      location: { type: String },
      level: { type: Number },
      increasedBy: { type: String },
      relievedBy: { type: String },
      comments: { type: String },
    },
    dme: {
      available: { type: String },
      needs: { type: String },
      suggestions: { type: String },
    },
    livingSituation: {
      dwellingLevel: { type: String, enum: ["One", "Multiple"] },
      stairs: { type: Boolean, default: false },
      numberOfSteps: { type: Number },
      livesWith: { type: [String] }, // ["Alone", "Family", "Friends", "Significant Other"]
      caregiverSupport: {
        willing: { type: Boolean, default: false },
        limited: { type: Boolean, default: false },
        unavailable: { type: Boolean, default: false },
      },
      homeSafetyBarriers: { type: String },
    },
    physicalAssessment: {
      speech: { type: String },
      vision: { type: String },
      hearing: { type: String },
      skin: { type: String },
      edema: { type: String },
      muscleTone: { type: String },
      coordination: { type: String },
      sensation: { type: String },
      endurance: { type: String },
      safetyAwareness: { type: String },
      comments: { type: String },
    },
    priorAndCurrentFunction: {
      prior: { type: String },
      current: { type: String },
    },
    homeboundReason: {
      taxingEffort: { type: Boolean, default: false },
      medicalRestriction: { type: Boolean, default: false },
      assistRequired: {
        transfer: { type: Boolean, default: false },
        ambulation: { type: Boolean, default: false },
        leavingHome: { type: Boolean, default: false },
      },
      severeSOB: { type: Boolean, default: false },
      unsafeAlone: { type: Boolean, default: false },
      other: { type: String },
    },
    mobility: {
      prior: {
        rolling: { type: String },
        sitting: { type: String },
      },
      current: {
        rolling: { type: String },
        sitting: { type: String },
      },
      comments: { type: String },
    },
    transfer: {
      prior: { type: String },
      current: { type: String },
      comments: { type: String },
    },
    gaitAnalysis: {
      prior: {
        level: { type: String },
        unlevel: { type: String },
        stepStair: { type: String },
      },
      current: {
        level: { type: String },
        unlevel: { type: String },
        stepStair: { type: String },
      },
      assistiveDevice: { type: String },
      gaitQualityDeviation: { type: String },
    },
    standardizedTests: {
      tinettiPOMA: {
        prior: { type: String },
        current: { type: String },
      },
      timedGetUpAndGo: {
        prior: { type: String },
        current: { type: String },
      },
      functionalReach: {
        prior: { type: String },
        current: { type: String },
      },
      other: { type: String },
    },
    progressFactors: { type: String },
    expectationOfProgress: { type: String },
    recommendedModifications: { type: String },
    careCoordination: { type: String },
    skilledCareProvided: { type: String },
    pocChangeStatus: {
      unchanged: { type: Boolean, default: false, default: false },
      changed: { type: Boolean, default: false, default: false },
    },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PTReassessment = mongoose.model("PTReassessment", ptReassessmentSchema);

module.exports = PTReassessment;
