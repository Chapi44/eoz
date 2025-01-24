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
      stairs: { type: Boolean, default: false },
      numberOfSteps: { type: Number },
      livesWith: { type: [String] }, // ["Alone", "Family", "Friends", "Significant Other"]
      caregiverSupport: {
        willing: { type: Boolean, default: false, default: false },
        limitedSupport: { type: Boolean, default: false ,default: false },
        noSupport: { type: Boolean, default: false   ,default: false },
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
      taxingEffort: { type: Boolean, default: false, default: false },
      medicalRestriction: { type: Boolean, default: false , default: false },
      needsAssistance: { type: [String] }, // ["Transfer", "Ambulation", "Leaving Home"]
      severeShortnessOfBreath: { type: Boolean, default: false , default: false },
      unsafeToGoAlone: { type: Boolean, default: false, default: false },
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
      therapeuticExercises: { type: Boolean, default: false , default: false},
      bedMobilityTraining: { type: Boolean, default: false , default: false},
      transferTraining: { type: Boolean, default: false , default: false},
      balanceTraining: { type: Boolean, default: false, default: false },
      gaitTraining: { type: Boolean, default: false, default: false },
      neuromuscularReeducation: { type: Boolean, default: false , default: false},
      functionalMobilityTraining: { type: Boolean, default: false , default: false},
      safetyAndFallPrevention: { type: Boolean, default: false , default: false},
      homeExerciseProgram: { type: Boolean, default: false , default: false},
      caregiverEducation: { type: Boolean, default: false, default: false },
      energyConservationTechniques: { type: Boolean, default: false, default: false },
      relaxationTechniques: { type: Boolean, default: false , default: false},
      electricalStimulation: { type: Boolean, default: false , default: false},
      ultrasound: { type: Boolean, default: false , default: false},
      tens: { type: Boolean, default: false , default: false},
      comments: { type: String , default: false},
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
