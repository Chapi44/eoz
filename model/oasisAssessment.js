const mongoose = require("mongoose");

const oasisAssessmentSchema = mongoose.Schema({
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
  assessmentDate: {
    type: Date,
    required: true,
  },
  nursesigniturepictures:{
    type: [String],
    default: [],
  },
  patientsigniturepictures:{
    type:[String],
     default:[]
    },
  // Start of Care or Resumption of Care data
  startOfCare: {
    type: Boolean,
    default: false,
  },
  resumptionOfCare: {
    type: Boolean,
    default: false,
  },
  discharge: {
    type: Boolean,
    default: false,  // Indicates if the patient has been discharged
  },

  // Patient demographics
  patientDemographics: {
    ethnicity: { type: String },
    race: { type: String },
    language: { type: String },
    livingSituation: { type: String },  // e.g., Alone, With Family, etc.
  },

  // Clinical Record Items
  clinicalRecord: {
    primaryDiagnosis: { type: String },  // ICD-10 code
    otherDiagnoses: [{ type: String }],  // List of additional ICD-10 codes
    medications: [{ name: { type: String }, dosage: { type: String }, frequency: { type: String } }],
    allergies: [{ type: String }],
  },

  // Functional Status
  functionalStatus: {
    mobility: { type: String, enum: ["Independent", "With Assistance", "Bedridden"], required: true },
    bathing: { type: String, enum: ["Independent", "With Assistance", "Unable"], required: true },
    dressing: { type: String, enum: ["Independent", "With Assistance", "Unable"], required: true },
    toileting: { type: String, enum: ["Independent", "With Assistance", "Unable"], required: true },
    eating: { type: String, enum: ["Independent", "With Assistance", "Unable"], required: true },
    ambulation: { type: String, enum: ["Independent", "With Assistance", "Unable"], required: true },
  },

  // Sensory Status
  sensoryStatus: {
    vision: { type: String, enum: ["Normal", "Impaired", "Blind"] },
    hearing: { type: String, enum: ["Normal", "Impaired", "Deaf"] },
    speech: { type: String, enum: ["Normal", "Impaired", "Non-verbal"] },
  },

  // Cognitive Status
  cognitiveStatus: {
    cognitiveFunctioning: { type: String, enum: ["Alert", "Confused", "Comatose"] },
    decisionMaking: { type: String, enum: ["Independent", "Needs Assistance", "Unable"] },
  },
 // Health Metrics
 painLevel: { type: Number, min: 0, max: 10 },
 bloodSugar: { type: Number },
 bloodPressure: {
   systolic: { type: Number },
   diastolic: { type: Number },
 },
 heartRate: { type: Number },  // in BPM
 respiratoryRate: { type: Number },  // breaths per minute
 oxygenSaturation: { type: Number },  // SpO2 in percentage
 temperature: { type: Number },  // Body temperature
 weight: { type: Number },  // Patient weight
 functionalMobilityScore: { type: String },  // Mobility assessment



  // Pain Assessment
  painStatus: {
    painPresence: { type: Boolean, default: false },
    painFrequency: { type: String, enum: ["None", "Occasional", "Constant"] },
    painIntensity: { type: String, enum: ["Mild", "Moderate", "Severe"] },
    painManagement: { type: String },  // Describe any pain control methods
  },

  // Medication Management
  medicationManagement: {
    ableToManageMedications: { type: Boolean, default: false },
    medicationHelpRequired: { type: String, enum: ["None", "Some", "Full Assistance"] },
  },

  // Skin and Wound Status
  skinStatus: {
    woundsPresent: { type: Boolean, default: false },
    pressureUlcers: { 
      stage1: { type: Number, default: 0 },
      stage2: { type: Number, default: 0 },
      stage3: { type: Number, default: 0 },
      stage4: { type: Number, default: 0 },
    },
    woundCarePlan: { type: String },
  },

  // Respiratory Status
  respiratoryStatus: {
    shortnessOfBreath: { type: String, enum: ["None", "Mild", "Moderate", "Severe"] },
    oxygenUse: { type: Boolean, default: false },
  },

  // Discharge Plan
  dischargePlan: {
    dischargeTo: { type: String, enum: ["Home", "Assisted Living", "Hospital", "Other"] },
    followUpCare: { type: String },  // Describe follow-up care recommendations
  },

  // Additional Notes
  additionalNotes: {
    type: String,
  },
}, { timestamps: true });

const OASISAssessment = mongoose.model("OASISAssessment", oasisAssessmentSchema);

module.exports = OASISAssessment;
