const mongoose = require("mongoose");

const ptEvaluationSchema = mongoose.Schema(
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
    mentalAssessment: {
      orientation: { type: String },
      levelOfConsciousness: { type: String },
      comments: { type: String },
    },
    painAssessment: {
      location: { type: String },
      level: { type: Number },
      increasedBy: { type: String },
      relievedBy: { type: String },
      comments: { type: String },
    },
    livingSituation: {
      dwellingLevel: { type: String, enum: ["One", "Multiple"] },
      stairs: { type: Boolean },
      numberOfSteps: { type: Number },
      livesWith: { type: [String] }, // ["Alone", "Family", "Friends", "Significant Other"]
      caregiverSupport: {
        willing: { type: Boolean },
        limitedSupport: { type: Boolean },
        noSupport: { type: Boolean },
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
      priorFunction: { type: String },
      currentFunction: { type: String },
    },
    homeboundReason: {
      taxingEffort: { type: Boolean },
      medicalRestriction: { type: Boolean },
      needsAssistance: { type: [String] }, // ["Transfer", "Ambulation", "Leaving Home"]
      severeShortnessOfBreath: { type: Boolean },
      unsafeToGoAlone: { type: Boolean },
      other: { type: String },
    },
    therapyHistory: {
      priorTherapyReceived: { type: String },
    },
    rangeOfMotion: {
      bodyPart: { type: String },
      action: { type: String },
      romRight: { type: String },
      romLeft: { type: String },
      strengthRight: { type: String },
      strengthLeft: { type: String },
      comments: { type: String },
    },
    bedMobility: {
      rolling: { type: String },
      assistiveDevice: { type: String },
      comments: { type: String },
    },
    gaitAnalysis: {
      level: { type: String },
      unlevel: { type: String },
      stepStair: { type: String },
      railUsage: { type: [String] }, // ["No Rail", "1 Rail", "2 Rails"]
      assistiveDevice: { type: String },
      comments: { type: String },
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
    treatmentPlan: {
      frequencyAndDuration: { type: String },
      therapeuticExercises: { type: Boolean },
      bedMobilityTraining: { type: Boolean },
      transferTraining: { type: Boolean },
      balanceTraining: { type: Boolean },
      gaitTraining: { type: Boolean },
      neuromuscularReeducation: { type: Boolean },
      functionalMobilityTraining: { type: Boolean },
      safetyAndFallPrevention: { type: Boolean },
      homeExerciseProgram: { type: Boolean },
      caregiverEducation: { type: Boolean },
      energyConservationTechniques: { type: Boolean },
      relaxationTechniques: { type: Boolean },
      electricalStimulation: { type: Boolean },
      ultrasound: { type: Boolean },
      tens: { type: Boolean },
      comments: { type: String },
    },
    ptGoals: {
      shortTermGoals: { type: String },
      longTermGoals: { type: String },
    },
    rehabPotential: { type: String, enum: ["Good", "Fair", "Poor"] },
    dischargePlan: {
      dischargeTo: { type: [String] }, // ["Physician", "Caregiver", "Self-care"]
      dischargeWhen: { type: [String] }, // ["Goals Met", "Caregiver Ready"]
    },
    careCoordination: {
      topicsTrained: { type: [String] },
      safetyIssues: { type: String },
      comments: { type: String },
    },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PTEvaluation = mongoose.model("PTEvaluation", ptEvaluationSchema);

module.exports = PTEvaluation;
