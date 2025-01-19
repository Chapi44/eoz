const mongoose = require("mongoose");

const otReEvalSchema = mongoose.Schema(
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
      ref: "User", // Assuming physicians are stored in the User collection
      required: true,
    },
    timeIn: { type: String },
    timeOut: { type: String },
    vitalSigns: {
      sbp: { type: String },
      dbp: { type: String },
      heartRate: { type: String },
      respiratoryRate: { type: String },
      temperature: { type: String },
      weight: { type: String },
      oxygenSaturation: { type: String },
    },
    priorLevelOfFunction: { type: String },
    pertinentMedicalHistory: { type: String },
    livingSituation: {
      dwellingLevel: { type: String },
      steps: { type: String },
      caregiverSupport: { type: String },
      homeSafetyBarriers: { type: String },
    },
    homeboundReason: { type: [String] }, // Array to capture multiple reasons
    functionalMobility: {
      bedMobility: { type: String },
      bedToWCTransfers: { type: String },
      toiletTransfer: { type: String },
      tubShowerTransfer: { type: String },
      comments: { type: String },
    },
    adlSkills: {
      selfFeeding: { type: String },
      oralHygiene: { type: String },
      grooming: { type: String },
      toileting: { type: String },
      ubBathing: { type: String },
      lbBathing: { type: String },
      ubDressing: { type: String },
      lbDressing: { type: String },
      comments: { type: String },
    },
    instrumentalADL: {
      housekeeping: { type: String },
      mealPrep: { type: String },
      laundry: { type: String },
      telephoneUse: { type: String },
      moneyManagement: { type: String },
      medicationManagement: { type: String },
      comments: { type: String },
    },
    physicalAssessment: {
      rom: {
        right: { type: Map, of: String },
        left: { type: Map, of: String },
      },
      strength: {
        right: { type: Map, of: String },
        left: { type: Map, of: String },
      },
    },
    painAssessment: {
      location: { type: String },
      level: { type: String },
      increasedBy: { type: String },
      relievedBy: { type: String },
    },
    sensoryPerceptualSkills: {
      sharpDull: { type: String },
      lightFirm: { type: String },
      proprioception: { type: String },
    },
    visualSkills: {
      acuity: { type: String },
      tracking: { type: String },
      visualFieldCut: { type: String },
    },
    cognitiveStatus: {
      memory: { type: String },
      problemSolving: { type: String },
      attention: { type: String },
      safetyJudgment: { type: String },
      selfControl: { type: String },
    },
    treatmentPlan: {
      frequencyAndDuration: { type: String },
      goals: { type: String },
      modalities: { type: String },
      therapeuticExercises: { type: [String] },
    },
    dischargePlan: { type: String },
    careCoordination: {
      coordinationDetails: { type: String },
      safetyIssues: { type: String },
    },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const OTReEval = mongoose.model("OTReEval", otReEvalSchema);

module.exports = OTReEval;
