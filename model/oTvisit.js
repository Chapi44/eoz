const mongoose = require("mongoose");

const otVisitSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Could also be "therapistId" if discipline specific
      required: true,
    },
    // Episode date range
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    visitDate: { type: Date, required: true },
    // Times
    visitStartTime: { type: String }, // Visit Start Time (e.g., "09:00")
    visitEndTime: { type: String }, // Visit End Time (e.g., "10:15")
    travelStartTime: { type: String }, // Travel Start Time
    travelEndTime: { type: String }, // Travel End Time
    // Diagnoses
    primaryDiagnosis: { type: String },
    secondaryDiagnosis: { type: String },
    // UI section: Previous Notes (dropdown and reference)
    previousNotes: { type: String }, // Optionally, can be an array of ObjectId if referencing Notes
    // Physician selection
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    // Associated Mileage
    associatedMileage: { type: Number },
    // Surcharge
    surcharge: { type: Number },
    vitalSigns: {
      sbp: { type: String },
      dbp: { type: String },
      heartRate: { type: String },
      respiratoryRate: { type: String },
      temperature: { type: String },
      weight: { type: String },
      oxygenSaturation: { type: String },
    },
    subjective: { type: String },
    homeboundReason: {
      requiresTaxingEffort: { type: Boolean, default: false },
      needsAssistWithTransfer: { type: Boolean, default: false },
      needsAssistLeavingHome: { type: Boolean, default: false },
      severeSOBUponExertion: { type: Boolean, default: false },
      medicalRestriction: { type: Boolean, default: false },
      needsAssistWithAmbulation: { type: Boolean, default: false },
      unableToBeUpLongPeriod: { type: Boolean, default: false },
      unsafeToGoOutAlone: { type: Boolean, default: false },
    },
    functionalLimitations: {
      upperBodyROMStrengthDeficit: { type: Boolean, default: false },
      painAffectingFunction: { type: Boolean, default: false },
      impairedSafety: { type: Boolean, default: false },
      difficultyWithADLs: { type: Boolean, default: false },
      difficultyWithIADLs: { type: Boolean, default: false },
      impairedProblemSolving: { type: Boolean, default: false },
      impairedCoordination: { type: Boolean, default: false },
      visualDeficit: { type: Boolean, default: false },
      cognitionIssues: { type: Boolean, default: false },
    },
    painAssessment: {
      location: { type: String },
      level: { type: String },
      increasedBy: { type: String },
      relievedBy: { type: String },
    },
    teaching: {
      patientFamily: { type: Boolean, default: false },
      caregiver: { type: Boolean, default: false },
      adaptiveEquipment: { type: Boolean, default: false },
      safetyTechnique: { type: Boolean, default: false },
      adls: { type: Boolean, default: false },
      hep: { type: Boolean, default: false },
      assistiveDevice: { type: Boolean, default: false },
      other: { type: String },
    },
    adlTraining: {
      functionalMobility: {
        bedMobility: {
          assistance: { type: String },
          assistiveDevice: { type: String },
        },
        bedToWCTransfers: {
          assistance: { type: String },
          assistiveDevice: { type: String },
        },
        toiletTransfer: {
          assistance: { type: String },
          assistiveDevice: { type: String },
        },
        tubShowerTransfer: {
          assistance: { type: String },
          assistiveDevice: { type: String },
        },
        comment: { type: String },
      },
      selfCareSkills: {
        selfFeeding: { assistance: { type: String }, reps: { type: String } },
        oralHygiene: { assistance: { type: String }, reps: { type: String } },
        grooming: { assistance: { type: String }, reps: { type: String } },
        toileting: { assistance: { type: String }, reps: { type: String } },
        ubBathing: { assistance: { type: String }, reps: { type: String } },
        lbBathing: { assistance: { type: String }, reps: { type: String } },
        ubDressing: { assistance: { type: String }, reps: { type: String } },
        lbDressing: { assistance: { type: String }, reps: { type: String } },
        comment: { type: String },
      },
      instrumentalADL: {
        housekeeping: { assistance: { type: String }, reps: { type: String } },
        mealPrep: { assistance: { type: String }, reps: { type: String } },
        laundry: { assistance: { type: String }, reps: { type: String } },
        telephoneUse: { assistance: { type: String }, reps: { type: String } },
        moneyManagement: {
          assistance: { type: String },
          reps: { type: String },
        },
        medicationManagement: {
          assistance: { type: String },
          reps: { type: String },
        },
        comment: { type: String },
      },
      balance: {
        sittingStatic: { type: String },
        sittingDynamic: { type: String },
        standingStatic: { type: String },
        standingDynamic: { type: String },
      },
    },
    therapeuticDynamicActivities: {
      bedMobility: {
        assistance: { type: String }, // e.g., Minimal, Moderate, Max, etc.
        reps: { type: Number }, // e.g., 10, 15
        assistiveDevice: { type: String }, // e.g., Walker, None, etc.
      },
      bedWCTransfer: {
        assistance: { type: String },
        reps: { type: Number },
        assistiveDevice: { type: String },
      },
      toiletTransfer: {
        assistance: { type: String },
        reps: { type: Number },
        assistiveDevice: { type: String },
      },
      tubShowerTransfer: {
        assistance: { type: String },
        reps: { type: Number },
        assistiveDevice: { type: String },
      },
      other: {
        assistance: { type: String },
        reps: { type: Number },
        assistiveDevice: { type: String },
        activityDescription: { type: String }, // Optional: describe the 'Other' activity
      },
    },
    therapeuticExercise: {
      rom: {
        to: { type: String }, // Target ROM (e.g., Shoulder, Knee)
        reps: { type: Number }, // Number of repetitions
      },
      active: {
        to: { type: String },
        reps: { type: Number },
      },
      activeAssistive: {
        to: { type: String },
        reps: { type: Number },
      },
      resistiveManual: {
        to: { type: String },
        reps: { type: Number },
      },
      resistiveWeights: {
        to: { type: String },
        reps: { type: Number },
      },
      stretching: {
        to: { type: String },
        reps: { type: Number },
      },
      comment: { type: String }, // For the free text note at the bottom
    },
    supervisoryVisit: {
      otAssistant: { type: Boolean, default: false },
      aide: { type: Boolean, default: false },
      present: { type: Boolean, default: false },
      notPresent: { type: Boolean, default: false },
      observationOf: { type: String, default: "" },
      teachingTrainingOf: { type: String, default: "" },
      carePlanReviewed: { type: Boolean, default: false },
      carePlanReviewedNoReason: { type: String, default: "" },
    },
    skilledTreatmentProvided: {
      therapeuticExercise: { type: Boolean, default: false },
      neuromuscularReeducation: { type: Boolean, default: false },
      teachFallPrevention: { type: Boolean, default: false },
      caregiverEducation: { type: Boolean, default: false },
      posturalControlTraining: { type: Boolean, default: false },
      wheelchairManagement: { type: Boolean, default: false },
      energyConservation: { type: Boolean, default: false },
      communityIntegration: { type: Boolean, default: false },
      cognitiveSkillsDevelopment: { type: Boolean, default: false },
      manualTherapy: { type: Boolean, default: false },
      electricalStimulation: { type: Boolean, default: false },
      ultrasound: { type: Boolean, default: false },
      other: { type: String, default: "" },
      bodyParts: [
        {
          name: { type: String, default: "" },
          duration: { type: String, default: "" },
          dosage: { type: String, default: "" },
        },
      ],
    },
    wcMobility: {
      notApplicable: { type: Boolean, default: false }, // N/A checkbox
      level: { type: String }, // Assistance for Level surfaces
      uneven: { type: String }, // Assistance for Uneven surfaces
      maneuver: { type: String }, // Assistance for Maneuver
      adl: { type: String }, // Assistance for ADL (Activities of Daily Living)
    },
    plan: {
      continuePrescribedPlan: { type: Boolean, default: false },
      changePrescribedPlan: { type: Boolean, default: false },
      dischargePlan: { type: Boolean, default: false },
    },
    progressTowardsGoals: { type: String },

    narrative: {
      details: { type: String, default: "" },
    },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const OTVisit = mongoose.model("OTVisit", otVisitSchema);

module.exports = OTVisit;
