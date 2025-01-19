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
    homeboundReason: { type: [String] }, // Array for multiple reasons
    functionalLimitations: { type: [String] }, // List of functional problems
    painAssessment: {
      location: { type: String },
      level: { type: String },
      increasedBy: { type: String },
      relievedBy: { type: String },
    },
    teaching: {
      patientFamily: { type: Boolean, default: false },
      caregiver: { type: Boolean, default: false },
      topicsCovered: { type: [String] }, // E.g., ADLs, safety techniques, etc.
    },
    adlTraining: {
      functionalMobility: {
        bedMobility: { type: String },
        bedToWCTransfers: { type: String },
        toiletTransfer: { type: String },
        tubShowerTransfer: { type: String },
        comments: { type: String },
      },
      selfCareSkills: {
        selfFeeding: { type: String },
        oralHygiene: { type: String },
        grooming: { type: String },
        toileting: { type: String },
        ubBathing: { type: String },
        lbBathing: { type: String },
        ubDressing: { type: String },
        lbDressing: { type: String },
        comments: { type: String },
      },
      instrumentalADL: {
        housekeeping: { type: String },
        mealPrep: { type: String },
        laundry: { type: String },
        telephoneUse: { type: String },
        moneyManagement: { type: String },
        medicationManagement: { type: String },
        comments: { type: String },
      },
    },
    therapeuticExercise: {
      rom: { type: String },
      active: { type: String },
      activeAssistive: { type: String },
      resistive: { type: String },
      manualResistive: { type: String },
      reps: { type: Number },
      comments: { type: String },
    },
    therapeuticActivities: {
      dynamicActivities: { type: String },
      staticActivities: { type: String },
      assistiveDevice: { type: String },
      reps: { type: Number },
    },
    progress: {
      towardsGoals: { type: String },
      skilledTreatment: { type: [String] }, // List of treatments provided
    },
    plan: {
      prescribedPlan: { type: String }, // Continue, change, or discharge
      comments: { type: String },
    },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const OTVisit = mongoose.model("OTVisit", otVisitSchema);

module.exports = OTVisit;
