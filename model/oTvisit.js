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
        moneyManagement: { assistance: { type: String }, reps: { type: String } },
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
    therapeuticExercise: {
      rom: { reps: { type: String } },
      active: { reps: { type: String } },
      activeAssistive: { reps: { type: String } },
      resistiveManual: { reps: { type: String } },
      resistiveWeights: { reps: { type: String } },
      stretching: { reps: { type: String } },
      comment: { type: String },
    },
    therapeuticDynamicActivities: {
      assistance: { type: String },
      assistiveDevice: { type: String },
      bedMobility: { reps: { type: String } },
      bedToWCTransfer: { reps: { type: String } },
      toiletTransfer: { reps: { type: String } },
      tubShowerTransfer: { reps: { type: String } },
      other: { reps: { type: String } },
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
    plan: {
      continuePrescribedPlan: { type: Boolean, default: false },
      changePrescribedPlan: { type: Boolean, default: false },
      dischargePlan: { type: Boolean, default: false },
    },
    progressTowardsGoals: { type: String },
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
