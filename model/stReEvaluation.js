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
      ref: "User",
      required: false,
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    episodePeriod: {
      start: { type: Date,  }, // 5/31/2025
      end: { type: Date,  }, // 7/29/2025
    },
    visitDate: { type: Date,  }, // 7/15/2025
    visitStartTime: { type: String }, // (e.g., "09:00 AM")
    visitEndTime: { type: String },
    travelStartTime: { type: String },
    travelEndTime: { type: String },
    primaryDiagnosis: { type: String },
    secondaryDiagnosis: { type: String },
    associatedMileage: { type: String },
    surcharge: { type: String },
    previousNotes: { type: String }, // Selected from dropdown
    physician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming this references a User/Physician collection
      required: false,
    },

    homeboundReason: {
      needsAssistanceForAllActivities: { type: Boolean, default: false },
      confusionUnableToGoOutAlone: { type: Boolean, default: false },
      unableToSafelyLeaveHomeUnassisted: { type: Boolean, default: false },
      residualWeakness: { type: Boolean, default: false },
      dependentUponAdaptiveDevices: { type: Boolean, default: false },
      requiresAssistanceToAmbulate: { type: Boolean, default: false },
      severeSOBUponExertion: { type: Boolean, default: false },
      medicalRestrictions: { type: Boolean, default: false },
      other: { type: String, default: "" },
    },
    ordersForEvaluationOnly: { type: String, default: "" },
    medicalPrecautions: { type: String, default: "" },
    priorLevelOfFunctioning: { type: String, default: "" },
    livingSituationSupportSystem: { type: String, default: "" },
    pertinentMedicalSocialHistory: { type: String, default: "" },
    swallowingEvaluation: {
      safeSwallowingEvaluation: {
        type: String,
        enum: ["Yes", "No", ""],
        default: "",
      },
      videoFluoroscopy: {
        result: { type: String, enum: ["Yes", "No", ""], default: "" },
        details: { type: String, default: "" }, // For date, facility, physician if Yes
      },
    },
    currentDietTexture: { type: String, default: "" },
    liquids: {
      thin: { type: Boolean, default: false },
      thickened: { type: Boolean, default: false },
      thickenedSpecify: { type: String, default: "" },
      other: { type: Boolean, default: false },
      otherSpecify: { type: String, default: "" },
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
    modalities: {
      na: { type: Boolean, default: false },
      details: { type: String, default: "" }, // large free text field
    },

    // ST Goals
    stGoals: {
      na: { type: Boolean, default: false },
      shortTerm: {
        templates: { type: String, default: "" },
        goals: { type: String, default: "" }, // large free text field
        patient: { type: Boolean, default: false },
        caregiverDesiredOutcomes: { type: String, default: "" },
      },
      longTerm: {
        templates: { type: String, default: "" },
        goals: { type: String, default: "" }, // large free text field
      },
    },

    // Other Discipline Recommendation
    otherDisciplineRecommendation: {
      na: { type: Boolean, default: false },
      ot: { type: Boolean, default: false },
      msw: { type: Boolean, default: false },
      pt: { type: Boolean, default: false },
      podiatrist: {
        selected: { type: Boolean, default: false },
        other: { type: String, default: "" },
      },
      reason: { type: String, default: "" }, // template or text
      disciplines: { type: String, default: "" }, // textarea
    },

    // Rehab
    rehab: {
      na: { type: Boolean, default: false },
      diagnosis: { type: String, default: "" },
      potential: {
        good: { type: Boolean, default: false },
        fair: { type: Boolean, default: false },
        poor: { type: Boolean, default: false },
      },
      templates: { type: String, default: "" }, // templates dropdown
      comments: { type: String, default: "" }, // textarea
    },

    // Discharge Plan
    dischargePlan: {
      na: { type: Boolean, default: false },
      toCareOf: {
        physician: { type: Boolean, default: false },
        caregiver: { type: Boolean, default: false },
        selfCare: { type: Boolean, default: false },
      },
      plans: {
        caregiverAbleToManage: { type: Boolean, default: false },
        goalsMet: { type: Boolean, default: false },
      },
      templates: { type: String, default: "" },
      comments: { type: String, default: "" },
    },

    // Skilled Care Provided
    skilledCareProvided: {
      na: { type: Boolean, default: false },
      trainingTopics: { type: String, default: "" }, // template dropdown
      comments: { type: String, default: "" }, // textarea
      trained: {
        patient: { type: Boolean, default: false },
        caregiver: { type: Boolean, default: false },
      },
      treatmentPerformed: { type: String, default: "" }, // template
      treatmentPerformedDetails: { type: String, default: "" }, // textarea
      patientResponse: { type: String, default: "" }, // template
      patientResponseDetails: { type: String, default: "" }, // textarea
    },

    // Safety/Education/Care Coordination
    careCoordination: {
      na: { type: Boolean, default: false },
      templates: { type: String, default: "" },
      comments: { type: String, default: "" },
    },
    safetyIssuesInstructionEducation: {
      na: { type: Boolean, default: false },
      templates: { type: String, default: "" },
      comments: { type: String, default: "" },
    },

    // Notification Section
    notification: {
      patient: { type: Boolean, default: false },
      caregiverUnderstands: { type: Boolean, default: false },
      physicianNotified: { type: Boolean, default: false },
      comments: { type: String, default: "" },
      yes: { type: Boolean, default: false },
      no: { type: Boolean, default: false },
    },

    // Signature/Completion
    clinician: { type: String, default: "" },
    signature: { type: String, default: "" },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const STReEvaluation = mongoose.model("STReEvaluation", stReevaluationSchema);

module.exports = STReEvaluation;
