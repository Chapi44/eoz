const mongoose = require("mongoose");

const stReevaluationSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",  // References the "User" model
      required: false,  // Optional, can be removed if you want it to be required
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
    homeboundReason: {
      needsAssistance: { type: Boolean, default: false },
      residualWeakness: { type: Boolean, default: false },
      requiresAssistanceToAmbulate: { type: Boolean, default: false },
      confusionUnableToLeaveHomeAlone: { type: Boolean, default: false },
      dependentOnAdaptiveDevices: { type: Boolean, default: false },
      severeSOBUponExertion: { type: Boolean, default: false },
      unableToLeaveHomeUnassisted: { type: Boolean, default: false },
      medicalRestrictions: { type: Boolean, default: false },
      other: { type: String, default: "" },
    },
    priorLevelOfFunctioning: { type: String, default: "" },
    livingSituation: {
      supportSystem: { type: String, default: "" },
      pertinentHistory: { type: String, default: "" },
    },
    medicalPrecautions: { type: String, default: "" },
    swallowingEvaluation: {
      safeSwallowingEvaluation: { type: Boolean, default: false },
      videoFluoroscopy: { type: Boolean, default: false },
    },
    currentDietTexture: {
      liquids: {
        thin: { type: Boolean, default: false },
        thickened: { type: Boolean, default: false },
        other: { type: String, default: "" },
      },
    },
    speechLanguageEvaluation: {
      cognitionFunction: {
        orientation: { type: String, default: "" },
        attentionSpan: { type: String, default: "" },
        shortTermMemory: { type: String, default: "" },
        longTermMemory: { type: String, default: "" },
        judgment: { type: String, default: "" },
        problemSolving: { type: String, default: "" },
        organization: { type: String, default: "" },
        comments: { type: String, default: "" },
      },
      speechVoiceFunction: {
        oralFacialExam: { type: String, default: "" },
        articulation: { type: String, default: "" },
        prosody: { type: String, default: "" },
        voiceRespiration: { type: String, default: "" },
        intelligibility: { type: String, default: "" },
        other: { type: String, default: "" },
        comments: { type: String, default: "" },
      },
      auditoryComprehension: {
        wordDiscrimination: { type: String, default: "" },
        oneStepDirections: { type: String, default: "" },
        twoStepDirections: { type: String, default: "" },
        complexSentences: { type: String, default: "" },
        conversationSpeech: { type: String, default: "" },
        reading: { type: String, default: "" },
        comments: { type: String, default: "" },
      },
      swallowingFunction: {
        chewingAbility: { type: String, default: "" },
        oralStageManagement: { type: String, default: "" },
        pharyngealStageManagement: { type: String, default: "" },
        reflexTime: { type: String, default: "" },
        otherComments: { type: String, default: "" },
      },
      verbalExpression: {
        naming: { type: String, default: "" },
        appropriateComplexSentences: { type: String, default: "" },
        conversationComments: { type: String, default: "" },
      },
      readingFunction: {
        lettersNumbers: { type: String, default: "" },
        words: { type: String, default: "" },
        simpleSentences: { type: String, default: "" },
        complexSentences: { type: String, default: "" },
        paragraphComments: { type: String, default: "" },
      },
      writingFunction: {
        lettersNumbers: { type: String, default: "" },
        words: { type: String, default: "" },
        sentences: { type: String, default: "" },
        spellingFormulation: { type: String, default: "" },
        simpleAdditionSubtraction: { type: String, default: "" },
        comments: { type: String, default: "" },
      },
    },
    dme: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      available: { type: String, default: "" }, // Details of available DME
      needs: { type: String, default: "" }, // Equipment needs
      suggestion: { type: String, default: "" }, // Suggestions for additional equipment
    },
    medicalDiagnosis: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      diagnosis: { type: String, default: "" }, // Medical diagnosis details
      onset: { type: String, default: "" }, // Onset of the medical diagnosis
      ptDiagnosis: {
        diagnosis: { type: String, default: "" }, // PT diagnosis details
        onset: { type: String, default: "" }, // Onset of the PT diagnosis
      },
      comment: { type: String, default: "" }, // Additional comments for the section
    },
    painAssessment: {
      location: { type: String, default: "" },
      level: { type: String, default: "" },
      increasedBy: { type: String, default: "" },
      relievedBy: { type: String, default: "" },
    },
    treatmentPlan: {
      evaluation: { type: Boolean, default: false },
      patientFamilyEducation: { type: Boolean, default: false },
      speechArticulationDisorders: { type: Boolean, default: false },
      languageDisorders: { type: Boolean, default: false },
      nonOralCommunication: { type: Boolean, default: false },
      languageProcessing: { type: Boolean, default: false },
      safeSwallowingEvaluation: { type: Boolean, default: false },
      facialExercises: { type: Boolean, default: false },
      rehabProgram: { type: Boolean, default: false },
      voiceDisorders: { type: Boolean, default: false },
      dysphagiaTreatments: { type: Boolean, default: false },
      auralRehabilitation: { type: Boolean, default: false },
      alaryngealSpeechSkills: { type: Boolean, default: false },
      foodTextureRecommendations: { type: Boolean, default: false },
      articulationVerbalExpression: { type: Boolean, default: false },
      painManagement: { type: Boolean, default: false },
      speechDysphagiaInstructionProgram: { type: Boolean, default: false }, // From the image
      careOfVoiceProsthesis: { type: Boolean, default: false }, // Removal, cleaning, maintenance
      teachDevelopCommSystem: { type: Boolean, default: false }, // Teaching/Developing Communication System
      trachInstAndCare: { type: Boolean, default: false }, // Tracheostomy Instruction and Care
      other: { type: String, default: "" }, // Free-text for additional treatments
    },
    frequencyDuration: { type: String, default: "" }, // ST Frequency & Duration
    equipmentRecommendations: { type: String, default: "" }, // Equipment Recommendations
    
    stGoals: {
      shortTerm: { type: String, default: "" },
      longTerm: { type: String, default: "" },
    },
    otherDisciplineRecommendation: {
      ot: { type: Boolean, default: false },
      pt: { type: Boolean, default: false },
      msw: { type: Boolean, default: false },
      podiatrist: { type: Boolean, default: false },
      other: { type: String, default: "" },
      reason: { type: String, default: "" },
    },
    rehabPotential: {
      good: { type: Boolean, default: false },
      fair: { type: Boolean, default: false },
      poor: { type: Boolean, default: false },
    },
    dischargePlan: {
      toCareOf: {
        caregiver: { type: Boolean, default: false },
        selfcare: { type: Boolean, default: false },
      },
      plans: {
        caregiverAbleToManage: { type: Boolean, default: false },
        goalsMet: { type: Boolean, default: false },
      },
    },
    skilledCareProvided: {
      trainingTopics: { type: String, default: "" },
      trained: {
        patient: { type: Boolean, default: false },
        caregiver: { type: Boolean, default: false },
      },
      treatmentPerformed: { type: String, default: "" },
      patientResponse: { type: String, default: "" },
    },
    safetyIssuesInstructionEducation: {
      details: { type: String, default: "" },
    },
    careCoordination: {
      details: { type: String, default: "" },
    },
    narrative: { type: String, default: "" },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const STReEvaluation = mongoose.model("STReEvaluation", stReevaluationSchema);

module.exports = STReEvaluation;
