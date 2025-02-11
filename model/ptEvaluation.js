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
    timeIn: { type: String },
    timeOut: { type: String },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
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
    painAssessment: {
      location: { type: String, default: "" },
      level: { type: String, default: "" },
      increasedBy: { type: String, default: "" },
      relievedBy: { type: String, default: "" },
    },
    livingSituation: {
      dwellingLevel: { type: String, enum: ["One", "Multiple"], default: null },
      stairs: { type: String, default: null },
      livesWith: {
        type: String,
        enum: ["Alone", "Family", "Friends", "Significant Other"],
        default: null,
      },
      caregiverSupport: {
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
      priorLevelOfFunction: { type: String, default: "" },
      currentLevelOfFunction: { type: String, default: "" },
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
    bedMobility: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      rollingToRight: {
        assistance: { type: String, default: "" }, // Level of assistance required
        assistiveDevice: { type: String, default: "" }, // Device used for rolling to the right
      },
      rollingToLeft: {
        assistance: { type: String, default: "" }, // Level of assistance required
        assistiveDevice: { type: String, default: "" }, // Device used for rolling to the left
      },
      sitStandSit: {
        assistance: { type: String, default: "" }, // Level of assistance for Sit-Stand-Sit
        assistiveDevice: { type: String, default: "" }, // Device used for Sit-Stand-Sit
      },
      supToSit: {
        assistance: { type: String, default: "" }, // Level of assistance for Supine to Sit
        assistiveDevice: { type: String, default: "" }, // Device used for Supine to Sit
      },
      comment: { type: String, default: "" }, // Free-text field for additional comments
    },
    wb: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      status: { type: String, default: "" }, // Weight-bearing status description
      other: { type: String, default: "" }, // Additional details for "Other"
      comment: { type: String, default: "" }, // Free-text for comments
    },
    wcMobility: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      level: { type: String, default: "" }, // Level description
      uneven: { type: String, default: "" }, // Uneven surface description
      maneuver: { type: String, default: "" }, // Maneuver description
      adl: { type: String, default: "" }, // ADL description
      comment: { type: String, default: "" }, // Free-text for additional comments
    },
    assessment: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      details: { type: String, default: "" }, // Free-text field for assessment details
    },
    
    gaitAnalysis: {
      level: { type: String, default: "" },
      unlevel: { type: String, default: "" },
      stairs: {
        numberOfSteps: { type: String, default: "" },
        rails: {
          rail1: { type: Boolean, default: false },
          rail2: { type: Boolean, default: false },
        },
      },
      assistiveDevice: { type: String, default: "" },
      assistiveDevice: { type: String, default: "" },
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
    dme: {
      available: { type: String, default: "" },
      needs: { type: String, default: "" },
      suggestions: { type: String, default: "" },
    },
    medicalDiagnosis: {
      diagnosis: { type: String, default: "" },
      onset: { type: String, default: "" },
    },
    ptDiagnosis: {
      diagnosis: { type: String, default: "" },
      onset: { type: String, default: "" },
    },
    treatmentPlan: {
      therapeuticExercise: { type: Boolean, default: false },
      bedMobilityTraining: { type: Boolean, default: false },
      transferTraining: { type: Boolean, default: false },
      balanceTraining: { type: Boolean, default: false },
      gaitTraining: { type: Boolean, default: false },
      neuromuscularReeducation: { type: Boolean, default: false },
      proprioceptiveTraining: { type: Boolean, default: false },
      posturalControlTraining: { type: Boolean, default: false },
      relaxationTechnique: { type: Boolean, default: false },
      teachSafeEffectiveBreathing: { type: Boolean, default: false }, // Adjusted for clarity
      teachEnergyConservation: { type: Boolean, default: false }, // Simplified for clarity
      teachHipPrecaution: { type: Boolean, default: false }, // Unified naming style
      electricalStimulation: { type: Boolean, default: false },
      ultrasound: { type: Boolean, default: false },
      tens: { type: Boolean, default: false }, // Transcutaneous Electrical Nerve Stimulation
      pulseOximetryPRN: { type: Boolean, default: false }, // Standardized casing
      other: { type: String, default: "" }, // Free-text for additional treatments
      bodyParts: [
        {
          name: { type: String, default: "" }, // Name of the body part
          duration: { type: String, default: "" }, // Duration for treatment
        },
      ],
    },
    
    ptGoals: {
      additionalGoals: { type: String, default: "" },
      shortTermGoals: { type: String, default: "" },
      longTermGoals: { type: String, default: "" },
    },
    otherDisciplineRecommendation: {
      ot: { type: Boolean, default: false },
      msw: { type: Boolean, default: false },
      st: { type: Boolean, default: false },
      podiatrist: { type: Boolean, default: false },
      other: { type: String, default: "" },
      reason: { type: String, default: "" },
    },
    rehabPotential: {
      good: { type: Boolean, default: false },
      fair: { type: Boolean, default: false },
      poor: { type: Boolean, default: false },
    },
    dischargePlan: {
      toCareOf: {
        caregiver: { type: Boolean, default: false },
        selfcare: { type: Boolean, default: false },
      },
      plans: {
        caregiverAble: { type: Boolean, default: false },
        goalsMet: { type: Boolean, default: false },
      },
    },
    skilledCareProvided: {
      therapeuticExercise: { type: Boolean, default: false },
      transferTraining: { type: Boolean, default: false },
      homeExerciseProgram: { type: Boolean, default: false },
      patientEducation: { type: Boolean, default: false },
      caregiverEducation: { type: Boolean, default: false },
      other: { type: String, default: "" },
    },
    careCoordination: {
      na: { type: Boolean, default: false }, // Checkbox for N/A
      details: { type: String, default: "" }, // Free-text for Care Coordination details
    },
    safetyIssuesInstructionEducation: {
      na: { type: Boolean, default: false }, // Checkbox for N/A
      details: { type: String, default: "" }, // Free-text for Safety Issues/Instruction/Education details
    },
    notification: {
      patient: { type: Boolean, default: false }, // Checkbox for Patient notified
      caregiver: { type: Boolean, default: false }, // Checkbox for Caregiver notified
      understandsAgreesWithPOC: {
        yes: { type: Boolean, default: false }, // Checkbox for Yes
        no: { type: Boolean, default: false }, // Checkbox for No
      },
      physicianNotified: { type: Boolean, default: false }, // Checkbox for Physician notified
      comments: { type: String, default: "" }, // Free-text for comments (if any)
    },
    
    narrative: { type: String, default: "" },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PTEvaluation = mongoose.model("PTEvaluation", ptEvaluationSchema);

module.exports = PTEvaluation;
