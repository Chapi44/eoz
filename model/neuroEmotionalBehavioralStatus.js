const mongoose = require("mongoose");

const neuroEmotionalBehavioralStatusSchema = new mongoose.Schema({
  neurologicalAssessment: {
    orientedTo: { type: String }, // e.g., "Person,Place,Time"
    issues: { type: String }, // e.g., "No problems identified,Dizziness,Headache"
    comments: { type: String }, // Additional comments
  },
  mentalStatusInterview: {
    conducted: { type: String }, // e.g., "Yes" or "No"
    acuteMentalStatusChange: { type: String }, // e.g., "Yes" or "No"
    inattention: { type: String }, // e.g., "Behavior not present,Behavior fluctuates"
    disorganizedThinking: { type: String }, // e.g., "Behavior not present"
    alteredConsciousness: { type: String }, // e.g., "Lethargic,Comatose"
    cognitiveFunctioning: { type: String }, // e.g., "Alert,Requires prompting"
    whenConfused: { type: String }, // e.g., "Never,In new or complex situations"
    whenAnxious: { type: String }, // e.g., "None of the time"
  },
  emotionalStatus: {
    moodInterview: {
      littleInterestPleasure: {
        presence: { type: String }, // "Yes" or "No"
        frequency: { type: String }, // e.g., "Never", "1-6 days"
      },
      feelingDown: {
        presence: { type: String },
        frequency: { type: String },
      },
      troubleSleeping: {
        presence: { type: String },
        frequency: { type: String },
      },
      feelingTired: {
        presence: { type: String },
        frequency: { type: String },
      },
      poorAppetite: {
        presence: { type: String },
        frequency: { type: String },
      },
      feelingBadAboutSelf: {
        presence: { type: String },
        frequency: { type: String },
      },
      troubleConcentrating: {
        presence: { type: String },
        frequency: { type: String },
      },
      Movingorspeaking : {
        presence: { type: String },
        frequency: { type: String },
      },
      Thoughts:{
        presence: { type: String },
        frequency: { type: String },
      },
      severityScore: { type: Number },
    },
    isolationLoneliness: {
    type: String
    },
  },
  behavioralStatus: {
    cognitiveBehavioralSymptoms: {
      memoryDeficit: { type: Boolean },
      impairedDecisionMaking: { type: Boolean },
      verbalDisruption: { type: Boolean },
      physicalAggression: { type: Boolean },
      disruptiveBehavior: { type: Boolean },
      delusionalBehavior: { type: Boolean },
    },
    frequencyOfDisruptiveBehavior: {
 type:String
    },
  },
  planOfCare: {
    mentalCognitiveStatus: {
      orientedX3: { type: Boolean },
      orientedToSelf: { type: Boolean },
      orientedToSelfAndPlace: { type: Boolean },
      agitated: { type: Boolean },
      comatose: { type: Boolean },
      forgetful: { type: Boolean },
      depressed: { type: Boolean },
      disoriented: { type: Boolean },
      lethargic: { type: Boolean },
      other: { type: String },
    },
    ordersForDisciplineAndTreatment: {
      alterationInNeurologicalStatus: { type: Boolean },
      alterationInMentalStatus: { type: Boolean },
    },
  },
}, { timestamps: true });

const NeuroEmotionalBehavioralStatus = mongoose.model(
  "NeuroEmotionalBehavioralStatus",
  neuroEmotionalBehavioralStatusSchema
);

module.exports = NeuroEmotionalBehavioralStatus;
