const mongoose = require("mongoose");

const ptVisitSchema = mongoose.Schema(
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
    adminId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // References the "User" model
      required: false,  // Optional, can be removed if you want it to be required
    },
    visitDate: { type: Date, required: true },
    timeIn: { type: String },
    timeOut: { type: String },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
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
    functionalLimitations: {
      romStrengthDeficit: { type: Boolean, default: false },
      pain: { type: Boolean, default: false },
      safetyTechniques: { type: Boolean, default: false },
      wcMobility: { type: Boolean, default: false },
      balanceGait: { type: Boolean, default: false },
      bedMobility: { type: Boolean, default: false },
      transfer: { type: Boolean, default: false },
      increasedFallRisk: { type: Boolean, default: false },
      coordination: { type: Boolean, default: false },
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
    supervisoryVisit: {
      na: { type: Boolean, default: false },
      supervisoryVisit: { type: Boolean, default: false },
      lptaPresent: { type: Boolean, default: false },
      aidePresent: { type: Boolean, default: false },
      comment: { type: String, default: "" },
    },
    subjective: { type: String, default: "" },
    objective: {
      therapeuticExercises: {
        rom: { reps: { type: String } },
        active: { reps: { type: String } },
        activeAssistive: { reps: { type: String } },
        resistiveManual: { reps: { type: String } },
        resistiveWeights: { reps: { type: String } },
        stretching: { reps: { type: String } },
        comments: { type: String, default: "" },
      },
      bedMobilityTraining: {
        rolling: { reps: { type: String } },
        supToSit: { reps: { type: String } },
        scooting: { reps: { type: String } },
        sitToStand: { reps: { type: String } },
        comments: { type: String, default: "" },
      },
      transferTraining: {
        transferType: { reps: { type: String } },
        assistiveDevice: { type: String },
        comments: { type: String, default: "" },
      },
      balanceActivities: {
        sittingStatic: { type: String },
        sittingDynamic: { type: String },
        standingStatic: { type: String },
        standingDynamic: { type: String },
        comments: { type: String, default: "" },
      },
      gaitTraining: {
        distance: { type: String },
        assistiveDevice: { type: String },
        assistance: { type: String },
        gaitQuality: { type: String },
        deviation: { type: String },
        stairs: {
          numberOfSteps: { type: String },
          rail: {
            rail1: { type: Boolean, default: false },
            rail2: { type: Boolean, default: false },
          },
        },
        comments: { type: String, default: "" },
      },
    },
    teaching: {
      patient: { type: Boolean, default: false },
      caregiver: { type: Boolean, default: false },
      hep: { type: Boolean, default: false },
      safeTransfer: { type: Boolean, default: false },
      safeGait: { type: Boolean, default: false },
      other: { type: String, default: "" },
    },
    pain: {
      levelPrior: { type: String },
      levelAfter: { type: String },
      location: { type: String },
      relievedBy: { type: String },
      comments: { type: String, default: "" },
    },
    assessment: { type: String, default: "" },
    plan: {
      continuePrescribedPlan: { type: Boolean, default: false },
      changePrescribedPlan: { type: Boolean, default: false },
      dischargePlan: { type: Boolean, default: false },
      comments: { type: String, default: "" },
    },
    narrative: { type: String, default: "" },
    progressTowardsGoals: { type: String, default: "" },
    goalsMet: { type: Boolean, default: false },
    skilledTreatmentProvided: {
      therapeuticExercise: { type: Boolean, default: false },
      bedMobilityTraining: { type: Boolean, default: false },
      transferTraining: { type: Boolean, default: false },
      balanceTraining: { type: Boolean, default: false },
      gaitTraining: { type: Boolean, default: false },
      neuromuscularReeducation: { type: Boolean, default: false },
      functionalMobilityTraining: { type: Boolean, default: false },
      safeUseAdaptiveDevice: { type: Boolean, default: false },
      stairClimbingSkills: { type: Boolean, default: false },
      fallPrevention: { type: Boolean, default: false },
      homeExerciseProgram: { type: Boolean, default: false },
      caregiverEducation: { type: Boolean, default: false },
      proprioceptiveTraining: { type: Boolean, default: false },
      posturalControl: { type: Boolean, default: false },
      energyConservation: { type: Boolean, default: false },
      relaxationTechniques: { type: Boolean, default: false },
      safeBreathingTechnique: { type: Boolean, default: false },
      hipPrecautions: { type: Boolean, default: false },
      electricalStimulation: { type: Boolean, default: false },
      ultrasound: { type: Boolean, default: false },
      tens: { type: Boolean, default: false },
      prostheticTraining: { type: Boolean, default: false },
      pulseOximetry: { type: Boolean, default: false },
      other: { type: String, default: "" },
    },
    bodyParts: [
      {
        name: { type: String, default: "" },
        duration: { type: String, default: "" },
      },
    ],

    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PTVisit = mongoose.model("PTVisit", ptVisitSchema);

module.exports = PTVisit;
