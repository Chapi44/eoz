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
      interpreterRequired: { type: Boolean },
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
        additionalMeasurementsUnavailable: { type: Boolean },
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
        noneOfTheAbove: { type: Boolean },
        noInformationAvailable: { type: Boolean },
      },
      specialTreatments: {
        cancerTreatments: {
          chemotherapy: { type: Boolean },
          radiation: { type: Boolean },
        },
        respiratoryTherapies: {
          oxygenTherapy: { type: Boolean },
          suctioning: { type: Boolean },
          tracheostomyCare: { type: Boolean },
          invasiveVentilator: { type: Boolean },
          nonInvasiveVentilator: { type: Boolean },
        },
        otherTreatments: {
          ivMedications: { type: Boolean },
          transfusions: { type: Boolean },
          dialysis: { type: Boolean },
          ivAccess: { type: Boolean },
        },
        noneOfTheAbove: { type: Boolean },
        noInformationAvailable: { type: Boolean },
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
        received: { type: Boolean },
      },
      immunizationLog: {
        activeImmunizations: [{ type: String }],
        declinedImmunizations: [{ type: String }],
      },
      potentialRiskForInfection: {
        performed: { type: Boolean },
        predictors: {
          diarrhea: { type: Boolean },
          immunocompromised: { type: Boolean },
          indwellingCatheter: { type: Boolean },
          ivVenousAccessDevice: { type: Boolean },
          postOpAbdominalSurgery: { type: Boolean },
          postOpThoracicSurgery: { type: Boolean },
          postOpOtherSurgery: { type: Boolean },
          respiratoryIssues: { type: Boolean },
          wounds: { type: Boolean },
          instrumentation: { type: Boolean },
          other: { type: String },
        },
        confoundingFactors: {
          absenceOfCaregiver: { type: Boolean },
          decreasedAlertness: { type: Boolean },
          decreasedCognition: { type: Boolean },
          inadequateCleaning: { type: Boolean },
          poorHandHygiene: { type: Boolean },
          poorHydration: { type: Boolean },
          medications: { type: Boolean },
          poorMobility: { type: Boolean },
          poorNutrition: { type: Boolean },
          underlyingDisease: { type: Boolean },
          other: { type: String },
        },
        infectionRisk: { type: String },
      },
      infectiousDiseaseProfile: {
        hasInfectiousDisease: { type: Boolean },
        details: { type: String },
      },
      hospitalizationRiskAssessment: {
        toolUsed: { type: String },
        emergencyPreparedness: { type: String },
      },
      riskForHospitalization: {
        historyOfFalls: { type: Boolean },
        weightLoss: { type: Boolean },
        multipleHospitalizations: { type: Boolean },
        emergencyVisits: { type: Boolean },
        declineInMentalOrBehavioralStatus: { type: Boolean },
        difficultyComplyingWithMedicalInstructions: { type: Boolean },
        takingFiveOrMoreMedications: { type: Boolean },
        currentlyRequiresSupervision: { type: Boolean },
        otherRisks: { type: String },
      },
      // New Section: Height and Weight
      heightAndWeight: {
        heightInInches: { type: Number }, // Height in inches
        weightInPounds: { type: Number }, // Weight in pounds
        comments: { type: String }, // Additional comments
        informationNotAvailable: { type: Boolean }, // If information is not available
      },
      // New Section: Orders for Discipline and Treatment
      ordersForDisciplineAndTreatment: {
        highRiskPotentialForHospitalization: { type: Boolean },
        needForImmunization: { type: Boolean },
        highRiskPotentialForInfection: { type: Boolean },
        needForInfectiousDiseaseManagement: { type: Boolean },
      },
    },
        // Prognosis Section
        prognosis: {
          advanceCarePlan: { type: Boolean }, // Whether Advance Care Plan is checked
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
            needForAdvanceCarePlanning: { type: Boolean }, // Checkbox for "Need for Advance Care Planning"
          },
          trainingAndEducationResources: {
            physicalAssessment: { type: Boolean }, // Training option 1
            fifteenMinuteWalk: { type: Boolean }, // Training option 2
            woundManager: { type: Boolean }, // Training option 3
          },
        },
        
        
        supportiveAssistance: {
          culturalPreferences: {
            spiritualOrCulturalPractice: { type: Boolean },
          },
          transportation: {
            lackOfTransportation: [{ type: String }], // Example: "Yes, It Has Kept Me From Medical Appointments"
          },
          healthLiteracy: {
            response: { type: String }, // Example: "Never", "Rarely", "Sometimes", etc.
          },
          psychosocialAssessment: {
            noProblemsIdentified: { type: Boolean },
            homeEnvironmentAltered: { type: Boolean },
            suspectedAbuseNeglect: { type: Boolean },
            barriersToHealthStatus: { type: Boolean },
            communityResourcesNeeded: { type: Boolean },
            communityResourcesProvidingAssistance: { type: Boolean },
          },
          patientLivingSituation: {
            livingArrangement: {
              type: String, // Example: "Patient lives alone", "Patient lives with others"
            },
            availabilityOfAssistance: {
              aroundTheClock: { type: Boolean },
              regularDaytime: { type: Boolean },
              regularNighttime: { type: Boolean },
              occasionalOrShortTerm: { type: Boolean },
              noAssistanceAvailable: { type: Boolean },
            },
          },
          planOfCare: {
            safetyMeasures: {
              twentyFourHourSupervision: { type: Boolean },
              diabeticNoCutNails: { type: Boolean },
              emergencyDisasterPlan: { type: Boolean },
              neutropenicPrecautions: { type: Boolean },
              proneToSkinBreakdown: { type: Boolean },
              properBiohazardWasteHandling: { type: Boolean },
              sharpsSafety: { type: Boolean },
              infectionControl: { type: Boolean },
              aspirationPrecautions: { type: Boolean },
              dmeAndElectricalSafety: { type: Boolean },
              bleedingPrecautions: { type: Boolean },
              elevateHeadOfBed: { type: Boolean },
              fallPrecautions: { type: Boolean },
              o2Precautions: { type: Boolean },
              proneToFracturesPrecaution: { type: Boolean },
              properPositioningDuringMeals: { type: Boolean },
              seizurePrecautions: { type: Boolean },
              safetyInADLs: { type: Boolean },
              sideRailsUp: { type: Boolean },
              slowPositionChanges: { type: Boolean },
              supportDuringTransferAndAmbulation: { type: Boolean },
              useOfAssistiveDevices: { type: Boolean },
              keepPathwaysClear: { type: Boolean },
              presenceOfAnimals: { type: Boolean },
              other: { type: String }, // Free-text for additional safety measures
            },
          },
          ordersForDisciplineAndTreatment: {
            alterationInHomeEnvironment: { type: Boolean },
          },
        },

    sensoryStatus: {
      sensoryAssessment: {
        noProblemsIdentified: { type: Boolean },
        ringingInEars: { type: Boolean },
        hearingImpaired: { type: Boolean },
        earDrainage: { type: Boolean },
        slurredSpeech: { type: Boolean },
        aphasia: { type: Boolean },
        painInEars: { type: Boolean },
        abnormalPupilsOrVision: { type: Boolean },
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
        alterationInComfortPain: { type: Boolean }, // Example: true if there's an alteration in comfort due to pain
      },
    },
    integumentaryStatus: {
      integumentaryAssessment: {
        noProblemsIdentified: { type: Boolean },
        bruising: { type: Boolean },
        cool: { type: Boolean },
        clammy: { type: Boolean },
        dry: { type: Boolean },
        flushed: { type: Boolean },
        cyanotic: { type: Boolean },
        jaundice: { type: Boolean },
        pallor: { type: Boolean },
        rash: { type: Boolean },
        wounds: { type: Boolean },
        poorTurgor: { type: Boolean },
        pruritus: { type: Boolean },
        incision: { type: Boolean },
        skinLesionRequiringIntervention: { type: Boolean },
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
        hasUnhealedPressureUlcer: { type: Boolean }, // Yes or No
        ulcerCount: { type: Number, default: 0 }, // Example: 0, 1, 2, etc.
        ulcerStages: {
          stage1: { type: Boolean },
          stage2: { type: Boolean },
          stage3: { type: Boolean },
          stage4: { type: Boolean },
        },
      },
      stasisUlcer: {
        hasStasisUlcer: { type: Boolean }, // Yes or No
        description: {
          observable: { type: Boolean },
          unobservable: { type: Boolean },
        },
      },
      surgicalWound: {
        hasSurgicalWound: { type: Boolean }, // Yes or No
        description: {
          observable: { type: Boolean },
          unobservable: { type: Boolean },
        },
      },
      //woundmanager
      ordersForDisciplineAndTreatment: {
        alterationInIntegumentaryStatus: { type: Boolean }, // Example: true or false
      },
    },

   // Respiratory Status Section
   respiratoryStatus: {
    respiratoryAssessment: {
      noProblemsIdentified: { type: Boolean },
      accessoryMuscleUse: { type: Boolean },
      cpapBipap: { type: Boolean },
      orthopnea: { type: Boolean },
      abnormalBreathSounds: { type: Boolean },
      dyspnea: { type: Boolean },
      coughNonproductive: { type: Boolean },
      coughProductive: { type: Boolean },
      nebulizer: { type: Boolean },
      oxygenUseIntermittent: { type: Boolean },
      paroxysmalNocturnalDyspnea: { type: Boolean },
      tachypnea: { type: Boolean },
      tracheostomy: { type: Boolean },
      oxygenUseContinuous: { type: Boolean },
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
      alterationInRespiratoryStatus: { type: Boolean }, // Example: true or false
    },
  },
      // Cardiac Status Section
      cardiacStatus: {
        cardiacAssessment: {
          noProblemsIdentified: { type: Boolean },
          activityIntolerance: { type: Boolean },
          abnormalPulses: { type: Boolean },
          aicd: { type: Boolean }, // Automated implantable cardioverter-defibrillator
          distendedNeckVeins: { type: Boolean },
          abnormalHeartRhythm: { type: Boolean },
          abnormalLowerExtremitySensation: { type: Boolean },
          capillaryRefillGreaterThan3Sec: { type: Boolean },
          fatigueWeakness: { type: Boolean },
          orthopnea: { type: Boolean },
          dizzinessLightheadedness: { type: Boolean },
          paroxysmalNocturnalDyspnea: { type: Boolean },
          orthostaticHypotension: { type: Boolean },
          palpitations: { type: Boolean },
          pacemaker: { type: Boolean },
          edemaPitting: { type: Boolean },
          edemaNonPitting: { type: Boolean },
          chestPain: { type: Boolean },
          abnormalHeartSounds: { type: Boolean },
          abnormalLowerExtremityAppearance: { type: Boolean },
          exhibitingSignsOfHeartFailure: { type: Boolean },
          comments: { type: String },
        },
        ordersForDisciplineAndTreatment: {
          alterationInCardiacStatus: { type: Boolean }, // Problem statement
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
        noProblemsIdentified: { type: Boolean },
        nocturia: { type: Boolean },
        abnormalUrineAppearance: { type: Boolean },
        dialysis: { type: Boolean },
        indwellingFoleyCatheter: { type: Boolean },
        intermittentCatheterization: { type: Boolean },
        suprapubicCatheter: { type: Boolean },
        utiSignsOrSymptoms: { type: Boolean },
        discharge: { type: Boolean },
        comments: { type: String },
      },
      gastrointestinalAssessment: {
        lastBM: { type: Date },
        noProblemsIdentified: { type: Boolean },
        ascites: { type: Boolean },
        hemorrhoids: { type: Boolean },
        nausea: { type: Boolean },
        tenderness: { type: Boolean },
        abnormalBowelSounds: { type: Boolean },
        bowelIncontinence: { type: Boolean },
        distended: { type: Boolean },
        hard: { type: Boolean },
        laxativeEnemaUse: { type: Boolean },
        pain: { type: Boolean },
        vomiting: { type: Boolean },
        abnormalStool: { type: Boolean },
        comments: { type: String },
      },
      ordersForDisciplineAndTreatment: {
        alterationInGenitourinaryStatus: { type: Boolean },
        alterationInGastrointestinalStatus: { type: Boolean },
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
          type: Boolean, // Boolean to indicate whether process measures are required.
          default: false,
        },
      },
      trainingAndEducationResources: {
        physicalAssessment: {
          type: Boolean, // Boolean to indicate the use of physical assessment training resources.
          default: false,
        },
        fifteenMinuteWalk: {
          type: Boolean, // Boolean to indicate the use of 15-minute walk resources.
          default: false,
        },
        woundManager: {
          type: Boolean, // Boolean to indicate the use of wound manager training resources.
          default: false,
        },
      },
    },
    endocrineHematologicalAssessment: {
      assessment: {
        noProblemsIdentified: { type: Boolean },
        anemia: { type: Boolean },
        cancer: { type: Boolean },
        hypothyroidism: { type: Boolean },
        hyperthyroidism: { type: Boolean },
        diabetes: { type: Boolean },
      },
      comments: { type: String }, // Field to store additional comments
      ordersForDisciplineAndTreatment: {
        alterationInGlucoseMetabolism: { type: Boolean },
        alterationInHematologicalStatus: { type: Boolean },
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
        manualWheelchair: { type: Boolean },
        motorizedWheelchairOrScooter: { type: Boolean },
        mechanicalLift: { type: Boolean },
        walker: { type: Boolean },
        orthoticsProsthetics: { type: Boolean },
        noneOfTheAbove: { type: Boolean },
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
        usesWheelchairScooter: { type: Boolean },
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
          musculoskeletalIssues: { type: Boolean }, // "Alteration in Musculoskeletal Status"
          fallPreventionPlan: { type: Boolean }, // "Need for Fall Prevention Plan"
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
          received: { type: Boolean },
          reconciled: { type: Boolean },
          issuesIdentified: { type: Boolean },
          adequateUse: { type: Boolean },
          PRNUse: { type: Boolean },
          initialPrescriptionsFilled: { type: Boolean },
          infusion: { type: Boolean },
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
        isTaking: { type: Boolean },
        categories: {
          antipsychotic: { type: Boolean },
          anticoagulant: { type: Boolean },
          antibiotic: { type: Boolean },
          opioid: { type: Boolean },
          antiepileptic: { type: Boolean },
          hypoglycemics: { type: Boolean },
          noneOfTheAbove: { type: Boolean },
        },
        indicationNeeded: { type: Boolean },
      },
      comments: { type: String },
      ordersForDisciplineAndTreatment: {
        medicationManagement: { type: Boolean },
        injections: { type: Boolean },
        parenteralTherapy: { type: Boolean },
        diagnosticTesting: { type: Boolean },
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
          memoryDeficit: { type: Boolean },
          impairedDecisionMaking: { type: Boolean },
          verbalDisruption: { type: Boolean },
          physicalAggression: { type: Boolean },
          disruptiveBehavior: { type: Boolean },
          delusionalBehavior: { type: Boolean },
        },
        frequencyOfDisruptiveBehavior: {
          type: String,
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
    },

       nutritionAssessment: {
      nutritionAssessment: {
        noProblemsIdentified: { type: Boolean },
        difficultyChewing: { type: Boolean },
        edentulous: { type: Boolean },
        tubeFeedingPresent: { type: Boolean },
        anorexic: { type: Boolean },
        fairAppetite: { type: Boolean },
        poorAppetite: { type: Boolean },
        poorHydration: { type: Boolean },
        soreThroat: { type: Boolean },
        TPNorLipids: { type: Boolean },
        weightLoss: { type: Boolean },
        weightGain: { type: Boolean },
        comments: { type: String },
      },
      nutritionalHealthScreen: {
        questions: [
          {
            question: { type: String },
            answer: { type: Boolean },
          },
        ],
        totalScore: { type: Number },
        riskCategory: { type: String }, // e.g., "Good Nutritional Status", "Moderate Nutritional Risk", or "High Nutritional Risk"
      },
      nutritionalApproaches: {
        parenteralFeeding: { type: Boolean },
        mechanicallyAlteredDiet: { type: Boolean },
        therapeuticDiet: { type: Boolean },
        other: { type: Boolean },
        noneOfTheAbove: { type: Boolean },
        noInformationAvailable: { type: Boolean },
      },
      planOfCareNutritionalRequirements: {
        regular: { type: Boolean },
        mechanicalSoft: { type: Boolean },
        heartHealthy: { type: Boolean },
        lowCholesterol: { type: Boolean },
        lowFat: { type: Boolean },
        sodiumRestriction: { type: Boolean },
        noAddedSalt: { type: Boolean },
        calorieADA: { type: Boolean },
        noConcentratedSweets: { type: Boolean },
        consistentDiet: { type: Boolean },
        renalDiet: { type: Boolean },
        enteralNutrition: { type: Boolean },
        TPN: { type: Boolean },
        supplements: { type: Boolean },
        fluidRestriction: { type: Boolean },
        other: { type: String },
      },
      ordersForDisciplineAndTreatment: {
        alterationInNutrition: { type: Boolean },
      },
    },
    supplyManagerDME: {
      durableMedicalEquipment: {
        bedsideCommode: { type: Boolean, default: false },
        cane: { type: Boolean, default: false },
        elevatedToiletSeat: { type: Boolean, default: false },
        grabBars: { type: Boolean, default: false },
        hospitalBed: { type: Boolean, default: false },
        nebulizer: { type: Boolean, default: false },
        oxygen: { type: Boolean, default: false },
        tubShowerBench: { type: Boolean, default: false },
        walker: { type: Boolean, default: false },
        wheelchair: { type: Boolean, default: false },
        other: { type: Boolean, default: false },
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
        type: Boolean, // Whether marked as "Not Applicable"
        default: false,
      },
      comments: {
        type: String, // Additional details
        maxlength: 5000, // Character limit
      },
      ordersForDisciplineAndTreatment: {
        PT: { type: Boolean, default: false }, // Physical Therapy need
        OT: { type: Boolean, default: false }, // Occupational Therapy need
        ST: { type: Boolean, default: false }, // Speech-Language Therapy need
      },
    },
    additionalNotes: { type: String },
  },
  { timestamps: true }
);

const OASISAssessment = mongoose.model("OASISAssessment", oasisAssessmentSchema);

module.exports = OASISAssessment;
