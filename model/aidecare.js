const mongoose = require("mongoose");

const aideVisitSchema = mongoose.Schema(
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
      ref: "User", // References another user (admin)
      required: false, // Optional, remove if you want it to be required
    },
    visitDate: { type: Date, required: true },
    tasks: {
      personalCare: {
        bedBath: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        assistWithChairBath: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        tubBath: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        shower: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        showerWithChair: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        shampooHair: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        hairCareCombHair: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        oralCare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        skinCare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        pericare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        nailCare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        shave: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        assistWithDressing: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        medicationReminder: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
      },
      householdTasks: {
        makeBed: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        changeLinen: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        lightHousekeeping: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        otherDescribe: { type: String },
      },
      elimination: {
        assistWithBedPan: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        assistWithBSC: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        incontinenceCare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        emptyDrainageBag: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        recordBowelMovement: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        catheterCare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
      },
      activity: {
        dangleOnSideOfBed: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        turnAndPosition: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        assistWithTransfer: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        assistWithAmbulation: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        rangeOfMotion: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        equipmentCare: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
      },
      nutrition: {
        mealSetup: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
        assistWithFeeding: { type: String, enum: ["Completed", "Refused", "N/A"], default: "N/A" },
      },
    },
    comments: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const AideVisit = mongoose.model("AideVisit", aideVisitSchema);

module.exports = AideVisit;
