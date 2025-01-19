const mongoose = require("mongoose");

const stReEvaluationSchema = mongoose.Schema(
  {
    orderNumber: {
      type: String,
      default: () => `STRE-${Math.floor(100000 + Math.random() * 900000)}`, // Automatically generate order number
    },
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
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    diagnosis: {
      medical: { type: String },
      onset: { type: Date },
    },
    homeboundReason: {
      needsAssistance: { type: Boolean, default: false },
      residualWeakness: { type: Boolean, default: false },
      requiresAmbulationAssist: { type: Boolean, default: false },
      confusion: { type: Boolean, default: false },
      adaptiveDevices: { type: Boolean, default: false },
      severeSOB: { type: Boolean, default: false },
      medicalRestrictions: { type: Boolean, default: false },
      other: { type: String },
    },
    priorFunctionLevel: { type: String },
    livingSituation: { type: String },
    medicalHistory: { type: String },
    safeSwallowingEvaluation: { type: Boolean, default: false },
    videoFluoroscopy: { type: Boolean, default: false },
    currentDiet: {
      texture: { type: String },
      liquids: { type: String },
    },
    cognitionFunction: {
      orientation: { type: String },
      attentionSpan: { type: String },
      shortTermMemory: { type: String },
      longTermMemory: { type: String },
      judgment: { type: String },
      problemSolving: { type: String },
      organization: { type: String },
      comments: { type: String },
    },
    speechEvaluation: {
      oralFacialExam: { type: String },
      articulation: { type: String },
      prosody: { type: String },
      voiceRespiration: { type: String },
      intelligibility: { type: String },
      other: { type: String },
    },
    swallowingFunction: {
      chewingAbility: { type: String },
      oralStageManagement: { type: String },
      pharyngealStageManagement: { type: String },
      reflexTime: { type: String },
      comments: { type: String },
    },
    verbalExpression: {
      naming: { type: String },
      appropriateComplexSentences: { type: String },
      conversation: { type: String },
      comments: { type: String },
    },
    writingFunction: {
      lettersNumbers: { type: String },
      words: { type: String },
      sentences: { type: String },
      spellingFormulation: { type: String },
      comments: { type: String },
    },
    painAssessment: {
      location: { type: String },
      level: { type: Number },
      increasedBy: { type: String },
      relievedBy: { type: String },
    },
    dme: {
      available: { type: String },
      needs: { type: String },
      suggestions: { type: String },
    },
    treatmentPlan: {
      evaluation: { type: Boolean, default: false },
      patientEducation: { type: Boolean, default: false },
      speechArticulation: { type: Boolean, default: false },
      languageDisorders: { type: Boolean, default: false },
      nonOralCommunication: { type: Boolean, default: false },
      languageProcessing: { type: Boolean, default: false },
      safeSwallowing: { type: Boolean, default: false },
      facialExercises: { type: Boolean, default: false },
      voiceDisorders: { type: Boolean, default: false },
      dysphagiaTreatments: { type: Boolean, default: false },
      auralRehabilitation: { type: Boolean, default: false },
      alaryngealSpeech: { type: Boolean, default: false },
      foodTextureRecommendations: { type: Boolean, default: false },
      articulationTraining: { type: Boolean, default: false },
      painManagement: { type: Boolean, default: false },
    },
    rehabPotential: { type: String, enum: ["Good", "Fair", "Poor"] },
    dischargePlan: {
      to: { type: String, enum: ["Physician", "Caregiver", "Selfcare"] },
      when: { type: String, enum: ["When goals met", "Caregiver is ready"] },
      comments: { type: String },
    },
    careCoordination: {
      topicsTrained: { type: [String] },
      safetyIssues: { type: String },
      notifications: { type: [String] }, // ["Patient", "Caregiver"]
      physicianNotified: { type: Boolean, default: false },
      physicianComments: { type: String },
    },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const STReEvaluation = mongoose.model("STReEvaluation", stReEvaluationSchema);

module.exports = STReEvaluation;
