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
    timeIn: { type: String },
    timeOut: { type: String },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    appearance: {
      wnlForPatient: { type: Boolean, default: false },
      facialExpressions: {
        sad: { type: Boolean, default: false },
        expressionless: { type: Boolean, default: false },
        hostile: { type: Boolean, default: false },
        worried: { type: Boolean, default: false },
        avoidsGaze: { type: Boolean, default: false },
      },
      dress: {
        meticulous: { type: Boolean, default: false },
        poorClothingHygiene: { type: Boolean, default: false },
        eccentric: { type: Boolean, default: false },
        seductive: { type: Boolean, default: false },
        exposed: { type: Boolean, default: false },
      },
      comments: { type: String, default: "" },
    },
    motorActivity: {
      wnlForPatient: { type: Boolean, default: false },
      increasedAmount: { type: Boolean, default: false },
      decreasedAmount: { type: Boolean, default: false },
      agitation: { type: Boolean, default: false },
      tics: { type: Boolean, default: false },
      tremor: { type: Boolean, default: false },
      peculiarPosturing: { type: Boolean, default: false },
      unusualGait: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    speech: {
      wnlForPatient: { type: Boolean, default: false },
      excessiveAmount: { type: Boolean, default: false },
      reducedAmount: { type: Boolean, default: false },
      slowed: { type: Boolean, default: false },
      loud: { type: Boolean, default: false },
      soft: { type: Boolean, default: false },
      mute: { type: Boolean, default: false },
      slurred: { type: Boolean, default: false },
      stuttering: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    flowOfThought: {
      wnlForPatient: { type: Boolean, default: false },
      blocking: { type: Boolean, default: false },
      circumstantial: { type: Boolean, default: false },
      tangential: { type: Boolean, default: false },
      perseveration: { type: Boolean, default: false },
      flightOfIdeas: { type: Boolean, default: false },
      looseAssociation: { type: Boolean, default: false },
      indecisive: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    moodAndAffect: {
      wnlForPatient: { type: Boolean, default: false },
      anxious: { type: Boolean, default: false },
      inappropriateAffect: { type: Boolean, default: false },
      flatAffect: { type: Boolean, default: false },
      elevatedMood: { type: Boolean, default: false },
      depressedMood: { type: Boolean, default: false },
      labileMood: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    sensorium: {
      wnlForPatient: { type: Boolean, default: false },
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
        confabulation: { type: Boolean, default: false },
      },
      comments: { type: String, default: "" },
    },
    intellect: {
      wnlForPatient: { type: Boolean, default: false },
      aboveNormal: { type: Boolean, default: false },
      belowNormal: { type: Boolean, default: false },
      paucityOfKnowledge: { type: Boolean, default: false },
      vocabularyPoor: { type: Boolean, default: false },
      serialSevensDonePoorly: { type: Boolean, default: false },
      poorAbstraction: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    insightAndJudgment: {
      wnlForPatient: { type: Boolean, default: false },
      poorInsight: { type: Boolean, default: false },
      poorJudgment: { type: Boolean, default: false },
      unrealisticRegardingIllness: { type: Boolean, default: false },
      unmotivatedForTreatment: { type: Boolean, default: false },
      unrealisticGoals: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    interviewBehavior: {
      wnlForPatient: { type: Boolean, default: false },
      angryOutbursts: { type: Boolean, default: false },
      irritable: { type: Boolean, default: false },
      impulsive: { type: Boolean, default: false },
      hostile: { type: Boolean, default: false },
      silly: { type: Boolean, default: false },
      sensitive: { type: Boolean, default: false },
      apathetic: { type: Boolean, default: false },
      withdrawn: { type: Boolean, default: false },
      evasive: { type: Boolean, default: false },
      passive: { type: Boolean, default: false },
      aggressive: { type: Boolean, default: false },
      naive: { type: Boolean, default: false },
      overlyDramatic: { type: Boolean, default: false },
      manipulative: { type: Boolean, default: false },
      dependent: { type: Boolean, default: false },
      uncooperative: { type: Boolean, default: false },
      demanding: { type: Boolean, default: false },
      negativistic: { type: Boolean, default: false },
      callous: { type: Boolean, default: false },
      moodSwings: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    contentOfThought: {
      phobias: { type: Boolean, default: false },
      obsessions: { type: Boolean, default: false },
      compulsions: { type: Boolean, default: false },
      feelingsOfUnreality: { type: Boolean, default: false },
      feelsPersecuted: { type: Boolean, default: false },
      thoughtsOfRunningAway: { type: Boolean, default: false },
      somaticComplaints: { type: Boolean, default: false },
      ideasOfGuilt: { type: Boolean, default: false },
      ideasOfHopelessness: { type: Boolean, default: false },
      ideasOfWorthlessness: { type: Boolean, default: false },
      excessiveReligiosity: { type: Boolean, default: false },
      sexualPreoccupation: { type: Boolean, default: false },
      blamesOthers: { type: Boolean, default: false },
      illusions: {
        present: { type: Boolean, default: false },
      },
      hallucinations: {
        auditory: { type: Boolean, default: false },
        visual: { type: Boolean, default: false },
        other: { type: String, default: "" },
      },
      delusions: {
        ofPersecution: { type: Boolean, default: false },
        ofGrandeur: { type: Boolean, default: false },
        ofReference: { type: Boolean, default: false },
        ofInfluence: { type: Boolean, default: false },
        somatic: { type: Boolean, default: false },
        areSystematized: { type: Boolean, default: false },
        other: { type: String, default: "" },
      },
      comments: { type: String, default: "" },
    },
    interventions: { comments: { type: String, default: "" } },
    goals: {
      rehabPotential: {
        fair: { type: Boolean, default: false },
        good: { type: Boolean, default: false },
        excellent: { type: Boolean, default: false },
      },
      comments: { type: String, default: "" },
    },
    homeboundStatus: {
      exhibitsTaxingEffort: { type: Boolean, default: false },
      needsAssistance: { type: Boolean, default: false },
      severeDyspnea: { type: Boolean, default: false },
      unsafeToLeave: { type: Boolean, default: false },
      psychiatricImpairments: { type: Boolean, default: false },
      medicalRestrictions: { type: Boolean, default: false },
      other: { type: String, default: "" },
    },
    clinicianSignature: { type: String, default: "" },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PsychNurseAssessment = mongoose.model(
  "PsychNurseAssessment",
  psychNurseAssessmentSchema
);

module.exports = PsychNurseAssessment;
