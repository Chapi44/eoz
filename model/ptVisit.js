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
    homeboundReason: { type: [String] },
    functionalLimitations: { type: [String] },
    vitalSigns: {
      sbp: { type: String },
      dbp: { type: String },
      heartRate: { type: String },
      respiratoryRate: { type: String },
      temperature: { type: String },
      weight: { type: String },
      oxygenSaturation: { type: String },
    },
    therapeuticExercises: {
      rom: { type: String },
      active: { type: String },
      activeAssistive: { type: String },
      resistiveManual: { type: String },
      resistiveWeights: { type: String },
      stretching: { type: String },
      reps: { type: Number },
    },
    bedMobilityTraining: {
      rolling: { type: String },
      supToSit: { type: String },
      scooting: { type: String },
      sitToStand: { type: String },
      reps: { type: Number },
    },
    transferTraining: {
      transferTypes: { type: [String] }, // E.g., Bed-Chair, Chair-Toilet, etc.
      sittingBalance: {
        static: { type: String },
        dynamic: { type: String },
      },
      standingBalance: {
        static: { type: String },
        dynamic: { type: String },
      },
      comments: { type: String },
    },
    gaitTraining: {
      ambulationDistance: { type: Number }, // in feet
      assistiveDevice: { type: String },
      assistance: { type: String },
      gaitQualityDeviation: { type: String },
      stairs: {
        numberOfSteps: { type: Number },
        railUsage: { type: [String] }, // E.g., "Rail 1", "Rail 2"
      },
      reps: { type: Number },
    },
    teaching: {
      patient: { type: Boolean, default: false, default: false },
      caregiver: { type: Boolean, default: false, default: false },
      topics: { type: [String] }, // E.g., HEP, Safe Transfer, etc.
    },
    pain: {
      levelBeforeTherapy: { type: Number },
      levelAfterTherapy: { type: Number },
      location: { type: String },
      relievedBy: { type: String },
      comments: { type: String },
    },
    assessment: { type: String },
    plan: {
      continuePlan: { type: Boolean, default: false, default: false },
      changePlan: { type: Boolean, default: false, default: false },
      dischargePlan: { type: Boolean, default: false, default: false },
      comments: { type: String },
    },
    progress: {
      towardsGoals: { type: String },
      goalsMet: { type: Boolean, default: false, default: false },
      skilledTreatmentProvided: { type: [String] }, // List of treatments provided
    },
    narrative: { type: String },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const PTVisit = mongoose.model("PTVisit", ptVisitSchema);

module.exports = PTVisit;
