const mongoose = require("mongoose");

const hhaPlanOfCareSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    physicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // References the "User" model
      required: false,  // Optional, can be removed if you want it to be required
    },
    visitDate: {
      type: Date,
      required: true,
    },
    episodePeriod: {
      start: { type: Date, required: true },
      end: { type: Date, required: true },
    },
    hhaFrequency: { type: String },
    primaryDiagnosis: { type: String, required: true },
    secondaryDiagnosis: { type: String },
    diet: { type: String },
    allergies: { type: String, default: "NKA" }, // No Known Allergies by default
    vitalSignParameters: {
      sbp: { min: { type: Number }, max: { type: Number } },
      dbp: { min: { type: Number }, max: { type: Number } },
      hr: { min: { type: Number }, max: { type: Number } },
      resp: { min: { type: Number }, max: { type: Number } },
      temp: { min: { type: Number }, max: { type: Number } },
      weight: { greaterThan: { type: Number }, lessThan: { type: Number } },
    },
    safetyPrecautions: {
      anticoagulantPrecautions: { type: Boolean, default: false, default: false },
      emergencyPlanDeveloped: { type: Boolean, default: false, default: false },
      fallPrecautions: { type: Boolean, default: false, default: false },
      keepPathwayClear: { type: Boolean, default: false, default: false },
      keepSideRailsUp: { type: Boolean, default: false, default: false },
      neutropenicPrecautions: { type: Boolean, default: false, default: false },
      o2Precautions: { type: Boolean, default: false, default: false },
      properPositionDuringMeals: { type: Boolean, default: false, default: false },
      safetyInADLs: { type: Boolean, default: false, default: false },
      seizurePrecautions: { type: Boolean, default: false, default: false },
      sharpsSafety: { type: Boolean, default: false, default: false },
      slowPositionChange: { type: Boolean, default: false, default: false },
      infectionControl: { type: Boolean, default: false, default: false },
      supportDuringTransfer: { type: Boolean, default: false, default: false },
      useOfAssistiveDevices: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    planDetails: {
      vitalSigns: {
        temperature: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        bloodPressure: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        heartRate: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        respirations: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        weight: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
      },
      eliminations: {
        assistWithBedPan: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        assistWithBSC: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        incontinenceCare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        emptyDrainageBag: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        recordBowelMovement: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        catheterCare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
      },
      personalCare: {
        bedBath: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        assistWithChairBath: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        tubBath: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        shower: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        showerWithChair: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        shampooHair: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        hairCare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        oralCare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        skinCare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        pericare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        nailCare: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        shave: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        assistWithDressing: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        medicationReminder: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
      },
      householdTasks: {
        makeBed: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        changeLinen: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        lightHousekeeping: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
      },
      nutrition: {
        mealSetup: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
        assistWithFeeding: { type: String, enum: ["QV", "QW", "N/A"], default: "N/A" },
      },
    },
    functionalLimitations: {
      amputation: { type: Boolean, default: false, default: false },
      bowelBladderIncontinence: { type: Boolean, default: false, default: false },
      contracture: { type: Boolean, default: false, default: false },
      hearing: { type: Boolean, default: false, default: false },
      paralysis: { type: Boolean, default: false, default: false },
      endurance: { type: Boolean, default: false, default: false },
      ambulation: { type: Boolean, default: false, default: false },
      speech: { type: Boolean, default: false, default: false },
      legallyBlind: { type: Boolean, default: false, default: false },
      dyspnea: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    activitiesPermitted: {
      completeBedRest: { type: Boolean, default: false, default: false },
      bedRestWithBRP: { type: Boolean, default: false, default: false },
      upAsTolerated: { type: Boolean, default: false, default: false },
      transferBedChair: { type: Boolean, default: false, default: false },
      exercisePrescribed: { type: Boolean, default: false, default: false },
      partialWeightBearing: { type: Boolean, default: false, default: false },
      independentAtHome: { type: Boolean, default: false, default: false },
      crutches: { type: Boolean, default: false, default: false },
      cane: { type: Boolean, default: false, default: false },
      wheelchair: { type: Boolean, default: false, default: false },
      walker: { type: Boolean, default: false, default: false },
      other: { type: String },
    },
    notifications: {
      reviewedWithHHA: { type: Boolean, default: false, default: false },
      patientOrientedWithPlan: { type: Boolean, default: false, default: false },
    },
    comments: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const HHAPlanOfCare = mongoose.model("HHAPlanOfCare", hhaPlanOfCareSchema);

module.exports = HHAPlanOfCare;
