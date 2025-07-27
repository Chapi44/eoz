const mongoose = require("mongoose");

const ptEvaluationSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    episodePeriod: {
      start: { type: Date },
      end: { type: Date },
    },
    visitDate: { type: Date },
    visitStartTime: { type: String, default: "" },
    visitEndTime: { type: String, default: "" },
    travelStartTime: { type: String, default: "" },
    travelEndTime: { type: String, default: "" },
    primaryDiagnosis: { type: String, default: "" },
    // RIGHT COLUMN
    previousNotes: { type: String, default: "" }, // can be an ObjectId if referencing another doc
    physician: { type: String, default: "" }, // Or ObjectId if referencing User
    associatedMileage: { type: String, default: "" },
    surcharge: { type: String, default: "" },
    secondaryDiagnosis: { type: String, default: "" },
    sendAsOrder: { type: Boolean, default: false }, // Checkbox
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
    transfer: {
      na: { type: Boolean, default: false }, // N/A checkbox

      bedChair: {
        assistance: { type: String, default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      chairBed: {
        assistance: { type: String, default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      chairToWC: {
        assistance: { type: String, default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      toiletOrBSC: {
        assistance: { type: String, default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      carVan: {
        assistance: { type: String, default: "" },
        assistiveDevice: { type: String, default: "" },
      },
      tubShower: {
        assistance: { type: String, default: "" },
        assistiveDevice: { type: String, default: "" },
      },

      sittingBalance: {
        static: { type: String, default: "" },
        dynamic: { type: String, default: "" },
      },
      standBalance: {
        static: { type: String, default: "" },
        dynamic: { type: String, default: "" },
      },

      commentTemplate: { type: String, default: "" }, // Dropdown for comment template
      comments: { type: String, default: "" }, // Free text comment
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
      frequencyAndDuration: { type: String, default: "" }, // Top Frequency & Duration field

      // Left column options
      therapeuticExercise: { type: Boolean, default: false },
      balanceTraining: { type: Boolean, default: false },
      functionalMobilityTraining: { type: Boolean, default: false },
      teachFallPreventionSafety: { type: Boolean, default: false },
      proprioceptiveTraining: { type: Boolean, default: false },
      relaxationTechnique: { type: Boolean, default: false },

      // Electrical stimulation group
      electricalStimulation: {
        checked: { type: Boolean, default: false },
        bodyParts: { type: String, default: "" },
        duration: { type: String, default: "" },
      },

      ultrasound: {
        checked: { type: Boolean, default: false },
        bodyParts: { type: String, default: "" },
        duration: { type: String, default: "" },
      },

      tens: {
        checked: { type: Boolean, default: false },
        bodyParts: { type: String, default: "" },
        duration: { type: String, default: "" },
      },

      prostheticTraining: { type: Boolean, default: false },

      // Center column options
      bedMobilityTraining: { type: Boolean, default: false },
      gaitTraining: { type: Boolean, default: false },
      teachSafeEffectiveUseOfAdaptiveAssistDevice: {
        type: Boolean,
        default: false,
      },
      establishUpgradeHomeExerciseProgram: { type: Boolean, default: false },
      posturalControlTraining: { type: Boolean, default: false },
      teachSafeEffectiveBreathingTechnique: { type: Boolean, default: false },
      pulseOximetryPRN: { type: Boolean, default: false },

      // Right column options
      transferTraining: { type: Boolean, default: false },
      neuromuscularReeducation: { type: Boolean, default: false },
      teachSafeStairClimbingSkills: { type: Boolean, default: false },
      ptCaregiverEducationTraining: { type: Boolean, default: false },
      teachEnergyConservationTechniques: { type: Boolean, default: false },
      teachHipPrecaution: { type: Boolean, default: false },

      // Other/template dropdown
      other: { type: String, default: "" }, // Free-text for "Other"
      otherTemplate: { type: String, default: "" }, // Dropdown template
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
      na: { type: Boolean, default: false }, // N/A checkbox

      trainingTopics: { type: String, default: "" }, // Dropdown or free text
      trainingNotes: { type: String, default: "" }, // Large text area
      trained: {
        patient: { type: Boolean, default: false },
        caregiver: { type: Boolean, default: false },
      },

      treatmentPerformed: { type: String, default: "" }, // Dropdown or free text
      treatmentNotes: { type: String, default: "" }, // Large text area

      patientResponse: { type: String, default: "" }, // Dropdown or free text
      patientResponseNotes: { type: String, default: "" },

      careCoordination: {
        na: { type: Boolean, default: false }, // N/A checkbox
        template: { type: String, default: "" }, // Dropdown
        notes: { type: String, default: "" }, // Large text area
      },

      safetyIssuesInstructionEducation: {
        na: { type: Boolean, default: false }, // N/A checkbox
        template: { type: String, default: "" }, // Dropdown
        notes: { type: String, default: "" }, // Large text area
      },
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
