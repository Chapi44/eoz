const mongoose = require("mongoose");

const psychNurseAssessmentSchema = mongoose.Schema(
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
    episodeRange: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    physicianLastVisit: { type: Date },
    associatedMileage: { type: String },
    surcharge: { type: String },
    primaryDiagnosis: { type: String, required: true },
    secondaryDiagnosis: { type: String },
    appearance: {
      facialExpressions: {
        sad: { type: Boolean, default: false },
        expressionless: { type: Boolean, default: false },
        hostile: { type: Boolean, default: false },
        worried: { type: Boolean, default: false },
        avoidsGaze: { type: Boolean, default: false },
      },
      dress: {
        meticulous: { type: Boolean, default: false },
        hygienePoor: { type: Boolean, default: false },
        eccentric: { type: Boolean, default: false },
        seductive: { type: Boolean, default: false },
        exposed: { type: Boolean, default: false },
      },
      comments: { type: String },
    },
    motorActivity: {
      increasedAmount: { type: Boolean, default: false },
      decreasedAmount: { type: Boolean, default: false },
      agitation: { type: Boolean, default: false },
      tics: { type: Boolean, default: false },
      tremor: { type: Boolean, default: false },
      peculiarPosturing: { type: Boolean, default: false },
      unusualGait: { type: Boolean, default: false },
      comments: { type: String },
    },
    speech: {
      slowed: { type: Boolean, default: false },
      loud: { type: Boolean, default: false },
      soft: { type: Boolean, default: false },
      mute: { type: Boolean, default: false },
      slurred: { type: Boolean, default: false },
      stuttering: { type: Boolean, default: false },
      comments: { type: String },
    },
    flowOfThought: {
      blocking: { type: Boolean, default: false },
      circumstantial: { type: Boolean, default: false },
      tangential: { type: Boolean, default: false },
      perseveration: { type: Boolean, default: false },
      flightOfIdeas: { type: Boolean, default: false },
      looseAssociation: { type: Boolean, default: false },
      indecisive: { type: Boolean, default: false },
      comments: { type: String },
    },
    moodAndAffect: {
      anxious: { type: Boolean, default: false },
      inappropriateAffect: { type: Boolean, default: false },
      flatAffect: { type: Boolean, default: false },
      elevatedMood: { type: Boolean, default: false },
      depressedMood: { type: Boolean, default: false },
      labileMood: { type: Boolean, default: false },
      comments: { type: String },
    },
    sensorium: {
      orientationImpaired: {
        time: { type: Boolean, default: false },
        place: { type: Boolean, default: false },
        person: { type: Boolean, default: false },
      },
      memory: {
        cloudingOfConsciousness: { type: Boolean, default: false },
        inabilityToConcentrate: { type: Boolean, default: false },
        amnesia: { type: Boolean, default: false },
        poorRecentMemory: { type: Boolean, default: false },
        poorRemoteMemory: { type: Boolean, default: false },
      },
      comments: { type: String },
    },
    intellect: {
      aboveNormal: { type: Boolean, default: false },
      belowNormal: { type: Boolean, default: false },
      paucityOfKnowledge: { type: Boolean, default: false },
      vocabularyPoor: { type: Boolean, default: false },
      serialSevensDonePoorly: { type: Boolean, default: false },
      poorAbstraction: { type: Boolean, default: false },
      comments: { type: String },
    },
    insightAndJudgment: {
      poorInsight: { type: Boolean, default: false },
      poorJudgment: { type: Boolean, default: false },
      unrealisticRegardingIllness: { type: Boolean, default: false },
      unmotivatedForTreatment: { type: Boolean, default: false },
      unrealisticRegardingGoals: { type: Boolean, default: false },
      comments: { type: String },
    },
    interventions: { type: String },
    goals: { type: String },
    rehabPotential: { type: String, enum: ["Fair", "Good", "Excellent"] },
    homeboundStatus: { type: [String] },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PsychNurseAssessment = mongoose.model("PsychNurseAssessment", psychNurseAssessmentSchema);

module.exports = PsychNurseAssessment;
