const mongoose = require("mongoose");

const oasisAssessmentSchema = mongoose.Schema(
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
    homeHealthAgency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HomeHealthAgency", // Reference to the HomeHealthAgency model
      required: true,
    },
    assessmentDate: {
      type: Date,
    },
    // Demographics Section
    
    demographics: {
      firstName: { type: String },
      lastName: { type: String },
      birthDate: { type: Date },
      gender: { type: String },
      maritalStatus: { type: String },
      phone: { type: String },
      address: {
        line1: { type: String },
        line2: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String },
      },
      ethnicity: { type: [String] },
      race: { type: [String] },
      language: { type: String },
      interpreterRequired: { type: Boolean, default: false },
      paymentSource: { type: String },
    },
    patientHistoryAndDiagnoses: {
      vitalSigns: {
        temperature: { type: Number }, // Example: Temperature in Fahrenheit
        respirations: { type: Number }, // Respirations per minute
        oxygenSaturation: {
          percentage: { type: Number }, // O2 Saturation in percentage
          method: { type: String }, // Example: "Pulse Oximeter"
        },
        pulseRate: { type: Number }, // Pulse in bpm
        bloodPressure: {
          lying: { systolic: { type: Number }, diastolic: { type: Number } },
          sitting: { systolic: { type: Number }, diastolic: { type: Number } },
          standing: { systolic: { type: Number }, diastolic: { type: Number } },
        },
        bmiCalculator: {
          weight: { type: Number }, // Weight in pounds
          height: { type: Number }, // Height in inches
          bmi: { type: Number }, // Calculated BMI
        },
        additionalMeasurementsUnavailable: { type: Boolean, default: false },
      },
      inpatientDischarges: {
        type: String, // Example: "N/A - Patient was not discharged from an inpatient facility"
      },
      diagnosesSymptomControl: {
        primaryDiagnosis: {
          diagnosisItem: { type: String }, // Example: "Cerebral infarction due to thrombosis"
          icdCode: { type: String }, // Example: "I63.02"
          severity: { type: Number }, // Severity Level
        },
        otherDiagnoses: [
          {
            diagnosisItem: { type: String }, // Example: "Other muscle spasm"
            icdCode: { type: String }, // Example: "M62.838"
            severity: { type: Number }, // Severity Level
          },
        ],
      },
      comorbidities: {
        conditions: [
          { type: String }, // Example: "Peripheral Vascular Disease", "Diabetes Mellitus"
        ],
        noneOfTheAbove: { type: Boolean, default: false },
        noInformationAvailable: { type: Boolean, default: false },
      },
      specialTreatments: {
        cancerTreatments: {
          chemotherapy: { type: Boolean, default: false },
          radiation: { type: Boolean, default: false },
        },
        respiratoryTherapies: {
          oxygenTherapy: { type: Boolean, default: false },
          suctioning: { type: Boolean, default: false },
          tracheostomyCare: { type: Boolean, default: false },
          invasiveVentilator: { type: Boolean, default: false },
          nonInvasiveVentilator: { type: Boolean, default: false },
        },
        otherTreatments: {
          ivMedications: { type: Boolean, default: false },
          transfusions: { type: Boolean, default: false },
          dialysis: { type: Boolean, default: false },
          ivAccess: { type: Boolean, default: false },
        },
        noneOfTheAbove: { type: Boolean, default: false },
        noInformationAvailable: { type: Boolean, default: false },
      },
      allergies: {
        activeAllergies: [{ type: String }], // List of active allergies
        deletedAllergies: [{ type: String }], // List of deleted allergies
      },
      comments: {
        templates: { type: String }, // Example: Predefined templates for comments
        additionalComments: { type: String }, // Free-text comments
      },
    },
     // Risk Assessment Section
     riskAssessment: {
      shinglesVaccination: {
        received: { type: Boolean, default: false },
      },
      immunizationLog: {
        activeImmunizations: [{ type: String }],
        declinedImmunizations: [{ type: String }],
      },
      potentialRiskForInfection: {
        performed: { type: Boolean, default: false },
        predictors: {
          diarrhea: { type: Boolean, default: false },
          immunocompromised: { type: Boolean, default: false },
          indwellingCatheter: { type: Boolean, default: false },
          ivVenousAccessDevice: { type: Boolean, default: false },
          postOpAbdominalSurgery: { type: Boolean, default: false },
          postOpThoracicSurgery: { type: Boolean, default: false },
          postOpOtherSurgery: { type: Boolean, default: false },
          respiratoryIssues: { type: Boolean, default: false },
          wounds: { type: Boolean, default: false },
          instrumentation: { type: Boolean, default: false },
          other: { type: String },
        },
        confoundingFactors: {
          absenceOfCaregiver: { type: Boolean, default: false },
          decreasedAlertness: { type: Boolean, default: false },
          decreasedCognition: { type: Boolean, default: false },
          inadequateCleaning: { type: Boolean, default: false },
          poorHandHygiene: { type: Boolean, default: false },
          poorHydration: { type: Boolean, default: false },
          medications: { type: Boolean, default: false },
          poorMobility: { type: Boolean, default: false },
          poorNutrition: { type: Boolean, default: false },
          underlyingDisease: { type: Boolean, default: false },
          other: { type: String },
        },
        infectionRisk: { type: String },
      },
      infectiousDiseaseProfile: {
        hasInfectiousDisease: { type: Boolean, default: false },
        details: { type: String },
      },
      hospitalizationRiskAssessment: {
        toolUsed: { type: String },
        emergencyPreparedness: { type: String },
      },
      riskForHospitalization: {
        historyOfFalls: { type: Boolean, default: false },
        weightLoss: { type: Boolean, default: false },
        multipleHospitalizations: { type: Boolean, default: false },
        emergencyVisits: { type: Boolean, default: false },
        declineInMentalOrBehavioralStatus: { type: Boolean, default: false },
        difficultyComplyingWithMedicalInstructions: { type: Boolean, default: false },
        takingFiveOrMoreMedications: { type: Boolean, default: false },
        currentlyRequiresSupervision: { type: Boolean, default: false },
        otherRisks: { type: String },
      },
      // New Section: Height and Weight
      heightAndWeight: {
        heightInInches: { type: Number }, // Height in inches
        weightInPounds: { type: Number }, // Weight in pounds
        comments: { type: String }, // Additional comments
        informationNotAvailable: { type: Boolean, default: false }, // If information is not available
      },
      // New Section: Orders for Discipline and Treatment
      ordersForDisciplineAndTreatment: {
        highRiskPotentialForHospitalization: { type: Boolean, default: false },
        needForImmunization: { type: Boolean, default: false },
        highRiskPotentialForInfection: { type: Boolean, default: false },
        needForInfectiousDiseaseManagement: { type: Boolean, default: false },
      },
    },
        // Prognosis Section
        prognosis: {
          advanceCarePlan: { type: Boolean, default: false }, // Whether Advance Care Plan is checked
          planOfCarePrognosis: {
            response: {
              type: String, // Example: "Guarded", "Poor", "Fair", "Good", "Excellent"
            },
          },
          comments: {
            templates: { type: String }, // Selected template for comments
            additionalComments: { type: String }, // Free-text additional comments
          },
          ordersForDisciplineAndTreatment: {
            needForAdvanceCarePlanning: { type: Boolean, default: false }, // Checkbox for "Need for Advance Care Planning"
          },
          trainingAndEducationResources: {
            physicalAssessment: { type: Boolean, default: false }, // Training option 1
            fifteenMinuteWalk: { type: Boolean, default: false }, // Training option 2
            woundManager: { type: Boolean, default: false }, // Training option 3
          },
        },
        
        
        supportiveAssistance: {
          culturalPreferences: {
            spiritualOrCulturalPractice: { type: Boolean, default: false },
          },
          transportation: {
            lackOfTransportation: [{ type: String }], // Example: "Yes, It Has Kept Me From Medical Appointments"
          },
          healthLiteracy: {
            response: { type: String }, // Example: "Never", "Rarely", "Sometimes", etc.
          },
          psychosocialAssessment: {
            noProblemsIdentified: { type: Boolean, default: false },
            homeEnvironmentAltered: { type: Boolean, default: false },
            suspectedAbuseNeglect: { type: Boolean, default: false },
            barriersToHealthStatus: { type: Boolean, default: false },
            communityResourcesNeeded: { type: Boolean, default: false },
            communityResourcesProvidingAssistance: { type: Boolean, default: false },
          },
          patientLivingSituation: {
            livingArrangement: {
              type: String, // Example: "Patient lives alone", "Patient lives with others"
            },
            availabilityOfAssistance: {
              aroundTheClock: { type: Boolean, default: false },
              regularDaytime: { type: Boolean, default: false },
              regularNighttime: { type: Boolean, default: false },
              occasionalOrShortTerm: { type: Boolean, default: false },
              noAssistanceAvailable: { type: Boolean, default: false },
            },
          },
          planOfCare: {
            safetyMeasures: {
              twentyFourHourSupervision: { type: Boolean, default: false },
              diabeticNoCutNails: { type: Boolean, default: false },
              emergencyDisasterPlan: { type: Boolean, default: false },
              neutropenicPrecautions: { type: Boolean, default: false },
              proneToSkinBreakdown: { type: Boolean, default: false },
              properBiohazardWasteHandling: { type: Boolean, default: false },
              sharpsSafety: { type: Boolean, default: false },
              infectionControl: { type: Boolean, default: false },
              aspirationPrecautions: { type: Boolean, default: false },
              dmeAndElectricalSafety: { type: Boolean, default: false },
              bleedingPrecautions: { type: Boolean, default: false },
              elevateHeadOfBed: { type: Boolean, default: false },
              fallPrecautions: { type: Boolean, default: false },
              o2Precautions: { type: Boolean, default: false },
              proneToFracturesPrecaution: { type: Boolean, default: false },
              properPositioningDuringMeals: { type: Boolean, default: false },
              seizurePrecautions: { type: Boolean, default: false },
              safetyInADLs: { type: Boolean, default: false },
              sideRailsUp: { type: Boolean, default: false },
              slowPositionChanges: { type: Boolean, default: false },
              supportDuringTransferAndAmbulation: { type: Boolean, default: false },
              useOfAssistiveDevices: { type: Boolean, default: false },
              keepPathwaysClear: { type: Boolean, default: false },
              presenceOfAnimals: { type: Boolean, default: false },
              other: { type: String }, // Free-text for additional safety measures
            },
          },
          ordersForDisciplineAndTreatment: {
            alterationInHomeEnvironment: { type: Boolean, default: false },
          },
        },

    sensoryStatus: {
      sensoryAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        ringingInEars: { type: Boolean, default: false },
        hearingImpaired: { type: Boolean, default: false },
        earDrainage: { type: Boolean, default: false },
        slurredSpeech: { type: Boolean, default: false },
        aphasia: { type: Boolean, default: false },
        painInEars: { type: Boolean, default: false },
        abnormalPupilsOrVision: { type: Boolean, default: false },
        comments: { type: String },
      },
      hearing: {
        abilityToHear: {
          type: String, // Options: "Adequate", "Minimal difficulty", "Moderate difficulty", "Highly impaired", "No information available"
        },
      },
      vision: {
        abilityToSee: {
          type: String, // Options: "Adequate", "Impaired", "Moderately impaired", "Highly impaired", "Severely impaired", "No information available"
        },
      },
    },
    painStatus: {
      painAssessment: {
        interferesWithActivity: { type: String }, // Example: "Yes", "No", "Unknown"
        comments: { type: String },
      },
      painEffectOnSleep: {
        type: String, // Example: "Does not apply", "Rarely or not at all", "Occasionally", "Frequently", "Almost constantly", "Unable to answer"
      },
      ordersForDisciplineAndTreatment: {
        alterationInComfortPain: { type: Boolean, default: false }, // Example: true if there's an alteration in comfort due to pain
      },
    },
    integumentaryStatus: {
      integumentaryAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        bruising: { type: Boolean, default: false },
        cool: { type: Boolean, default: false },
        clammy: { type: Boolean, default: false },
        dry: { type: Boolean, default: false },
        flushed: { type: Boolean, default: false },
        cyanotic: { type: Boolean, default: false },
        jaundice: { type: Boolean, default: false },
        pallor: { type: Boolean, default: false },
        rash: { type: Boolean, default: false },
        wounds: { type: Boolean, default: false },
        poorTurgor: { type: Boolean, default: false },
        pruritus: { type: Boolean, default: false },
        incision: { type: Boolean, default: false },
        skinLesionRequiringIntervention: { type: Boolean, default: false },
        comments: { type: String },
      },
      nortonPressureSoreRiskAssessment: {
        physicalCondition: { type: String }, // Values: Good, Fair, Poor, Very Bad
        mentalCondition: { type: String }, // Values: Alert, Apathetic, Confused, Stuporous
        activity: { type: String }, // Values: Ambulant, Walks with Help, Chairbound, Bedfast
        mobility: { type: String }, // Values: Full, Slightly Impaired, Very Limited, Immobile
        incontinence: { type: String }, // Values: None, Occasional, Usually Urinary, Urinary and Fecal
        totalscore: { type: String }, 
      },
      pressureUlcer: {
        hasUnhealedPressureUlcer: { type: Boolean, default: false }, // Yes or No
        ulcerCount: { type: Number, default: 0 }, // Example: 0, 1, 2, etc.
        ulcerStages: {
          stage1: { type: Boolean, default: false },
          stage2: { type: Boolean, default: false },
          stage3: { type: Boolean, default: false },
          stage4: { type: Boolean, default: false },
        },
      },
      stasisUlcer: {
        hasStasisUlcer: { type: Boolean, default: false }, // Yes or No
        description: {
          observable: { type: Boolean, default: false },
          unobservable: { type: Boolean, default: false },
        },
      },
      surgicalWound: {
        hasSurgicalWound: { type: Boolean, default: false }, // Yes or No
        description: {
          observable: { type: Boolean, default: false },
          unobservable: { type: Boolean, default: false },
        },
      },
      //woundmanager
      ordersForDisciplineAndTreatment: {
        alterationInIntegumentaryStatus: { type: Boolean, default: false }, // Example: true or false
      },
    },

   // Respiratory Status Section
   respiratoryStatus: {
    respiratoryAssessment: {
      noProblemsIdentified: { type: Boolean, default: false },
      accessoryMuscleUse: { type: Boolean, default: false },
      cpapBipap: { type: Boolean, default: false },
      orthopnea: { type: Boolean, default: false },
      abnormalBreathSounds: { type: Boolean, default: false },
      dyspnea: { type: Boolean, default: false },
      coughNonproductive: { type: Boolean, default: false },
      coughProductive: { type: Boolean, default: false },
      nebulizer: { type: Boolean, default: false },
      oxygenUseIntermittent: { type: Boolean, default: false },
      paroxysmalNocturnalDyspnea: { type: Boolean, default: false },
      tachypnea: { type: Boolean, default: false },
      tracheostomy: { type: Boolean, default: false },
      oxygenUseContinuous: { type: Boolean, default: false },
      comments: { type: String },
    },
    shortnessOfBreath: {
      level: {
        type: String, // Example values: "0", "1", "2", "3", "4"
        description: {
          type: String, // Example values: "Patient is not short of breath", "When walking more than 20 feet", etc.
        },
      },
    },
    ordersForDisciplineAndTreatment: {
      alterationInRespiratoryStatus: { type: Boolean, default: false }, // Example: true or false
    },
  },
      // Cardiac Status Section
      cardiacStatus: {
        cardiacAssessment: {
          noProblemsIdentified: { type: Boolean, default: false },
          activityIntolerance: { type: Boolean, default: false },
          abnormalPulses: { type: Boolean, default: false },
          aicd: { type: Boolean, default: false }, // Automated implantable cardioverter-defibrillator
          distendedNeckVeins: { type: Boolean, default: false },
          abnormalHeartRhythm: { type: Boolean, default: false },
          abnormalLowerExtremitySensation: { type: Boolean, default: false },
          capillaryRefillGreaterThan3Sec: { type: Boolean, default: false },
          fatigueWeakness: { type: Boolean, default: false },
          orthopnea: { type: Boolean, default: false },
          dizzinessLightheadedness: { type: Boolean, default: false },
          paroxysmalNocturnalDyspnea: { type: Boolean, default: false },
          orthostaticHypotension: { type: Boolean, default: false },
          palpitations: { type: Boolean, default: false },
          pacemaker: { type: Boolean, default: false },
          edemaPitting: { type: Boolean, default: false },
          edemaNonPitting: { type: Boolean, default: false },
          chestPain: { type: Boolean, default: false },
          abnormalHeartSounds: { type: Boolean, default: false },
          abnormalLowerExtremityAppearance: { type: Boolean, default: false },
          exhibitingSignsOfHeartFailure: { type: Boolean, default: false },
          comments: { type: String },
        },
        ordersForDisciplineAndTreatment: {
          alterationInCardiacStatus: { type: Boolean, default: false }, // Problem statement
        },
      },
       // Elimination Status Section
    eliminationStatus: {
      urinaryAssessment: {
        hasUTITreatmentInPast14Days: { type: String }, // No, Yes, N/A, Unknown
        incontinenceOrCatheterPresence: { type: String }, // 0, 1, 2 (No incontinence, Patient is incontinent, Requires catheter)
      },
      bowelIncontinenceFrequency: {
        frequency: { type: String }, // 0 to 5 or "N/A", "Unknown"
      },
      ostomyForBowelElimination: {
        present: { type: String }, // 0, 1, 2
      },
      genitourinaryAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        nocturia: { type: Boolean, default: false },
        abnormalUrineAppearance: { type: Boolean, default: false },
        dialysis: { type: Boolean, default: false },
        indwellingFoleyCatheter: { type: Boolean, default: false },
        intermittentCatheterization: { type: Boolean, default: false },
        suprapubicCatheter: { type: Boolean, default: false },
        utiSignsOrSymptoms: { type: Boolean, default: false },
        discharge: { type: Boolean, default: false },
        comments: { type: String },
      },
      gastrointestinalAssessment: {
        lastBM: { type: Date },
        noProblemsIdentified: { type: Boolean, default: false },
        ascites: { type: Boolean, default: false },
        hemorrhoids: { type: Boolean, default: false },
        nausea: { type: Boolean, default: false },
        tenderness: { type: Boolean, default: false },
        abnormalBowelSounds: { type: Boolean, default: false },
        bowelIncontinence: { type: Boolean, default: false },
        distended: { type: Boolean, default: false },
        hard: { type: Boolean, default: false },
        laxativeEnemaUse: { type: Boolean, default: false },
        pain: { type: Boolean, default: false },
        vomiting: { type: Boolean, default: false },
        abnormalStool: { type: Boolean, default: false },
        comments: { type: String },
      },
      ordersForDisciplineAndTreatment: {
        alterationInGenitourinaryStatus: { type: Boolean, default: false },
        alterationInGastrointestinalStatus: { type: Boolean, default: false },
      },
    },

    careManagement: {
      typesAndSourcesOfAssistance: {
        supervisionAndSafety: {
          type: String, // E.g., "No assistance needed", "Non-agency caregiver(s) currently provide assistance", etc.
        },
      },
      comments: {
        type: String, // Text field for additional comments (up to 5000 characters).
        maxlength: 5000,
      },
      ordersForDisciplineAndTreatment: {
        needForProcessMeasures: {
          type: Boolean, default: false, // Boolean to indicate whether process measures are required.
          default: false,
        },
      },
      trainingAndEducationResources: {
        physicalAssessment: {
          type: Boolean, default: false, // Boolean to indicate the use of physical assessment training resources.
          default: false,
        },
        fifteenMinuteWalk: {
          type: Boolean, default: false, // Boolean to indicate the use of 15-minute walk resources.
          default: false,
        },
        woundManager: {
          type: Boolean, default: false, // Boolean to indicate the use of wound manager training resources.
          default: false,
        },
      },
    },
    endocrineHematologicalAssessment: {
      assessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        anemia: { type: Boolean, default: false },
        cancer: { type: Boolean, default: false },
        hypothyroidism: { type: Boolean, default: false },
        hyperthyroidism: { type: Boolean, default: false },
        diabetes: { type: Boolean, default: false },
      },
      comments: { type: String }, // Field to store additional comments
      ordersForDisciplineAndTreatment: {
        alterationInGlucoseMetabolism: { type: Boolean, default: false },
        alterationInHematologicalStatus: { type: Boolean, default: false },
      },
    },
    functionalAbilitiesGoals: {
      priorFunctioningEverydayActivities: {
        selfCare: { type: String }, // E.g., "Independent", "Needs Assistance"
        indoorMobility: { type: String },
        stairs: { type: String },
        functionalCognition: { type: String },
      },
      priorDeviceUse: {
        manualWheelchair: { type: Boolean, default: false },
        motorizedWheelchairOrScooter: { type: Boolean, default: false },
        mechanicalLift: { type: Boolean, default: false },
        walker: { type: Boolean, default: false },
        orthoticsProsthetics: { type: Boolean, default: false },
        noneOfTheAbove: { type: Boolean, default: false },
      },
      selfCarePerformance: {
        eating: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        oralHygiene: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        toiletingHygiene: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        showerBathing: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        upperBodyDressing: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        lowerBodyDressing: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        puttingOnTakingOffFootwear: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
      },
      mobilityPerformance: {
        rollLeftAndRight: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        sitToLying: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        lyingToSittingOnBed: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        sitToStand: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        chairBedToChairTransfer: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        toiletTransfer: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        carTransfer: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        walk10Feet: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        walk50FeetTwoTurns: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        walk150Feet: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        walk10FeetUnevenSurfaces: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        stepOneCurb: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        stepsFour: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        stepsTwelve: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        pickingUpObject: {
          socRocPerformance: { type: String },
          dischargeGoal: { type: String },
        },
        usesWheelchairScooter: { type: Boolean, default: false },
      },
      comments: { type: String }, // Field for additional comments
    },
    functionalStatus: {
      musculoskeletalAssessment: {
        issues: { type: String }, // E.g., "No problems identified, Poor balance, Atrophy"
        comments: { type: String }, // Free-text for additional comments
      },
      fallRiskAssessment: {
        riskFactors: { type: String }, // E.g., "Diagnosis of M or N conditions, History of falls"
        riskScore: { type: String }, // E.g., "Low Risk, Medium Risk"
      },
      grooming: {
        ability: { type: String }, // E.g., "Able to groom self independently, Requires assistance"
        comments: { type: String }, // Free-text for additional grooming-related comments
      },
      dressingAbility: {
        upperBody: { type: String }, // E.g., "Able to dress upper body independently"
        lowerBody: { type: String }, // E.g., "Needs assistance for dressing lower body"
        comments: { type: String }, // Free-text for additional dressing-related comments
      },
      bathingToileting: {
        bathingAbility: { type: String }, // E.g., "Independent, Requires assistance"
        toiletingAbility: { type: String }, // E.g., "Independent, Requires help"
        comments: { type: String }, // Free-text for additional bathing/toileting comments
      },
      transferring: {
        ability: { type: String }, // E.g., "Independent, Requires assistance"
        comments: { type: String }, // Free-text for transferring comments
      },
      ambulationLocomotion: {
        ability: { type: String }, // E.g., "Ambulates independently, Requires supervision"
        comments: { type: String }, // Free-text for ambulation/locomotion comments
      },
      feedingEating: {
        ability: { type: String }, // E.g., "Able to feed self independently, Requires help"
        comments: { type: String }, // Free-text for feeding/eating-related comments
      },
      planOfCare: {
        functionalLimitations: {
          limitations: { type: String }, // E.g., "Ambulation, Dyspnea with minimal exertion"
          other: { type: String }, // Free-text for other limitations not listed
        },
        activitiesPermittedRestricted: {
          permittedRestricted: { type: String }, // E.g., "No restrictions, Bedrest required"
          other: { type: String }, // Free-text for additional permitted/restricted activities
        },
      },
      ordersForDisciplineAndTreatment: {
        problemStatement: {
          musculoskeletalIssues: { type: Boolean, default: false }, // "Alteration in Musculoskeletal Status"
          fallPreventionPlan: { type: Boolean, default: false }, // "Need for Fall Prevention Plan"
        },
      },
    },
    medications: {
      medicationAdministration: {
        adminTime: { type: String },
        route: { type: String },
        location: { type: String },
        medicationType: { type: String },
        frequency: { type: String },
        dose: { type: String },
        patientResponse: { type: String },
        PRNReason: { type: String },
        comment: { type: String },
      },
      medicationStatus: {
        medications: {
          received: { type: Boolean, default: false },
          reconciled: { type: Boolean, default: false },
          issuesIdentified: { type: Boolean, default: false },
          adequateUse: { type: Boolean, default: false },
          PRNUse: { type: Boolean, default: false },
          initialPrescriptionsFilled: { type: Boolean, default: false },
          infusion: { type: Boolean, default: false },
        },
        pharmacyInfo: { type: String },
      },
      drugRegimenReview: {
        significantMedicationIssues: { type: String }, // Values like "No issues", "Yes - issues found", etc.
        followUp: { type: String }, // Values like "No", "Yes", etc.
        highRiskEducation: { type: String }, // Values like "No", "Yes", etc.
      },
      medicationManagement: {
        oralMedications: {
          ability: { type: String }, // E.g., "Able to take medications at correct time"
        },
        injectableMedications: {
          ability: { type: String }, // E.g., "Able to independently take correct medication"
        },
      },
      highRiskDrugs: {
        isTaking: { type: Boolean, default: false },
        categories: {
          antipsychotic: { type: Boolean, default: false },
          anticoagulant: { type: Boolean, default: false },
          antibiotic: { type: Boolean, default: false },
          opioid: { type: Boolean, default: false },
          antiepileptic: { type: Boolean, default: false },
          hypoglycemics: { type: Boolean, default: false },
          noneOfTheAbove: { type: Boolean, default: false },
        },
        indicationNeeded: { type: Boolean, default: false },
      },
      comments: { type: String },
      ordersForDisciplineAndTreatment: {
        medicationManagement: { type: Boolean, default: false },
        injections: { type: Boolean, default: false },
        parenteralTherapy: { type: Boolean, default: false },
        diagnosticTesting: { type: Boolean, default: false },
      },
    },
    neuroEmotionalBehavioralStatus: {
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
          Movingorspeaking: {
            presence: { type: String },
            frequency: { type: String },
          },
          Thoughts: {
            presence: { type: String },
            frequency: { type: String },
          },
          severityScore: { type: Number },
        },
        isolationLoneliness: { type: String },
      },
      behavioralStatus: {
        cognitiveBehavioralSymptoms: {
          memoryDeficit: { type: Boolean, default: false },
          impairedDecisionMaking: { type: Boolean, default: false },
          verbalDisruption: { type: Boolean, default: false },
          physicalAggression: { type: Boolean, default: false },
          disruptiveBehavior: { type: Boolean, default: false },
          delusionalBehavior: { type: Boolean, default: false },
        },
        frequencyOfDisruptiveBehavior: {
          type: String,
        },
      },
      planOfCare: {
        mentalCognitiveStatus: {
          orientedX3: { type: Boolean, default: false },
          orientedToSelf: { type: Boolean, default: false },
          orientedToSelfAndPlace: { type: Boolean, default: false },
          agitated: { type: Boolean, default: false },
          comatose: { type: Boolean, default: false },
          forgetful: { type: Boolean, default: false },
          depressed: { type: Boolean, default: false },
          disoriented: { type: Boolean, default: false },
          lethargic: { type: Boolean, default: false },
          other: { type: String },
        },
        ordersForDisciplineAndTreatment: {
          alterationInNeurologicalStatus: { type: Boolean, default: false },
          alterationInMentalStatus: { type: Boolean, default: false },
        },
      },
    },

       nutritionAssessment: {
      nutritionAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        difficultyChewing: { type: Boolean, default: false },
        edentulous: { type: Boolean, default: false },
        tubeFeedingPresent: { type: Boolean, default: false },
        anorexic: { type: Boolean, default: false },
        fairAppetite: { type: Boolean, default: false },
        poorAppetite: { type: Boolean, default: false },
        poorHydration: { type: Boolean, default: false },
        soreThroat: { type: Boolean, default: false },
        TPNorLipids: { type: Boolean, default: false },
        weightLoss: { type: Boolean, default: false },
        weightGain: { type: Boolean, default: false },
        comments: { type: String },
      },
      nutritionalHealthScreen: {
        questions: [
          {
            question: { type: String },
            answer: { type: Boolean, default: false },
          },
        ],
        totalScore: { type: Number },
        riskCategory: { type: String }, // e.g., "Good Nutritional Status", "Moderate Nutritional Risk", or "High Nutritional Risk"
      },
      nutritionalApproaches: {
        parenteralFeeding: { type: Boolean, default: false },
        mechanicallyAlteredDiet: { type: Boolean, default: false },
        therapeuticDiet: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
        noneOfTheAbove: { type: Boolean, default: false },
        noInformationAvailable: { type: Boolean, default: false },
      },
      planOfCareNutritionalRequirements: {
        regular: { type: Boolean, default: false },
        mechanicalSoft: { type: Boolean, default: false },
        heartHealthy: { type: Boolean, default: false },
        lowCholesterol: { type: Boolean, default: false },
        lowFat: { type: Boolean, default: false },
        sodiumRestriction: { type: Boolean, default: false },
        noAddedSalt: { type: Boolean, default: false },
        calorieADA: { type: Boolean, default: false },
        noConcentratedSweets: { type: Boolean, default: false },
        consistentDiet: { type: Boolean, default: false },
        renalDiet: { type: Boolean, default: false },
        enteralNutrition: { type: Boolean, default: false },
        TPN: { type: Boolean, default: false },
        supplements: { type: Boolean, default: false },
        fluidRestriction: { type: Boolean, default: false },
        other: { type: String },
      },
      ordersForDisciplineAndTreatment: {
        alterationInNutrition: { type: Boolean, default: false },
      },
    },
    supplyManagerDME: {
      durableMedicalEquipment: {
        bedsideCommode: { type: Boolean, default: false, default: false },
        cane: { type: Boolean, default: false, default: false },
        elevatedToiletSeat: { type: Boolean, default: false, default: false },
        grabBars: { type: Boolean, default: false, default: false },
        hospitalBed: { type: Boolean, default: false, default: false },
        nebulizer: { type: Boolean, default: false, default: false },
        oxygen: { type: Boolean, default: false, default: false },
        tubShowerBench: { type: Boolean, default: false, default: false },
        walker: { type: Boolean, default: false, default: false },
        wheelchair: { type: Boolean, default: false, default: false },
        other: { type: Boolean, default: false, default: false },
      },
      durableMedicalEquipmentProvider: {
        name: { type: String, maxlength: 255 }, // Name of the provider
        phone: { type: String, maxlength: 50 }, // Phone number of the provider
        suppliesProvided: { type: String, maxlength: 1000 }, // DME/Supplies provided
      },
      comments: {
        type: String, // Additional comments
        maxlength: 5000, // Matches the form limit
      },
    },
    therapyNeed: {
      therapyNeed: {
        type: Number, // Total therapy visits
        
      },
      notApplicable: {
        type: Boolean, default: false, // Whether marked as "Not Applicable"
        default: false,
      },
      comments: {
        type: String, // Additional details
        maxlength: 5000, // Character limit
      },
      ordersForDisciplineAndTreatment: {
        PT: { type: Boolean, default: false, default: false }, // Physical Therapy need
        OT: { type: Boolean, default: false, default: false }, // Occupational Therapy need
        ST: { type: Boolean, default: false, default: false }, // Speech-Language Therapy need
      },
    },
    aideCarePlan: {
      ordersForDisciplineAndTreatment: {
        hhaNeedForHomeHealthAide: { type: Boolean, default: false, default: false }, // Checkbox for "HHA - Need for Home Health Aide"
        needForOtherAideServicesMedicaid: { type: Boolean, default: false, default: false }, // Checkbox for "Need for Other Aide Services (Medicaid)"
      },
      trainingAndEducationResources: {
        physicalAssessment: { type: Boolean, default: false, default: false }, // Training option for Physical Assessment
        fifteenMinuteWalk: { type: Boolean, default: false, default: false }, // Training option for 15-minute walk
        woundManager: { type: Boolean, default: false, default: false }, // Training option for Wound Manager
      },
      comments: {
        type: String, // Additional comments
        maxlength: 5000,
      },
    },

    summaryOfCare: {
      patientGoal: {
        personalHealthcareGoals: { type: String }, // Patient's personal healthcare goals
      },
      careCoordination: {
        coordinatedCareWith: { type: String }, // Name/Title
        regarding: { type: String }, // Reason or purpose
      },
      planOfCareReview: {
        planOfCare: { type: Boolean, default: false, default: false },
        patientResponse: { type: Boolean, default: false, default: false },
        legalRepresentativeResponse: { type: Boolean, default: false, default: false },
        legalRepresentativeInvolvement: { type: Boolean, default: false, default: false },
        noLegalRepresentativeInvolved: { type: Boolean, default: false, default: false },
        identifyAssistivePeople: { type: Boolean, default: false, default: false },
        other: { type: String }, // Additional information
      },
      patientStrengths: {
        noIssuesIdentified: { type: Boolean, default: false, default: false },
        motivatedLearner: { type: Boolean, default: false, default: false },
        strongSupportSystem: { type: Boolean, default: false, default: false },
        absenceOfMultipleComorbidities: { type: Boolean, default: false, default: false },
        enhancedSocioeconomicStatus: { type: Boolean, default: false, default: false },
        collegeGraduate: { type: Boolean, default: false, default: false },
        highSchoolGraduate: { type: Boolean, default: false, default: false },
        otherStrengths: { type: String
        },
      },
      visitInterventions: {
        reviewedAndInstructedOn: {
          legal: { type: Boolean, default: false, default: false },
          medicationReview: { type: Boolean, default: false, default: false },
          diseaseProcess: { type: Boolean, default: false, default: false },
          safety: { type: Boolean, default: false, default: false },
          disciplinesScheduling: { type: Boolean, default: false, default: false },
          physicianContact: { type: Boolean, default: false, default: false },
          na: { type: Boolean, default: false, default: false },
        },
        interventions: {
          template: { type: String }, // Selected template for interventions
          details: { type: String, maxlength: 5000 }, // Intervention details
        },
        responseToTeaching: { type: String, maxlength: 5000 }, // Response to procedure/teaching
      },
      admissionSummaryF2FAddendum: {
        template: { type: String }, // Selected template
        visitNarrative: { type: String, maxlength: 5000 }, // Narrative details
      },
      planOfCareDisciplineOrdersAndTreatment: {
        skilledNurseEvaluationPerformed: { type: Boolean, default: false, default: false },
        therapyOnlyCase: { type: Boolean, default: false, default: false },
        nonSkilledPlanOfCareManagement: { type: Boolean, default: false, default: false },
        noFurtherVisitsRequired: { type: Boolean, default: false, default: false },
        additionalPhysicianInvolvement: { type: Boolean, default: false, default: false },
        patientRightsExplanation: { type: Boolean, default: false, default: false },
      },
      rehabilitationPotentialAndDischargePlans: {
        rehabilitationPotential: { type: String }, // E.g., "Good", "Poor", etc.
        dischargePlans: {
          providerAfterDischarge: { type: String }, // Care provider
          dischargePatientWhen: {
            selfManageDiseaseProcess: { type: Boolean, default: false, default: false },
            caregiverAidInManagement: { type: Boolean, default: false, default: false },
            returnToStableStatus: { type: Boolean, default: false, default: false },
            selfManagePain: { type: Boolean, default: false, default: false },
            performProcedureWithoutPrompt: { type: Boolean, default: false, default: false },
            caregiverPerformProcedureWithoutPrompt: { type: Boolean, default: false, default: false },
            woundsHealed: { type: Boolean, default: false, default: false },
            caregiverManageWounds: { type: Boolean, default: false, default: false },
            caregiverDemonstrateInstruction: { type: Boolean, default: false, default: false },
            other: { type: String },
          },
        },
      },
      disciplineFrequencyAndDuration: {
        snFrequency: {
          frequency: { type: String },
          description: { type: String },
          effectiveDate: { type: Date },
        },
        ptFrequency: {
          frequency: { type: String },
          description: { type: String },
          effectiveDate: { type: Date },
        },
        otFrequency: {
          frequency: { type: String },
          description: { type: String },
          effectiveDate: { type: Date },
        },
        stFrequency: {
          frequency: { type: String },
          description: { type: String },
          effectiveDate: { type: Date },
        },
        mswFrequency: {
          frequency: { type: String },
          description: { type: String },
          effectiveDate: { type: Date },
        },
        hhaFrequency: {
          frequency: { type: String },
          description: { type: String },
          effectiveDate: { type: Date },
        },
      },
      trainingAndEducationResources: {
        physicalAssessment: { type: Boolean, default: false, default: false },
        oasis15MinuteWalk: { type: Boolean, default: false, default: false },
        woundManager: { type: Boolean, default: false, default: false },
      },
    },
        
    additionalNotes: { type: String },
     // New Fields
  medicalNecessity: { type: String }, // Field #27
  admissionNarrative: { type: String }, // Field #28
  nurseTherapistSignatureDate: { type: Date }, // Field #28B
  dateHHAReceivedCopy: { type: Date }, // Field #29
  dateHHAReceivedSigned: { type: Date }, // Field #29
  certifyingPhysician: {
    name: { type: String },
    address: { type: String },
  }, // Field #30
  physicianSignatureDate: { type: Date }, // Field #32
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
    toJSON: { virtuals: true }, // Ensure virtual fields are included in JSON responses
    toObject: { virtuals: true }, // Ensure virtual fields are included in objects
  }
);


// Virtual field for Physician or Practitioner Statement
oasisAssessmentSchema.virtual("physicianOrPractitionerStatement").get(function () {
  const formattedDate = this.updatedAt
    ? this.updatedAt.toISOString().slice(0, 10) // Formats date as YYYY-MM-DD
    : "N/A";
  return `I certify/recertify that this patient is confined to his/her home (as outlined in section 30.1.1 in Chapter 7 of the Medicare Benefit Policy Manual) and needs intermittent skilled nursing care, physical therapy and/or speech therapy or continues to need occupational therapy. The patient is under my care, and I have authorized services on this plan of care and will periodically review the plan. The patient had a face-to-face encounter with an allowed provider type on ${formattedDate} and the encounter was related to the primary reason for home health care.`;
});

const OASISAssessment = mongoose.model("OASISAssessment", oasisAssessmentSchema);

module.exports = OASISAssessment;
