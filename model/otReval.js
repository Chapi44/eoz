const mongoose = require("mongoose");

const otReEvalSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the "User" model
      required: false, // Optional, can be removed if you want it to be required
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
    priorLevelOfFunction: { type: String },
    pertinentMedicalHistory: { type: String },
    livingSituation: {
      dwellingLevel: {
        type: String,
        enum: ["One", "Multiple"],
        default: null,
      }, // Specifies whether it’s one or multiple levels
      steps: {
        type: String,
        default: null,
      }, // Includes the number of steps or "Yes"/"No" as applicable
      livesWith: {
        type: String,
        enum: ["Alone", "Family", "Friends", "Significant Other", "Other"],
        default: null,
      }, // Tracks who the individual lives with
      caregiverSupport: {
        type: String,
        enum: [
          "Willing caregiver available",
          "Limited caregiver support",
          "No caregiver available",
        ],
        default: null,
      }, // Specifies the type of caregiver support available
      homeSafetyBarriers: {
        type: String,
        default: null,
      }, // Free-text field for additional notes on home safety barriers
    },
    homeboundReason: {
      requiresTaxingEffort: { type: Boolean, default: false }, // "Requires considerable and taxing effort."
      needsAssistWithTransfer: { type: Boolean, default: false }, // "Needs assist with transfer."
      needsAssistLeavingHome: { type: Boolean, default: false }, // "Needs assist leaving the home."
      severeSOBUponExertion: { type: Boolean, default: false }, // "Severe SOB upon exertion."
      medicalRestriction: { type: Boolean, default: false }, // "Medical restriction."
      needsAssistWithAmbulation: { type: Boolean, default: false }, // "Needs assist with ambulation."
      unableToBeUpLongPeriod: { type: Boolean, default: false }, // "Unable to be up for long period."
      unsafeToGoOutAlone: { type: Boolean, default: false }, // "Unsafe to go out of home alone."
    }, // Array to capture multiple reasons
    functionalMobility: {
      bedMobility: {
        assistance: { type: String, default: "" }, // Level of assistance for bed mobility
        assistiveDevice: { type: String, default: "" }, // Device used for bed mobility
      },
      bedToWCTransfers: {
        assistance: { type: String, default: "" }, // Level of assistance for bed/WC transfers
        assistiveDevice: { type: String, default: "" }, // Device used for bed/WC transfers
      },
      toiletTransfer: {
        assistance: { type: String, default: "" }, // Level of assistance for toilet transfers
        assistiveDevice: { type: String, default: "" }, // Device used for toilet transfers
      },
      tubShowerTransfer: {
        assistance: { type: String, default: "" }, // Level of assistance for tub/shower transfers
        assistiveDevice: { type: String, default: "" }, // Device used for tub/shower transfers
      },
      comment: { type: String, default: "" }, // Free-text field for additional comments
    },
    adlSkills: {
      selfFeeding: {
        assistance: { type: String, default: "" }, // Level of assistance for self-feeding
        assistiveDevice: { type: String, default: "" }, // Device used for self-feeding
      },
      oralHygiene: {
        assistance: { type: String, default: "" }, // Level of assistance for oral hygiene
        assistiveDevice: { type: String, default: "" }, // Device used for oral hygiene
      },
      grooming: {
        assistance: { type: String, default: "" }, // Level of assistance for grooming
        assistiveDevice: { type: String, default: "" }, // Device used for grooming
      },
      toileting: {
        assistance: { type: String, default: "" }, // Level of assistance for toileting
        assistiveDevice: { type: String, default: "" }, // Device used for toileting
      },
      upperBodyBathing: {
        assistance: { type: String, default: "" }, // Level of assistance for upper body bathing
        assistiveDevice: { type: String, default: "" }, // Device used for upper body bathing
      },
      lowerBodyBathing: {
        assistance: { type: String, default: "" }, // Level of assistance for lower body bathing
        assistiveDevice: { type: String, default: "" }, // Device used for lower body bathing
      },
      upperBodyDressing: {
        assistance: { type: String, default: "" }, // Level of assistance for upper body dressing
        assistiveDevice: { type: String, default: "" }, // Device used for upper body dressing
      },
      lowerBodyDressing: {
        assistance: { type: String, default: "" }, // Level of assistance for lower body dressing
        assistiveDevice: { type: String, default: "" }, // Device used for lower body dressing
      },
      comment: { type: String, default: "" }, // Free-text field for additional comments
    },
    instrumentalADL: {
      housekeeping: {
        assistance: { type: String, default: "" }, // Level of assistance for housekeeping
        assistiveDevice: { type: String, default: "" }, // Device used for housekeeping
      },
      mealPrep: {
        assistance: { type: String, default: "" }, // Level of assistance for meal preparation
        assistiveDevice: { type: String, default: "" }, // Device used for meal preparation
      },
      laundry: {
        assistance: { type: String, default: "" }, // Level of assistance for laundry
        assistiveDevice: { type: String, default: "" }, // Device used for laundry
      },
      telephoneUse: {
        assistance: { type: String, default: "" }, // Level of assistance for telephone use
        assistiveDevice: { type: String, default: "" }, // Device used for telephone use
      },
      moneyManagement: {
        assistance: { type: String, default: "" }, // Level of assistance for money management
        assistiveDevice: { type: String, default: "" }, // Device used for money management
      },
      medicationManagement: {
        assistance: { type: String, default: "" }, // Level of assistance for medication management
        assistiveDevice: { type: String, default: "" }, // Device used for medication management
      },
      comment: { type: String, default: "" }, // Free-text field for additional comments
    },

    // Balance Section
    balance: {
      sitting: {
        static: { type: String, default: "" }, // Static sitting balance description
        dynamic: { type: String, default: "" }, // Dynamic sitting balance description
      },
      standing: {
        static: { type: String, default: "" }, // Static standing balance description
        dynamic: { type: String, default: "" }, // Dynamic standing balance description
      },
    },
    physicalAssessment: [
      {
        part: { type: String, required: true }, // Body part (e.g., Shoulder, Elbow)
        actions: [
          {
            action: { type: String, required: true }, // Action (e.g., Flexion, Extension)
            romRight: { type: String, default: "" }, // Range of Motion (Right)
            romLeft: { type: String, default: "" }, // Range of Motion (Left)
            strengthRight: { type: String, default: "" }, // Strength (Right)
            strengthLeft: { type: String, default: "" }, // Strength (Left)
          },
        ],
      },
    ],

    painAssessment: {
      location: { type: String },
      level: { type: String },
      increasedBy: { type: String },
      relievedBy: { type: String },
    },
    sensoryPerceptualSkills: [
      {
        area: { type: String, required: true }, // Area being assessed (e.g., Arm, Leg, etc.)
        sharpDull: {
          right: { type: String, default: "" }, // Assessment for sharp/dull on the right
          left: { type: String, default: "" }, // Assessment for sharp/dull on the left
        },
        lightFirm: {
          right: { type: String, default: "" }, // Assessment for light/firm on the right
          left: { type: String, default: "" }, // Assessment for light/firm on the left
        },
        touch: {
          right: { type: String, default: "" }, // Assessment for touch on the right
          left: { type: String, default: "" }, // Assessment for touch on the left
        },
        proprioception: {
          right: { type: String, default: "" }, // Assessment for proprioception on the right
          left: { type: String, default: "" }, // Assessment for proprioception on the left
        },
      },
    ],
    visualSkills: {
      acuity: {
        intact: { type: Boolean, default: false }, // Intact vision
        impaired: { type: Boolean, default: false }, // Impaired vision
        double: { type: Boolean, default: false }, // Double vision
        blurred: { type: Boolean, default: false }, // Blurred vision
      },
      tracking: {
        unilaterally: { type: Boolean, default: false }, // Unilateral tracking
        bilaterally: { type: Boolean, default: false }, // Bilateral tracking
        smooth: { type: Boolean, default: false }, // Smooth tracking
        jumpy: { type: Boolean, default: false }, // Jumpy tracking
        notTracking: { type: Boolean, default: false }, // Not tracking
      },
      visualFieldCutOrNeglect: {
        right: { type: Boolean, default: false }, // Suspected neglect or visual field cut on the right
        left: { type: Boolean, default: false }, // Suspected neglect or visual field cut on the left
      },
    },
    cognitiveStatus: {
      memory: {
        shortTerm: { type: String, default: "" }, // Assessment of short-term memory
        longTerm: { type: String, default: "" }, // Assessment of long-term memory
      },
      attentionConcentration: { type: String, default: "" }, // Assessment of attention and concentration
      auditoryComprehension: { type: String, default: "" }, // Assessment of auditory comprehension
      visualComprehension: { type: String, default: "" }, // Assessment of visual comprehension
      selfControl: { type: String, default: "" }, // Assessment of self-control
      sequencing: { type: String, default: "" }, // Assessment of sequencing ability
      problemSolving: { type: String, default: "" }, // Assessment of problem-solving skills
      copingSkills: { type: String, default: "" }, // Assessment of coping skills
      ableToExpressNeeds: { type: String, default: "" }, // Ability to express needs
      safetyJudgment: { type: String, default: "" }, // Assessment of safety and judgment
      initiationOfActivity: { type: String, default: "" }, // Assessment of initiation of activity
      comments: { type: String, default: "" }, // Free-text field for additional comments
    },
    motorComponents: {
      fineMotorCoordination: {
        right: { type: String, default: "" }, // Assessment of fine motor coordination on the right side
        left: { type: String, default: "" }, // Assessment of fine motor coordination on the left side
      },
      grossMotorCoordination: {
        right: { type: String, default: "" }, // Assessment of gross motor coordination on the right side
        left: { type: String, default: "" }, // Assessment of gross motor coordination on the left side
      },
      handedness: {
        rightHanded: { type: Boolean, default: false }, // Whether the individual is right-handed
        leftHanded: { type: Boolean, default: false }, // Whether the individual is left-handed
      },
      orthosisUsed: { type: Boolean, default: false }, // Whether orthosis is used
      neededSpecify: { type: String, default: "" }, // Free-text to specify additional needs
      comments: { type: String, default: "" }, // Free-text field for additional comments or observations
    },
    assessmentSection: {
      assessment: { type: String, default: "" }, // Free-text field for assessment details
      narrative: { type: String, default: "" }, // Free-text field for narrative description
      testSTEST: { type: String, default: "" }, // Free-text field for test STEST details
      standardizedTest: {
        prior: { type: String, default: "" }, // Results of the prior standardized test
        current: { type: String, default: "" }, // Results of the current standardized test
      },
    },
    assessmentDetails: {
      standardizedTest: {
        katzIndex: { type: String, default: "" }, // Katz Index score or details
        holePegTest: { type: String, default: "" }, // 9 Hole Peg Test score or details
        lawtonBrodyIADLScale: { type: String, default: "" }, // Lawton & Brody IADL Scale score or details
        miniMentalStateExam: { type: String, default: "" }, // Mini-Mental State Exam score or details
        other: { type: String, default: "" }, // Other standardized tests or notes
      },
      mdOrders: { type: String, default: "" }, // MD Orders provided
      dme: {
        available: { type: String, default: "" }, // Details of available DME
        needs: { type: String, default: "" }, // DME needs
        suggestion: { type: String, default: "" }, // DME suggestions
      },
      diagnosis: {
        medicalDiagnosis: {
          type: String,
          default: "",
        }, // Medical Diagnosis details
        medicalDiagnosisOnset: { type: String, default: "" }, // Onset date or details for Medical Diagnosis
        otDiagnosis: {
          type: String,
          default: "",
        }, // Occupational Therapy Diagnosis details
        otDiagnosisOnset: { type: String, default: "" }, // Onset date or details for OT Diagnosis
      },
      comment: { type: String, default: "" }, // Free-text field for additional comments
    },
    treatmentPlan: {
      otFrequencyDuration: {
        therapeuticExercise: { type: Boolean, default: false },
        neuromuscularReEducation: { type: Boolean, default: false },
        teachFallPreventionSafety: { type: Boolean, default: false },
        ptCaregiverEducationTraining: { type: Boolean, default: false },
        posturalControlTraining: { type: Boolean, default: false },
        wheelchairManagementTraining: { type: Boolean, default: false },
        teachWorkSimplification: { type: Boolean, default: false },
        selfCareManagementTraining: { type: Boolean, default: false },
        teachTaskSegmentation: { type: Boolean, default: false },
        electricalStimulation: { type: Boolean, default: false },
        ultrasound: { type: Boolean, default: false },
        therapeuticActivities: { type: Boolean, default: false },
        teachSafeEffectiveUseOfAssistiveDevice: {
          type: Boolean,
          default: false,
        },
        establishHomeExerciseProgram: { type: Boolean, default: false },
        sensoryIntegrativeTechniques: { type: Boolean, default: false },
        teachEnergyConservation: { type: Boolean, default: false },
        teachSafeEffectiveBreathing: { type: Boolean, default: false },
        communityWorkIntegration: { type: Boolean, default: false },
        cognitiveSkillsDevelopmentTraining: { type: Boolean, default: false },
        manualTherapyTechniques: { type: Boolean, default: false },
        other: { type: String, default: "" },
      },
      bodyParts: [
        {
          name: { type: String, default: "" }, // Name of the body part
          duration: { type: String, default: "" }, // Duration for the specific body part
        },
      ],
      dosageDetails: [
        {
          bodyPart: { type: String, default: "" }, // Name of the body part for dosage
          dosage: { type: String, default: "" }, // Dosage prescribed
          duration: { type: String, default: "" }, // Duration for the dosage
        },
      ],
    },
    otGoals: {
      additionalGoals: { type: String, default: "" }, // Free-text for additional goals
      rehabPotential: { type: String, default: "" }, // Free-text for rehab potential
      shortTermGoals: { type: String, default: "" }, // Free-text for OT short-term goals
      longTermGoals: { type: String, default: "" }, // Free-text for OT long-term goals
      patient: { type: Boolean, default: false }, // Checkbox for patient goal
      caregiverDesiredOutcomes: { type: Boolean, default: false }, // Checkbox for caregiver desired outcomes
    },
    otherDisciplineRecommendation: {
      na: { type: Boolean, default: false }, // Checkbox for "N/A"
      pt: { type: Boolean, default: false }, // Checkbox for PT (Physical Therapy)
      msw: { type: Boolean, default: false }, // Checkbox for MSW (Medical Social Worker)
      st: { type: Boolean, default: false }, // Checkbox for ST (Speech Therapy)
      podiatrist: { type: Boolean, default: false }, // Checkbox for Podiatrist
      other: { type: String, default: "" }, // Free-text for other disciplines
      reason: { type: String, default: "" }, // Free-text for reason of recommendation
    },
    rehab: {
      na: { type: Boolean, default: false }, // Checkbox for N/A
      rehabDiagnosis: { type: String, default: "" }, // Free-text field for rehab diagnosis
      rehabPotential: {
        good: { type: Boolean, default: false }, // Checkbox for "Good"
        fair: { type: Boolean, default: false }, // Checkbox for "Fair"
        poor: { type: Boolean, default: false }, // Checkbox for "Poor"
      },
    },
    dischargePlan: {
      na: { type: Boolean, default: false }, // Checkbox for N/A
      dischargedToCareOf: {
        physician: { type: Boolean, default: false }, // Checkbox for "Physician"
        caregiver: { type: Boolean, default: false }, // Checkbox for "Caregiver"
        selfcare: { type: Boolean, default: false }, // Checkbox for "Selfcare"
      },
      dischargePlans: {
        caregiverAbleToManage: { type: Boolean, default: false }, // Checkbox for "Discharge when caregiver is willing and able"
        goalsMet: { type: Boolean, default: false }, // Checkbox for "Discharge when goals met"
      },
    },
    skilledCareSchema: {
      skilledCareProvided: {
        na: { type: Boolean, default: false }, // Checkbox for N/A
        trainingTopics: { type: String, default: "" }, // Free-text for training topics
        trained: {
          patient: { type: Boolean, default: false }, // Checkbox for Patient trained
          caregiver: { type: Boolean, default: false }, // Checkbox for Caregiver trained
        },
        treatmentPerformed: { type: String, default: "" }, // Free-text for treatment performed
        patientResponse: { type: String, default: "" }, // Free-text for patient response
      },
      careCoordination: {
        na: { type: Boolean, default: false }, // Checkbox for N/A
        details: { type: String, default: "" }, // Free-text for care coordination details
      },
      safetyIssuesInstructionEducation: {
        na: { type: Boolean, default: false }, // Checkbox for N/A
        details: { type: String, default: "" }, // Free-text for safety issues/instruction/education details
      },
      notification: {
        notified: {
          patient: { type: Boolean, default: false }, // Checkbox for Patient notified
          caregiver: { type: Boolean, default: false }, // Checkbox for Caregiver notified
        },
        understandsAndAgrees: {
          yes: { type: Boolean, default: false }, // Checkbox for Yes
          no: { type: Boolean, default: false }, // Checkbox for No
        },
        physicianNotified: { type: Boolean, default: false }, // Checkbox for Physician notified
        physicianComments: { type: String, default: "" }, // Free-text for physician comments
      },
      treatmentPerformed: { type: String, default: "" }, // Free-text for details of treatment performed
    },
    narrative: {
      details: { type: String, default: "" }, // Free-text field to record narrative details or observations
    },
    signature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const OTReEval = mongoose.model("OTReEval", otReEvalSchema);

module.exports = OTReEval;
