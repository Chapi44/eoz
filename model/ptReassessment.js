const mongoose = require("mongoose");

const ptReassessmentSchema = mongoose.Schema(
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
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitDate: { type: Date, required: true },
    timeIn: { type: String },
    timeOut: { type: String },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    reassessmentType: { type: String, default: "" },
    associatedMileage: { type: String, default: "" },
    surcharge: { type: String, default: "" },
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
      orientation: { type: String, default: "" },
      levelOfConsciousness: { type: String, default: "" },
      comments: { type: String, default: "" },
    },
    medicalDiagnosis: {
      diagnosis: { type: String, default: "" },
      onset: { type: String, default: "" },
    },
    ptDiagnosis: {
      diagnosis: { type: String, default: "" },
      onset: { type: String, default: "" },
    },
    painAssessment: {
      location: { type: String, default: "" },
      level: { type: String, default: "" },
      increasedBy: { type: String, default: "" },
      relievedBy: { type: String, default: "" },
    },
    dme: {
      available: { type: String, default: "" },
      needs: { type: String, default: "" },
      suggestion: { type: String, default: "" },
    },
    livingSituation: {
      dwellingLevel: { type: String, enum: ["One", "Multiple"], default: null },
      stairs: { type: String, default: null },
      livesWith: {
        type: String,
        enum: ["Alone", "Family", "Friends", "Significant Other"],
        default: null,
      },
      support: {
        type: String,
        enum: [
          "Willing caregiver available",
          "Limited caregiver support",
          "No caregiver available",
        ],
        default: null,
      },
      homeSafetyBarriers: { type: String, default: "" },
    },
    priorAndCurrentLevelOfFunction: {
      prior: { type: String, default: "" },
      current: { type: String, default: "" },
    },
    homeboundReason: {
      requiresTaxingEffort: { type: Boolean, default: false },
      medicalRestriction: { type: Boolean, default: false },
      needsAssistWithTransfer: { type: Boolean, default: false },
      needsAssistWithAmbulation: { type: Boolean, default: false },
      needsAssistLeavingHome: { type: Boolean, default: false },
      unableToBeUpLongPeriod: { type: Boolean, default: false },
      severeSOBUponExertion: { type: Boolean, default: false },
      unsafeToGoOutAlone: { type: Boolean, default: false },
    },
    bedMobility: {
      prior: {
        rollingToRight: { assistance: { type: String }, assistiveDevice: { type: String } },
        rollingToLeft: { assistance: { type: String }, assistiveDevice: { type: String } },
        sitStandSit: { assistance: { type: String }, assistiveDevice: { type: String } },
        supToSit: { assistance: { type: String }, assistiveDevice: { type: String } },
      },
      current: {
        rollingToRight: { assistance: { type: String }, assistiveDevice: { type: String } },
        rollingToLeft: { assistance: { type: String }, assistiveDevice: { type: String } },
        sitStandSit: { assistance: { type: String }, assistiveDevice: { type: String } },
        supToSit: { assistance: { type: String }, assistiveDevice: { type: String } },
      },
      comment: { type: String, default: "" },
    },
    transfer: {
      prior: {
        bedChair: { assistance: { type: String }, assistiveDevice: { type: String } },
        chairBed: { assistance: { type: String }, assistiveDevice: { type: String } },
        chairToWC: { assistance: { type: String }, assistiveDevice: { type: String } },
        toiletOrBSC: { assistance: { type: String }, assistiveDevice: { type: String } },
        carVan: { assistance: { type: String }, assistiveDevice: { type: String } },
        tubShower: { assistance: { type: String }, assistiveDevice: { type: String } },
      },
      current: {
        bedChair: { assistance: { type: String }, assistiveDevice: { type: String } },
        chairBed: { assistance: { type: String }, assistiveDevice: { type: String } },
        chairToWC: { assistance: { type: String }, assistiveDevice: { type: String } },
        toiletOrBSC: { assistance: { type: String }, assistiveDevice: { type: String } },
        carVan: { assistance: { type: String }, assistiveDevice: { type: String } },
        tubShower: { assistance: { type: String }, assistiveDevice: { type: String } },
      },
      static: { type: String, default: "" },
      dynamic: { type: String, default: "" },
      comment: { type: String, default: "" },
    },
    gaitAnalysis: {
      prior: {
        level: { type: String, default: "" },
        unlevel: { type: String, default: "" },
        stepStair: { type: String, default: "" },
        rails: { type: String, enum: ["No Rail", "1 Rail", "2 Rails"], default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      current: {
        level: { type: String, default: "" },
        unlevel: { type: String, default: "" },
        stepStair: { type: String, default: "" },
        rails: { type: String, enum: ["No Rail", "1 Rail", "2 Rails"], default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      gaitQualityDeviation: { type: String, default: "" },
      comments: { type: String, default: "" },
    },
    standardizedTest: {
      prior: {
        tinettiPOMA: { type: String, default: "" },
        timedGetUpAndGo: { type: String, default: "" },
        functionalReach: { type: String, default: "" },
        other: { type: String, default: "" },
      },
      current: {
        tinettiPOMA: { type: String, default: "" },
        timedGetUpAndGo: { type: String, default: "" },
        functionalReach: { type: String, default: "" },
        other: { type: String, default: "" },
      },
    },
    physicalAssessment: [
      {
        part: { type: String, required: true },
        actions: [
          {
            action: { type: String, required: true },
            romRight: { type: String, default: "" },
            romLeft: { type: String, default: "" },
            strengthRight: { type: String, default: "" },
            strengthLeft: { type: String, default: "" },
          },
        ],
      },
    ],
    skilledCareProvided: { type: String, default: "" },
    careCoordination: { type: String, default: "" },
    narrative: { type: String, default: "" },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PTReassessment = mongoose.model("PTReassessment", ptReassessmentSchema);

module.exports = PTReassessment;
