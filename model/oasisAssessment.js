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
      interpreterRequired: {
        needOrWantInterpreter: { type: String }, // "No", "Yes", "Unable to Determine"
        interpreterTypes: [{ type: String }], // e.g. ["Family", "Friend", "Professional interpreter service", "Other: ..."]
      },
      paymentSource: { type: String },

      // Visit Information section starts here
      visitInformation: {
        visitDate: { type: Date },
        visitStartTime: { type: String }, // Store as string in "HH:mm" format, e.g. "08:30"
        visitEndTime: { type: String }, // Store as string in "HH:mm" format
        travelStartTime: { type: String }, // Store as string in "HH:mm" format
        travelEndTime: { type: String }, // Store as string in "HH:mm" format
        associatedMileage: { type: Number }, // e.g., miles or kilometers
        surcharge: { type: Number }, // If applicable, else can be 0 or omitted
      },
      clinicalRecords: {
        // Assessment Information
        disciplineOfPersonCompletingAssessment: { type: String }, // e.g., "RN", "PT", "SLP/ST", "OT"
        dateAssessmentCompleted: { type: Date },

        // Reason for Assessment (radio)
        reasonForAssessment: { type: String }, // e.g., "01 - Start of care - further visits planned", etc.

        // Dates/Timing
        physicianOrderedStartOfCareDate: { type: Date },
        noSpecificSOCDOrdered: { type: Boolean, default: false }, // N/A checkbox

        // Episode Timing (radio)
        episodeTiming: { type: String }, // e.g., "1 - Early", "2 - Later", "UK - Unknown", "N/A"
      },
    },
    patientHistoryAndDiagnoses: {
      vitalSigns: {
        temperature: { type: Number },
        respirations: { type: Number },
        oxygenSaturation: {
          percentage: { type: Number },
          method: { type: String },
        },
        pulseRate: { type: Number },
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

        // Additional measurements unavailable (checkbox)
        additionalMeasurementsUnavailable: { type: Boolean, default: false },

        // Additional Vital Signs
        additionalVitalSigns: {
          fastingBloodGlucose: { type: Number }, // mg/dl
          randomBloodSugar: { type: Number }, // mg/dl
          abdGirth: {
            value: { type: Number }, // e.g., 102
            unit: { type: String, enum: ["in", "cm"], default: "cm" },
          },
          hemoglobinA1C: { type: Number }, // %
          date: { type: Date }, // Date of measurement
          inrLevel: { type: Number }, // INR Level
          proThrombinTime: { type: Number }, // Seconds

          ankleCircumference: {
            left: { type: Number },
            right: { type: Number },
            unit: { type: String, enum: ["in", "cm"], default: "cm" },
          },
          calfCircumference: {
            left: { type: Number },
            right: { type: Number },
            unit: { type: String, enum: ["in", "cm"], default: "cm" },
          },
        },
      },
      vitalSignParameters: {
        pulseRate: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
        temperature: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
        respirations: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
        o2Saturation: {
          lessThan: { type: Number }, // Only 'less than' in the UI
        },
        painLevel: {
          greaterThan: { type: Number },
        },
        systolicBloodPressure: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
        diastolicBloodPressure: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
        bloodSugarFasting: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
        bloodSugarRandom: {
          greaterThan: { type: Number },
          lessThan: { type: Number },
        },
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
        peripheralVascularDisease: { type: Boolean, default: false }, // PVD or PAD
        diabetesMellitus: { type: Boolean, default: false }, // DM
        noneOfTheAbove: { type: Boolean, default: false },
        noInformationAvailable: { type: Boolean, default: false },
      },

      specialTreatments: {
        cancerTreatments: {
          chemotherapy: {
            checked: { type: Boolean, default: false },
            IV: { type: Boolean, default: false },
            oral: { type: Boolean, default: false },
            other: { type: Boolean, default: false },
          },
          radiation: { type: Boolean, default: false },
        },
        respiratoryTherapies: {
          oxygenTherapy: {
            checked: { type: Boolean, default: false },
            continuous: { type: Boolean, default: false },
            intermittent: { type: Boolean, default: false },
            highConcentration: { type: Boolean, default: false },
          },
          suctioning: {
            checked: { type: Boolean, default: false },
            scheduled: { type: Boolean, default: false },
            asNeeded: { type: Boolean, default: false },
          },
          tracheostomyCare: { type: Boolean, default: false },
          invasiveVentilator: { type: Boolean, default: false },
          nonInvasiveVentilator: {
            checked: { type: Boolean, default: false },
            BiPAP: { type: Boolean, default: false },
            CPAP: { type: Boolean, default: false },
          },
        },
        otherTreatments: {
          ivMedications: {
            checked: { type: Boolean, default: false },
            vasoactiveMedications: { type: Boolean, default: false },
            antibiotics: { type: Boolean, default: false },
            anticoagulation: { type: Boolean, default: false },
            other: { type: Boolean, default: false },
          },
          transfusions: { type: Boolean, default: false },
          dialysis: {
            checked: { type: Boolean, default: false },
            hemodialysis: { type: Boolean, default: false },
            peritonealDialysis: { type: Boolean, default: false },
          },
          ivAccess: {
            checked: { type: Boolean, default: false },
            peripheral: { type: Boolean, default: false },
            midLine: { type: Boolean, default: false },
            central: { type: Boolean, default: false },
          },
        },
        noneOfTheAbove: { type: Boolean, default: false },
        noInformationAvailable: { type: Boolean, default: false },
      },

      allergies: {
        activeAllergies: [
          {
            name: { type: String }, // Allergy name, e.g., "Penicillin"
            type: { type: String }, // e.g., "Medication", "Food", "Animal", etc.
          },
        ],
        deletedAllergies: [
          {
            name: { type: String },
            type: { type: String },
          },
        ],
      },
      comments: {
        templates: { type: String }, // Example: Predefined templates for comments
        additionalComments: { type: String }, // Free-text comments
      },
    },
    // Risk Assessment Section
    riskAssessment: {
      shinglesVaccination: {
        // At start of care, does patient report EVER receiving the shingles vaccine?
        received: { type: Boolean, default: false }, // If true, you could add a field for immunization log if needed

        // If "No"
        notReceived: {
          offeredToPatient: {
            type: String,
            enum: ["yes", "no", ""],
            default: "",
          }, // Did you offer to administer? "yes", "no"
          patientDeclined: {
            declined: { type: Boolean, default: false }, // Patient declined the vaccine?
            declineReason: { type: String }, // Reason for declining, from dropdown/select
          },
        },
      },
      immunizationLog: {
        activeImmunizations: [
          {
            typeOfImmunization: String,
            administeredBy: String,
            dateAdministered: Date,
            additionalNotes: String,
          },
        ],

        declinedImmunizations: [
          {
            typeOfImmunization: String,
            declineStatus: String, // "Declined" or "Contraindicated"
            dateDocumented: Date,
            declineReason: String, // Dropdown value for reason
            notes: String, // Free-text notes
          },
        ],
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
        toolUsed: { type: String }, // "SMH Project BOOST" or "HHQI"
        emergencyPreparedness: { type: String }, // Free-text or a status string

        // SMH Project BOOST options (8 Ps)
        boostRiskFactors: {
          problemsWithMedications: { type: Boolean, default: false },
          psychological: { type: Boolean, default: false },
          principalDiagnosis: { type: Boolean, default: false },
          physicalLimitations: { type: Boolean, default: false },
          poorHealthLiteracy: { type: Boolean, default: false },
          patientSupport: { type: Boolean, default: false },
          priorHospitalization: { type: Boolean, default: false },
          palliativeCare: { type: Boolean, default: false },
        },

        // HHQI options
        hhqi: {
          noProblemsIdentified: { type: Boolean, default: false },
          polypharmacy: { type: Boolean, default: false },
          noncomplianceWithMedication: { type: Boolean, default: false },
          helpWithManagingMedications: { type: Boolean, default: false },
          depression: { type: Boolean, default: false },
          confusion: { type: Boolean, default: false },
          heartFailure: { type: Boolean, default: false },
          diabetes: { type: Boolean, default: false },
          copd: { type: Boolean, default: false },
          acuteChronicWoundOrPressureUlcer: { type: Boolean, default: false },
          moreThanTwoSecondaryDiagnoses: { type: Boolean, default: false },
          adlAssistanceNeeded: { type: Boolean, default: false },
          homeSafetyRisks: { type: Boolean, default: false },
          dyspnea: { type: Boolean, default: false },
          historyOfFalls: { type: Boolean, default: false },
          lowLiteracyLevel: { type: Boolean, default: false },
          decreasedAdherenceToTreatmentPlan: { type: Boolean, default: false },
          livesAlone: { type: Boolean, default: false },
          inadequateSupportNetwork: { type: Boolean, default: false },
          lowSocioeconomicStatus: { type: Boolean, default: false },
          moreThanOneHospitalizationIn12Months: {
            type: Boolean,
            default: false,
          },
          dischargedFromHospitalOrSNF: { type: Boolean, default: false },
          overallPoorStatusOrPrognosis: { type: Boolean, default: false },
        },
      },

      riskForHospitalization: {
        historyOfFalls: { type: Boolean, default: false },
        weightLoss: { type: Boolean, default: false },
        multipleHospitalizations: { type: Boolean, default: false },
        emergencyVisits: { type: Boolean, default: false },
        declineInMentalOrBehavioralStatus: { type: Boolean, default: false },
        difficultyComplyingWithMedicalInstructions: {
          type: Boolean,
          default: false,
        },
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
      comments: { type: String },
      // New Section: Orders for Discipline and Treatment
      ordersForDisciplineAndTreatment: {
        // PROBLEM STATEMENTS
        highRiskPotentialForInfection: {
          checked: { type: Boolean, default: false },
          notes: { type: String },
          // Plan of Care
          planOfCare: { type: String },

          // INTERVENTIONS
          interventions: {
            teachGeneralInfectionControlPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachGenitourinaryPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCovid19RiskPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHighRiskForInfectionOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            willRemainFreeOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willBeAbleToVerbalizeSignsOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateSkinPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateCareOfMedicalEquipment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willPreventTheSpreadOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willProtectFromCovid19: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willProtectHighRiskPopulations: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateHowToCreateAPlan: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHighRiskForInfectionGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },

        // These are simple problem statements (no sub-sections)
        needForImmunization: {
          checked: { type: Boolean, default: false },
          notes: { type: String },
          // INTERVENTIONS
          interventions: {
            performCovid19VaccineAdministrationSingleDose: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performCovid19VaccineAdministrationFirstDose: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performCovid19VaccineAdministrationSecondDose: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performFluVaccineAdministration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performPneumoniaVaccineAdministration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performShinglesVaccineAdministration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performOtherVaccineAdministration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachFluImmunization: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachPneumoniaImmunization: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachShinglesImmunization: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalImmunizationOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            verbalizeUnderstandingOfNeed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            safeVaccineAdministration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
        highRiskPotentialForInfection: {
          checked: { type: Boolean, default: false },
          notes: { type: String },
          // Plan of Care
          planOfCare: { type: String },

          // INTERVENTIONS
          interventions: {
            teachGeneralInfectionControlPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachGenitourinaryPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCovid19RiskPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHighRiskForInfectionOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            willRemainFreeOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willBeAbleToVerbalizeSignsOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateSkinPrecautions: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateCareOfMedicalEquipment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willPreventTheSpreadOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willProtectFromCovid19: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willProtectHighRiskPopulations: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateHowToCreateAPlan: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHighRiskForInfectionGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
        needForInfectiousDiseaseManagement: {
          checked: { type: Boolean, default: false },
          notes: { type: String },

          // Plan of Care
          planOfCare: { type: String },

          // INTERVENTIONS
          interventions: {
            teachAIDS: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCovid19Tested: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCovid19NotTested: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachFlu: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachHIV: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachHepatitisA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachHepatitisB: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachHepatitisC: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachMRSA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachPneumonia: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachSepsis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachShingles: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachVRE: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            telehealthCovid19: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachAnotherInfectiousDisease: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceInSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            complianceWithTreatment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            resolutionOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateInfectionControl: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateUnderstandingOfInfectionControlForCovid19: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateCompetenceInSelfManagementOfCovid19: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            patientWithRecentHospitalizationDueToExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newDiagnosisRequiringTreatmentRegimenChanges: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbationOfDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            progressionOfDiseaseProcessRequiringAssessment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithNewOrChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19Diagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            taxingEffortToLeaveHomeDueToDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsBedboundAndUnableToSitInAChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundRequiringAssistanceToTransfer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundAndCanTransferButTaxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionOfInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19MedicalRestriction: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },
    // Prognosis Section
    prognosis: {
      advanceCarePlan: {
        hasAdvanceCarePlanOrSurrogate: { type: Boolean, default: false },
        comments: { type: String }, // Free text only
      }, // Whether Advance Care Plan is checked
      planOfCarePrognosis: {
        response: { type: String }, // "Guarded", "Poor", "Fair", "Good", "Excellent"
        guarded: { type: Boolean, default: false },
        poor: { type: Boolean, default: false },
        fair: { type: Boolean, default: false },
        good: { type: Boolean, default: false },
        excellent: { type: Boolean, default: false },
      },
      comments: {
        templates: { type: String }, // Selected template for comments
        additionalComments: { type: String }, // Free-text additional comments
      },
      ordersForDisciplineAndTreatment: {
        needForAdvanceCarePlanning: {
          checked: { type: Boolean, default: false },
          notes: { type: String }, // Plan of Care notes

          interventions: {
            teachAdvanceCarePlan: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            mswNeedForAdvanceCarePlanning: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalPrognosisOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          goals: {
            patientAbleToVerbalizeNeed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientAbleToVerbalizeBenefitPaid: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalPrognosisGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
        // ...other sections
      },
      // trainingAndEducationResources: {
      //   physicalAssessment: { type: Boolean, default: false }, // Training option 1
      //   fifteenMinuteWalk: { type: Boolean, default: false }, // Training option 2
      //   woundManager: { type: Boolean, default: false }, // Training option 3
      // },
    },

    supportiveAssistance: {
      culturalPreferences: {
        spiritualOrCulturalPractice: {
          checked: { type: Boolean, default: false }, // Checkbox for spiritual/cultural practice
          value: { type: String }, // Free text input (description of practice)
        },
        none: { type: Boolean, default: false }, // Checkbox for "None"
      },
      transportation: {
        lackOfTransportation: [{ type: String }], // Example: "Yes, It Has Kept Me From Medical Appointments"
      },
      healthLiteracy: {
        response: { type: String }, // Example: "Never", "Rarely", "Sometimes", etc.
      },
      planOfCare_psychosocialAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        homeEnvironmentAltered: [{ type: String }], // store selected sub-option as a string, e.g. "Low/no income"
        suspectedAbuseNeglect: [{ type: String }], // store description or details as a string
        barriersToHealthStatus: [{ type: String }], // store description or details as a string
        communityResourcesNeeded: [{ type: String }], // store description or details as a string
        communityResourcesProvidingAssistance: { type: String }, // store description or details as a string
        comments: { type: String }, // free-text comments field
      },
      PlanofCareCaregiverStatus: {
        type: String, // Example: "Patient lives alone", "Patient lives with others"
      },
      psychosocialAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        homeEnvironmentAltered: { type: Boolean, default: false },
        suspectedAbuseNeglect: { type: Boolean, default: false },
        barriersToHealthStatus: { type: Boolean, default: false },
        communityResourcesNeeded: { type: Boolean, default: false },
        communityResourcesProvidingAssistance: {
          type: Boolean,
          default: false,
        },
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
          infectionControl: [{ type: String }],
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
          presenceOfAnimals: { type: String },
          other: { type: String }, // Free-text for additional safety measures
        },
      },
      ordersForDisciplineAndTreatment: {
        alterationInHomeEnvironment: {
          checked: { type: Boolean, default: false }, // Main checkbox for this problem statement
          notes: { type: String }, // Plan of Care notes

          interventions: {
            needForMedicalSocialWorkerServices: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalSupportiveAssistanceOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          goals: {
            patientToDemonstrateEffectiveCopingMechanisms: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            caregiverWillDemonstrateAndReceiveSupport: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            environmentalAlterationsAssessedByMSW: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            ableToAccessResourcesOrProblemSolve: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateWillingnessToUtilizeCommunityResources: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },

    sensoryStatus: {
      sensoryAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        ringingInEars: { type: Boolean, default: false },
        hearingImpaired: {
          checked: { type: Boolean, default: false },
          details: {
            deaf: { type: Boolean, default: false },
            hearingImpairedBilateral: { type: Boolean, default: false },
            hearingImpairedLeft: { type: Boolean, default: false },
            hearingImpairedRight: { type: Boolean, default: false },
            hearingAidBilateral: { type: Boolean, default: false },
            hearingAidLeft: { type: Boolean, default: false },
            hearingAidRight: { type: Boolean, default: false },
          },
        },
        earDrainage: { type: Boolean, default: false },
        painInEars: { type: Boolean, default: false },
        slurredSpeech: { type: Boolean, default: false },
        aphasia: {
          checked: { type: Boolean, default: false },
          type: { type: String }, // Dropdown value for Aphasia type
        },
        abnormalPupilsOrVision: {
          checked: { type: Boolean, default: false },
          details: {
            blind: { type: Boolean, default: false },
            blurredVision: { type: Boolean, default: false },
            cataract: { type: Boolean, default: false },
            glaucoma: { type: Boolean, default: false },
            legallyBlind: { type: Boolean, default: false },
            lowVision: { type: Boolean, default: false }, // partially blind
            macularDegeneration: { type: Boolean, default: false },
            pupilsNonReactive: { type: Boolean, default: false },
            pupilsSluggish: { type: Boolean, default: false },
            wearsCorrectiveLenses: { type: Boolean, default: false },
          },
        },
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
        hadAnyPain: { type: String }, // e.g., "Yes", "No", "Unable to communicate"
        primarySite: { type: String }, // e.g., "Lower back", only required if Yes
        currentPainIntensity: { type: String }, // e.g., "0", "2", "4", "6", "8", "10"
        pastWeekLeastPainIntensity: { type: String }, // e.g., "0", "2", "4", etc.
        pastWeekMostPainIntensity: { type: String }, // e.g., "0", "2", "4", etc.
        interferesWithActivity: { type: String }, // e.g., "Not at all", "A little", "Moderately", "Extremely"
        painDescription: [{ type: String }], // e.g., ["Aching", "Sharp", "Other: ..."]
        nonverbalPainCues: [{ type: String }], // e.g., ["Grimacing", "Crying", "Other: ..."]
        painReliefMeasures: [{ type: String }], // e.g., ["Medication", "Rest", "Other: ..."]
        painManagementEffectiveness: [{ type: String }], // e.g., ["Improvement in mood", "Decline in sleep pattern"]
        potentialAberrantBehavior: [{ type: String }], // e.g., ["Appears intoxicated", "Hoarding prescriptions"]
        comments: { type: String }, // Free text for general comments

        // Nonverbal Pain Assessment Method (if unable to communicate)
        nonverbalPainAssessment: {
          method: { type: String }, // e.g., "Wong-Baker", "PAINAD", null if not used
          wongBakerLevel: { type: String }, // e.g., "0", "2", "4", etc.
          // PAINAD specific
          painad: {
            breathing: { type: String }, // e.g., "Normal", "Occasional labored breathing", ...
            negativeVocalization: { type: String }, // e.g., "None", "Occasional moan/groan", ...
            facialExpression: { type: String }, // e.g., "Smiling or inexpressive", ...
            bodyLanguage: { type: String }, // e.g., "Relaxed", "Tense", ...
            consolability: { type: String }, // e.g., "No need to console", ...
            totalScore: { type: Number }, // Calculated PAINAD total
          },
        },

        // Additional questions if unable to communicate
        unableToCommunicate: { type: Boolean, default: false }, // True if this is the scenario
        impactOnDailyLiving: { type: String }, // "How does pain interfere or impact..."
        painReliefEffectiveness: { type: String }, // "Current pain relief measures/effectiveness?"
      },
      painEffectOnSleep: {
        type: String, // Example: "Does not apply", "Rarely or not at all", "Occasionally", "Frequently", "Almost constantly", "Unable to answer"
      },
      painInterferenceWithTherapyActivities: {
        type: String, // "Does not apply", "Rarely or not at all", "Occasionally", "Frequently", "Almost constantly", "Unable to answer"
        // e.g., "Unable to answer"
      },
      painInterferenceWithDayToDayActivities: {
        type: String, // "Rarely or not at all", "Occasionally", "Frequently", "Almost constantly", "Unable to answer"
        // e.g., "Frequently"
      },
      ordersForDisciplineAndTreatment: {
        alterationInComfortPain: {
          checked: { type: Boolean, default: false }, // Main checkbox for Alteration in Comfort: Pain
          notes: { type: String }, // Plan of Care notes

          interventions: {
            teachPain: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalPainOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          goals: {
            optimalEffectivenessOfPainManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            activityLevelImproved: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateKnowledgeOfPainMedication: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateDecreaseInPainLevel: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateAbilityToManagePainMedication: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstratePainReliefMeasures: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalPainGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
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
        wounds: [{ type: String }],
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
        // M1306: Does patient have at least one Unhealed Pressure Ulcer/Injury at Stage 2 or Higher?
        hasUnhealedPressureUlcerStage2OrHigher: { type: String }, // "Yes" | "No"

        // When "No" is selected (all others can be null/empty):
        // - M1322: Current Number of Stage 1 Pressure Injuries
        stage1PressureInjuryCount: { type: String }, // e.g., "0 - Zero", "1 - One", etc.

        // - M1324: Stage of Most Problematic Unhealed Pressure Ulcer/Injury that is Stageable
        mostProblematicUlcerStage: { type: String }, // e.g., "N/A", "Stage 1", "Stage 2", "Stage 3", "Stage 4"

        // When "Yes" is selected, expose these additional properties:
        // - M1311: Current Number of Unhealed Pressure Ulcers/Injuries at Each Stage
        stage2UlcerCount: { type: String }, // Number currently present as string, e.g., "1"
        stage3UlcerCount: { type: String },
        stage4UlcerCount: { type: String },

        // D1: Number of unstageable pressure ulcers/injuries due to non-removable dressing/device
        unstageableDeviceUlcerCount: { type: String },

        // E1: Number of unstageable pressure ulcers due to coverage of wound bed by slough and/or eschar
        unstageableSloughUlcerCount: { type: String },

        // F1: Number of unstageable pressure ulcers with suspected deep tissue injury in evolution
        unstageableDeepTissueUlcerCount: { type: String },

        // - M1322 (Always visible): Current Number of Stage 1 Pressure Injuries
        stage1PressureInjuryCountYes: { type: String }, // e.g., "0 - Zero", "1 - One", etc.

        // - M1324: Stage of Most Problematic Unhealed Pressure Ulcer/Injury that is Stageable
        mostProblematicUlcerStageYes: { type: String }, // "Stage 1", "Stage 2", etc.
      },

      stasisUlcer: {
        // M1330: Does this patient have a Stasis Ulcer?
        stasisUlcerStatus: {
          type: String,
          // Possible values:
          // "0 - No",
          // "1 - Yes, patient has BOTH observable and unobservable stasis ulcers",
          // "2 - Yes, patient has observable stasis ulcers ONLY",
          // "3 - Yes, patient has unobservable stasis ulcers ONLY (known but not observable due to non-removable dressing/device)"
        },

        // M1332: Current Number of Stasis Ulcer(s) that are Observable
        observableUlcerCount: {
          type: String,
          // Possible values: "1 - One", "2 - Two", "3 - Three", "4 - Four or more"
        },

        // M1334: Status of Most Problematic Stasis Ulcer that is Observable
        mostProblematicUlcerStatus: {
          type: String,
          // Possible values: "1 - Fully granulating", "2 - Early/partial granulation", "3 - Not healing"
        },
      },

      surgicalWound: {
        // M1340: Does this patient have a Surgical Wound?
        surgicalWoundStatus: {
          type: String,
          // Possible values:
          // "0 - No"
          // "1 - Yes, patient has at least one observable surgical wound"
          // "2 - Surgical wound known but not observable due to non-removable dressing/device"
        },

        // M1342: Status of Most Problematic Surgical Wound that is Observable
        mostProblematicWoundStatus: {
          type: String,
          // Possible values:
          // "0 - Newly epithelialized"
          // "1 - Fully granulating"
          // "2 - Early/partial granulation"
          // "3 - Not healing"
        },
      },

      ordersForDisciplineAndTreatment: {
        alterationInIntegumentaryStatus: {
          checked: { type: Boolean, default: false }, // Main checkbox
          notes: { type: String }, // Plan of Care notes (free text)

          // INTERVENTIONS
          interventions: {
            assessSurgicalWoundIncisionObservationOnly: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachPressureUlcerPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            needForWoundManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performPressureUlcerCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performSurgicalWoundCareOpen: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performSurgicalWoundCareIncision: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performOtherWoundCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performNegativeWoundPressureTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performNegativeWoundPressureTherapyDisposable: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performRemoveStaples: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performRemoveStitches: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalIntegumentaryOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            willHavePromotionOfHealingAndRestoration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willAchieveOptimalWoundHealingWithoutComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateIndependenceWithWoundCareManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateComplianceWithPrescribedWoundCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateIndependenceWithIncisionCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            woundBedWillDevelopTissueRegeneration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateMeasuresToPreventWoundDeterioration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            willDemonstrateMeasuresToPreventSkinBreakdown: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientEndpointToDailyWoundCareAnticipatedToEnd: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalIntegumentaryGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            patientWithUnstableIntegumentaryStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithNewWoundRequiringSkilledIntervention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithComplicationsDueToUnderlyingCondition: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            copiousDrainageRequiringDailyWoundCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithInherentComplexityOfCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithExtensionOfNecroticAreasToWound: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            requiresSkilledInterventionToRemoveStaplesSutures: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundUponPatientsPersonalSituation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            patientHasComplicatedOpenWound: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            sittingInWheelchairAutomobileIncreasesRiskForWoundDeterioration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            footWoundWithPoorBalanceAndLimitedAmbulation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            ulcersRequiringElevationOfLowerExtremity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientUnableToNegotiateStairsSafely: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithImpairedMentalStatusRequiringSupervision: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsExhibitingAConsiderableAndTaxingEffort: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsBedboundAndUnableToSitInAChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundRequiringAssistanceToTransfer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundAndCanTransferButTaxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionOfInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },

    // Respiratory Status Section
    respiratoryStatus: {
      respiratoryAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        accessoryMuscleUse: { type: Boolean, default: false },
        cpapBipap: { type: Boolean, default: false },
        orthopnea: { type: Boolean, default: false },

        abnormalBreathSounds: {
          checked: { type: String },
          absent: { type: String },
          cracklesRales: { type: String },
          diminished: { type: String },
          rhonchi: { type: String },
          stridor: { type: String },
          wheezing: { type: String },
        },

        dyspnea: { type: Boolean, default: false },
        coughNonproductive: { type: String },
        coughProductive: {
          checked: { type: Boolean, default: false },
          sputumDescription: { type: String }, // amount and color
        },
        paroxysmalNocturnalDyspnea: { type: Boolean, default: false },
        tachypnea: { type: Boolean, default: false },
        tracheostomy: { type: Boolean, default: false },

        nebulizer: { type: Boolean, default: false },

        oxygenUseIntermittent: {
          checked: { type: Boolean, default: false },
          lpm: { type: String },
          via: { type: String }, // delivery method (dropdown)
        },

        oxygenUseContinuous: {
          checked: { type: Boolean, default: false },
          lpm: { type: String },
          via: { type: String },
        },

        oxygenRiskAssessment: {
          backupOxygenNotAvailable: { type: Boolean, default: false },
          highRiskBehaviorNoted: { type: Boolean, default: false },
          nonFunctioningSmokeDetectors: { type: Boolean, default: false },
          noSmokingSignsNotPresent: { type: Boolean, default: false },
          otherFireSafetyRiskIdentified: { type: Boolean, default: false },
          smoker: { type: Boolean, default: false },
          smokingMaterialInHome: { type: Boolean, default: false },
          physicianNotified: { type: Boolean, default: false },
          clinicalManagerNotified: { type: Boolean, default: false },
        },

        noSafetyRisksNoted: { type: Boolean, default: false },

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
        alterationInRespiratoryStatus: {
          checked: { type: Boolean, default: false }, // Main problem statement checkbox
          notes: { type: String }, // Plan of Care notes (free text)

          // INTERVENTIONS
          interventions: {
            teachCOPD: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachPneumonia: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachLungCancer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachO2Therapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachTracheostomyCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachManagementVentilatorDependentPatient: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performTracheostomyCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performInhalationTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performChestPhysiotherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performVentilatorDependentPatientCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19HighRisk: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            telehealthRespiratory: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalRespiratoryOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceWithSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateReturnToStableRespiratoryStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            exhibitImprovedTissueOxygenationAndPreservation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            exhibitResolutionOfPneumonia: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            verbalizeSignsAndSymptomsOfRespiratoryComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            verbalizeAndDemonstrateSafeManagementOfOxygen: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateImprovementFromCurrentFunctionalLevel: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalRespiratoryGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            patientWithRecentHospitalizationDueToExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithNewDiagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithAcuteExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithUnstableRespiratoryStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithProgressionOfDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithNewAndOrChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithInitiationOfPrescribedTreatmentsForInhalationTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithInitiationOfPrescribedTreatmentsForOxygenTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundUponPatientsStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            taxingEffortToLeaveHomeDueToExacerbationOfCOPDOrAcuteBronchitis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHomeDueToRecentHospitalizationForPneumonia: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientExhaustedAfterAmbulating: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableToSafelyNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHomeDueToDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsBedboundAndUnableToSitInAChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundRequiringAssistanceToTransfer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundAndCanTransferButTaxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionOfInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19MedicalRestriction: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },
    // Cardiac Status Section
    cardiacStatus: {
      cardiacAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },

        // Checkbox fields
        activityIntolerance: { type: Boolean, default: false },
        capillaryRefillGreaterThan3Sec: { type: Boolean, default: false },
        fatigueWeakness: { type: Boolean, default: false },
        orthopnea: { type: Boolean, default: false },
        dizzinessLightheadedness: { type: Boolean, default: false },
        paroxysmalNocturnalDyspnea: { type: Boolean, default: false },
        orthostaticHypotension: { type: Boolean, default: false },

        // Abnormal Pulses
        abnormalPulses: {
          checked: { type: Boolean, default: false },
          location: { type: String }, // free text
          type: { type: String }, // dropdown option
        },

        // Pacemaker
        pacemaker: {
          checked: { type: Boolean, default: false },
          type: { type: String },
          dateOfInsertion: { type: String }, // date
          monitoredBy: { type: String },
          dateLastTested: { type: String }, // date
          comments: { type: String },
        },

        // AICD
        aicd: {
          checked: { type: Boolean, default: false },
          dateOfInsertion: { type: String },
          monitoredBy: { type: String },
          dateLastTested: { type: String },
          comments: { type: String },
        },

        // Edema
        edemaNonPitting: {
          checked: { type: Boolean, default: false },
          locations: [{ type: String }], // array of locations
        },
        edemaPitting: {
          checked: { type: Boolean, default: false },
          locations: [{ type: String }],
          pittingEdemaGrade: { type: String }, // dropdown: 1+, 2+, 3+, 4+
        },

        // Abnormal Heart Sounds
        abnormalHeartSounds: {
          checked: { type: Boolean, default: false },
          distant: { type: Boolean, default: false },
          faint: { type: Boolean, default: false },
          murmur: { type: Boolean, default: false },
          rubbing: { type: Boolean, default: false },
          s3Gallop: { type: Boolean, default: false },
          systolicClick: { type: Boolean, default: false },
        },

        // Palpitations
        palpitations: {
          checked: { type: Boolean, default: false },
          type: { type: String }, // dropdown
        },

        // Distended neck veins
        distendedNeckVeins: {
          checked: { type: Boolean, default: false },
          distendedPulsatile: { type: Boolean, default: false },
          distendedNonPulsatile: { type: Boolean, default: false },
        },

        // Abnormal heart rhythm
        abnormalHeartRhythm: {
          checked: { type: Boolean, default: false },
          arrhythmiaDysrhythmia: [{ type: String }],
          bradycardia: { type: Boolean, default: false },
          tachycardia: { type: Boolean, default: false },
          other: { type: String },
        },

        // Abnormal lower extremity sensation
        abnormalLowerExtremitySensation: {
          checked: { type: Boolean, default: false },
          burning: { type: Boolean, default: false },
          cold: { type: Boolean, default: false },
          crawling: { type: Boolean, default: false },
          legCramps: { type: Boolean, default: false },
          numbness: { type: Boolean, default: false },
          tingling: { type: Boolean, default: false },
        },

        // Abnormal lower extremity appearance
        abnormalLowerExtremityAppearance: {
          checked: { type: Boolean, default: false },
          blister: { type: Boolean, default: false },
          hemosiderinStaining: { type: Boolean, default: false },
          hyperkeratosis: { type: Boolean, default: false },
          inflammation: { type: Boolean, default: false },
          mottled: { type: Boolean, default: false },
          shiny: { type: Boolean, default: false },
          cellulitis: { type: Boolean, default: false },
          varicosities: { type: Boolean, default: false },
          weeping: { type: Boolean, default: false },
        },

        // Chest pain
        chestPain: {
          checked: { type: Boolean, default: false },
          location: { type: String },
          duration: { type: String },
          quality: { type: String },
          radiating: { type: Boolean, default: false },
          diaphoretic: { type: Boolean, default: false },
          dizziness: { type: Boolean, default: false },
          epigastricDiscomfort: { type: Boolean, default: false },
          indigestion: { type: Boolean, default: false },
          nauseaVomiting: { type: Boolean, default: false },
          nitratesRelief: { type: Boolean, default: false },
          nitratesNoRelief: { type: Boolean, default: false },
          pale: { type: Boolean, default: false },
          shortnessOfBreath: { type: Boolean, default: false },
          tachycardia: { type: Boolean, default: false },
          weak: { type: Boolean, default: false },
        },

        // Exhibiting S/S of heart failure
        exhibitingSignsOfHeartFailure: {
          checked: { type: Boolean, default: false },
          physicianContacted: { type: Boolean, default: false },
          advisedToSeekEmergency: { type: Boolean, default: false },
          followedParameters: { type: Boolean, default: false },
          patientEducation: { type: Boolean, default: false },
          receivedOrdersToChangePOC: { type: Boolean, default: false },
          physicianNotified: { type: Boolean, default: false },
          clinicalManagerNotified: { type: Boolean, default: false },
        },

        comments: { type: String },
      },

      ordersForDisciplineAndTreatment: {
        alterationInCardiacStatus: {
          checked: { type: Boolean, default: false }, // Main problem statement checkbox
          notes: { type: String }, // Plan of Care notes (free text)

          // INTERVENTIONS
          interventions: {
            teachHypertension: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachHeartFailure: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachArtrialFibrillation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachDeepVeinThrombosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachPeripheralVascularDisease: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachOxygenTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19HighRisk: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            telehealthCardiac: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalCardiacOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceAndSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWillDemonstrateReturnToStableCardiovascularStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateComplianceWithPrescribedTreatment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            verbalizeSignsAndSymptomsOfCardiacComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            ableToVerbalizeAndDemonstrateSafeManagementOfOxygen: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWillDemonstrateImprovementFromCurrentFunctionalLevel: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            patientWithRecentHospitalizationDueToExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newDiagnosisRequiringTreatmentRegimenChanges: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbationOfDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableCardiacStatusRequiringAssessment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            progressionOfDiseaseProcessRequiringAssessment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithNewOrChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundUponPatientsCardiacStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            taxingEffortToLeaveHomeDueToHeartFailure: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            medicalRestrictionsPostHeartSurgery: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientFatiguedAfterAmbulatingAndRequiresRestPeriod: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHomeNeedForHeartTransplant: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableToSafelyNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHomeDueToDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsBedboundAndUnableToSitInAChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundRequiringAssistanceToTransfer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundAndCanTransferButTaxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionOfInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19MedicalRestriction: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
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
        bladderDistention: { type: Boolean, default: false },

        abnormalControl: {
          checked: { type: Boolean, default: false },
          frequency: { type: Boolean, default: false },
          hesitancy: { type: Boolean, default: false },
          incontinenceFunctional: { type: Boolean, default: false },
          incontinenceOverflow: { type: Boolean, default: false }, // (dribble)
          incontinenceStress: { type: Boolean, default: false },
          incontinenceUrge: { type: Boolean, default: false },
          retention: { type: Boolean, default: false },
          urgency: { type: Boolean, default: false },
        },

        abnormalVolume: {
          checked: { type: Boolean, default: false },
          anuria: { type: Boolean, default: false },
          oliguria: { type: Boolean, default: false },
          polyuria: { type: Boolean, default: false },
        },

        nocturia: { type: Boolean, default: false },

        abnormalUrineAppearance: {
          checked: { type: Boolean, default: false },
          cloudy: { type: Boolean, default: false },
          dark: { type: Boolean, default: false },
          hematuria: { type: Boolean, default: false },
          other: { type: String },
          sediment: { type: Boolean, default: false },
        },

        dialysis: {
          checked: { type: Boolean, default: false },
          type: {
            hemodialysis: { type: Boolean, default: false },
            peritoneal: { type: Boolean, default: false },
            avFistulaShunt: { type: Boolean, default: false },
            nonPalpableThrillNoBruit: { type: Boolean, default: false },
            catheterSignsOfInfection: { type: Boolean, default: false },
          },
          treatmentSchedule: { type: String },
        },

        urostomy: { type: Boolean, default: false },

        indwellingFoleyCatheter: {
          checked: { type: Boolean, default: false },
          dateOfLastCatheterChange: { type: String }, // Date
          catheterChangesManagedBy: { type: String }, // Dropdown
        },

        intermittentCatheterization: {
          checked: { type: Boolean, default: false },
          intermittentCathManagedBy: { type: String }, // Dropdown
        },

        suprapubicCatheter: {
          checked: { type: Boolean, default: false },
          dateOfLastCatheterChange: { type: String }, // Date
          suprapubicCatheterChangesManagedBy: { type: String }, // Dropdown
        },

        utiSignsOrSymptoms: {
          checked: { type: Boolean, default: false },
          acuteDysuria: { type: Boolean, default: false },
          catheterPainTenderness: { type: Boolean, default: false },
          confusion: { type: Boolean, default: false },
          fever: { type: Boolean, default: false },
          flankPain: { type: Boolean, default: false },
          foulOdor: { type: Boolean, default: false },
          newMarkedFrequency: { type: Boolean, default: false },
          awaitingResultsOfUrineTesting: { type: Boolean, default: false },
          startedAntibioticTherapy: { type: Boolean, default: false },
          physicianNotified: { type: Boolean, default: false },
          clinicalManagerNotified: { type: Boolean, default: false },
          physicianChoseNotToTreat: { type: Boolean, default: false },
          receivedOrdersForFollowUp: { type: Boolean, default: false },
          ordersForPlanOfCareNewMedAdded: { type: Boolean, default: false },
        },

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
        abnormalBowelSounds: {
          absent: {
            checked: { type: Boolean, default: false },
            location: { type: String }, // required if checked
          },
          hyperactive: {
            checked: { type: Boolean, default: false },
            location: { type: String }, // required if checked
          },
          hypoactive: {
            checked: { type: Boolean, default: false },
            location: { type: String }, // required if checked
          },
        },
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
        alterationInGenitourinaryStatus: {
          checked: { type: Boolean, default: false }, // Main checkbox
          notes: { type: String }, // Plan of Care notes (free text)
          interventions: {
            teachUTI: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachBladderTraining: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCareOfIndwellingCatheter: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachIntermittentCatheterization: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCareOfNephrostomy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performInsertionOfIndwellingCatheter: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performInsertionOfSuprapubicCatheter: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performIntermittentCatheterization: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performCatheterIrrigation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performBladderInstillation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGenitourinaryOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          goals: {
            returnToStableGenitourinaryStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            catheterPatentAndFreeOfSignsOfInfection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            independenceWithUrinaryDeviceManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            adaptToBodyChangesOrLimitations: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGenitourinaryGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          medicalNecessity: {
            hospitalizationNewlyPrescribed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            diagnosisPrescribed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbationPrescribed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableStatusPrescribed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newOrChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            incontinenceSkilledIntervention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            complexityIntervention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            interventionCatheterDueTo: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            interventionInstillation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            interventionIrrigation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            urostomyManageComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            urostomyComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExpoundUponPatientsGUStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          homeboundNarrative: {
            patientIsHomebound: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithTubeFeeding: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithSevereFatigueAndPostDialysisWeakness: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithStairsInTheHomeOrExitingTheHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientWithImpairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsExhibitingAConsiderableAndTaxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsBedboundAndRequiresAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsBedboundAndUnableToSitInAChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientIsChairboundAndRequiresAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            otherAddOtherHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
        alterationInGastrointestinalStatus: {
          checked: { type: Boolean, default: false }, // Main checkbox for section
          notes: { type: String }, // Plan of Care notes

          interventions: {
            teachColostomy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachIleostomy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachConstipation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachBowelTraining: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachGastrostomyTubeManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachJejunostomyTubeManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performGastrostomyJejunostomyTubeFeeding: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performImpactionRemovalFollowUpEnema: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGastrointestinalOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          goals: {
            returnToStableGastrointestinalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            optimalBowelEvacuation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            effectiveOstomyTubeFeedingManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            essentialNutritionViaEnteralFeedings: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            adherenceToOstomyTubeFeedingsRegimen: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            adaptToBodyChangesOrLimitations: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGastrointestinalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          medicalNecessity: {
            patientWithRecentHospitalizationDueToExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newGIDiagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            exacerbationOfDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableGIStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bowelTrainingProgram: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newOrChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newColostomyIleostomy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            colostomyIleostomyComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundUponPatientsGIStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          homeboundNarrative: {
            postOstomySurgicalPain: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundWithTubeFeeding: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            postDialysisFatigue: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableToNegotiateStairsSafely: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientBedboundUnableToSitInChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientChairboundRequiresAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            patientChairboundButTaxingEffort: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },
    neuroEmotionalBehavioralStatus: {
      neurologicalAssessment: {
        orientedTo: {
          person: { type: Boolean, default: false },
          place: { type: Boolean, default: false },
          time: { type: Boolean, default: false },
        },

        // Checkboxes for symptoms/findings
        noProblemsIdentified: { type: Boolean, default: false },
        dizziness: { type: Boolean, default: false },
        headache: { type: Boolean, default: false },
        forgetful: { type: Boolean, default: false },
        lossOfSensation: { type: Boolean, default: false },
        lethargic: { type: Boolean, default: false },
        rigidity: { type: Boolean, default: false },
        seizurePrecautions: { type: Boolean, default: false },

        // Spasticity with required location
        spasticity: {
          checked: { type: Boolean, default: false },
          location: { type: String },
        },

        // Tremors with required location
        tremors: {
          checked: { type: Boolean, default: false },
          location: { type: String },
        },

        // Abnormal behavior (multiple selections)
        abnormalBehavior: {
          checked: { type: Boolean, default: false },
          agitated: { type: Boolean, default: false },
          anxious: { type: Boolean, default: false },
          abusive: { type: Boolean, default: false },
          combativeOrPhysicalAggression: { type: Boolean, default: false },
          difficultyCoping: { type: Boolean, default: false },
          delusionsParanoia: { type: Boolean, default: false },
          depressionSigns: { type: Boolean, default: false },
          flatAffect: { type: Boolean, default: false },
          hallucinations: { type: Boolean, default: false },
          impairedDecisionMaking: { type: Boolean, default: false },
          inappropriateBehavior: { type: Boolean, default: false },
          irritability: { type: Boolean, default: false },
          psychotropicDrugUse: { type: Boolean, default: false },
          uncooperative: { type: Boolean, default: false },
          verballyDisruptive: { type: Boolean, default: false },
          withdrawn: { type: Boolean, default: false },
          other: { type: String }, // free text if 'Other' checked
        },

        // Neuromuscular weakness/loss
        neuromuscularWeaknessLoss: {
          checked: { type: Boolean, default: false },
          hemiparesisLeft: { type: Boolean, default: false },
          hemiparesisRight: { type: Boolean, default: false },
          hemiplegiaLeft: { type: Boolean, default: false },
          hemiplegiaRight: { type: Boolean, default: false },
          paraplegia: { type: Boolean, default: false },
          quadriplegia: { type: Boolean, default: false },
        },

        comments: { type: String },
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
      ordersForDisciplineAndTreatment: {
        alterationInNeurologicalStatus: {
          checked: { type: Boolean, default: false }, // Main problem statement checkbox
          notes: { type: String }, // Plan of Care notes (free text)

          // INTERVENTIONS
          interventions: {
            teachCVA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachSeizureDisorder: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachParkinsonsDisease: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachMultipleSclerosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalNeurologicalOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceWithSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            returnToStableNeurologicalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            achieveOptimalHealthRegardingCVA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateAdherenceToCVAProgram: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            optimalLevelFunctioningStatusPostCVA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateRestorationDespiteExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateMeasuresDecreaseAspirationRisk: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateImprovementFromCurrentLevel: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            freeFromFallsInjury: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            returnToStableBehavioralStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateKnowledgeRegardingAlzheimers: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalNeurologicalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            recentHospitalizationForExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newNeurologicalDiagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            recentCVA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            extensionOfCVAStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            cvaWithLateEffects: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableNeurologicalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newOrChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundUponPatientsNeurologicalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            sideParalysisDueToCVAAndRequiresAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatusRequiresSupervision: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            stairsInHomeOrExiting: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSitUp: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiresAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndAbleToTransfer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionOfInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },

        alterationInMentalStatus: {
          checked: { type: Boolean, default: false }, // Main problem statement checkbox
          notes: { type: String },

          // INTERVENTIONS
          interventions: {
            assessDepressionStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachDepression: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachAlzheimers: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            needForPsychiatricNursingCertified: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalNeuroBehavioralOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceWithSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            returnToStableBehavioralStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            increasedSenseOfControl: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            realisticResolutionOfProblems: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateKnowledge: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateKnowledgeRegardingAlzheimers: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalNeuroBehavioralGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            newlyDiagnosedAlzheimers: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            lossOfFunctionalAbility: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            progressionOfAlzheimers: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newDiagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundUponPatientsMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            paralysisDueToCVA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableToNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHomeDueToDiseaseProcess: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSitInChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndAbleToTransfer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionOfInabilityToLeaveHomeAlone: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },
    functionalStatus: {
      musculoskeletalAssessment: {
        // Top-level checkboxes
        noProblemsIdentified: { type: Boolean, default: false },
        jointPain: { type: Boolean, default: false },
        poorBalance: { type: Boolean, default: false },
        weightBearingRestrictionFull: { type: Boolean, default: false },
        weightBearingRestrictionPartial: { type: Boolean, default: false },
        weakHandGripStrength: {
          checked: { type: Boolean, default: false },
          location: { type: String }, // free text
        },
        amputation: {
          checked: { type: Boolean, default: false },
          location: { type: String }, // free text
        },
        atrophy: { type: Boolean, default: false },
        jointStiffness: { type: Boolean, default: false },
        shufflingGait: { type: Boolean, default: false },
        limitedROM: {
          checked: { type: Boolean, default: false },
          location: { type: String },
        },
        contracture: {
          checked: { type: Boolean, default: false },
          location: { type: String },
        },

        // Aftercare: knee replacement
        aftercareKneeReplacement: {
          checked: { type: Boolean, default: false },
          anticoagulantSideEffects: { type: Boolean, default: false },
          capillaryRefillOver3Sec: { type: Boolean, default: false },
          coolness: { type: Boolean, default: false },
          cyanosis: { type: Boolean, default: false },
          inabilityToBearWeight: { type: Boolean, default: false },
          lossOfSensationOrMovement: { type: Boolean, default: false },
          painIncreased: { type: Boolean, default: false },
          pallor: { type: Boolean, default: false },
          paresthesia: { type: Boolean, default: false },
          paralysis: { type: Boolean, default: false },
          pulsesAbsentOrDiminished: { type: Boolean, default: false },
          signsSymptomsDVT: { type: Boolean, default: false },
          shorteningOfOperativeExtremity: { type: Boolean, default: false },
          spasms: { type: Boolean, default: false },
          swelling: { type: Boolean, default: false },
        },

        // Aftercare: hip replacement
        aftercareHipReplacement: {
          checked: { type: Boolean, default: false },
          anticoagulantSideEffects: { type: Boolean, default: false },
          capillaryRefillOver3Sec: { type: Boolean, default: false },
          coolness: { type: Boolean, default: false },
          cyanosis: { type: Boolean, default: false },
          inabilityToBearWeight: { type: Boolean, default: false },
          lossOfSensationOrMovement: { type: Boolean, default: false },
          painIncreased: { type: Boolean, default: false },
          pallor: { type: Boolean, default: false },
          paresthesia: { type: Boolean, default: false },
          paralysis: { type: Boolean, default: false },
          pulsesAbsentOrDiminished: { type: Boolean, default: false },
          signsSymptomsDVT: { type: Boolean, default: false },
          shorteningOfOperativeExtremity: { type: Boolean, default: false },
          spasms: { type: Boolean, default: false },
          swelling: { type: Boolean, default: false },
        },

        highRiskForFalls: { type: Boolean, default: false },
        muscleWeakness: { type: Boolean, default: false },
        unsteadyGait: { type: Boolean, default: false },
        fracture: { type: Boolean, default: false },

        // Autoimmune diseases affecting function
        autoimmuneDiseasesAffectingFunction: {
          checked: { type: Boolean, default: false },
          gravesDisease: { type: Boolean, default: false },
          lupus: { type: Boolean, default: false },
          myastheniaGravis: { type: Boolean, default: false },
          multipleSclerosis: { type: Boolean, default: false },
          parkinsonsDisease: { type: Boolean, default: false },
          psoriasis: { type: Boolean, default: false },
          rheumatoidArthritis: { type: Boolean, default: false },
          scleroderma: { type: Boolean, default: false },
          sjogrensSyndrome: { type: Boolean, default: false },
          other: { type: Boolean, default: false },
          otherText: { type: String },
        },

        comments: { type: String }, // free text for any extra notes
      },
      fallRiskAssessment: {
        age65OrOlder: { type: Boolean, default: false }, // Age 65+
        diagnosisThreeOrMoreCoexisting: { type: Boolean, default: false }, // Diagnosis (3 or More Co-Existing)
        priorHistoryOfFallsWithin3Months: { type: Boolean, default: false }, // Prior History of Falls Within 3 Months
        incontinence: { type: Boolean, default: false }, // Incontinence
        visualImpairment: { type: Boolean, default: false }, // Visual Impairment
        impairedFunctionalMobility: { type: Boolean, default: false }, // Impaired Functional Mobility
        environmentalHazards: { type: Boolean, default: false }, // Environmental Hazards
        polypharmacyFourOrMore: { type: Boolean, default: false }, // Polypharmacy (4 or more prescriptions)
        painAffectingLevelOfFunction: { type: Boolean, default: false }, // Pain Affecting Level of Function
        cognitiveImpairment: { type: Boolean, default: false }, // Cognitive Impairment
        timedUpAndGoTest: { type: Boolean, default: false }, // Click to assess Timed Up and Go Test
        fallAssessmentTotal: { type: Number, default: 0 }, // Fall Assessment Total
        // Optionally, add a date, assessor name, or notes field if needed
        notes: { type: String },
        TUG: { type: String },
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
          ambulation: { type: Boolean, default: false },
          amputation: { type: Boolean, default: false },
          bowelIncontinence: { type: Boolean, default: false },
          bladderIncontinence: { type: Boolean, default: false },
          contracture: { type: Boolean, default: false },
          dyspneaAtRest: { type: Boolean, default: false },
          dyspneaWithMinimalExertion: { type: Boolean, default: false },
          dyspneaWithModerateExertion: { type: Boolean, default: false },
          endurance: { type: Boolean, default: false },
          hearingDeficit: { type: Boolean, default: false },
          visionDeficit: { type: Boolean, default: false },
          legallyBlind: { type: Boolean, default: false },
          paralysis: { type: Boolean, default: false },
          speechCommunicationDeficit: { type: Boolean, default: false },
          other: { type: String }, // Free-text for other limitations
        },
        activitiesPermittedRestricted: {
          noRestrictions: { type: Boolean, default: false },
          bedBoundUnableToSitInChair: { type: Boolean, default: false },
          completeBedRest: { type: Boolean, default: false },
          bedRestWithBRP: { type: Boolean, default: false },
          upAsTolerated: { type: Boolean, default: false },
          transferBedChair: { type: Boolean, default: false },
          exercisePrescribed: { type: Boolean, default: false },
          partialWeightBearing: { type: Boolean, default: false },
          humanAssistanceRequired: { type: Boolean, default: false },
          crutches: { type: Boolean, default: false },
          cane: { type: Boolean, default: false },
          wheelchair: { type: Boolean, default: false },
          walker: { type: Boolean, default: false },
          other: { type: String }, // Free-text for additional restrictions
        },
      },
      ordersForDisciplineAndTreatment: {
        // Main problem statement checkboxes
        musculoskeletalStatus: {
          checked: { type: Boolean, default: false }, // "Alteration in Musculoskeletal Status"
          notes: { type: String }, // Plan of Care Notes

          interventions: {
            teachTotalKneeReplacement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachTotalHipReplacement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachOsteoarthritis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachRheumatoidArthritis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMusculoskeletalOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          goals: {
            demonstrateCompetenceSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateStableMusculoskeletalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            achieveOptimalLevelOfHealth: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateAdherenceToRehabProgram: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            verbalizePotentialComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            absenceOfFallsInjury: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            adaptToBodyChangesLimitations: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateImprovement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMusculoskeletalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          medicalNecessity: {
            increasedRiskObservation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            recentAmputationObservation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            recentAmputationTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            stumpComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            fractureObservation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            fractureComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            hipReplacementSkilledCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            kneeReplacementSkilledCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            surgicalComplicationsCareChange: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newDiagnosisRegimenChange: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundOnMusculoskeletalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          homeboundNarrative: {
            newComplicatedAKABKA: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            physicianMedicalRestriction: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            limitedMobilityPathologicalFracture: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            postoperativeMobilityDeficits: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableToNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortLeaveHomeDisease: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSitInChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiresAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
        // Fall prevention plan block (same structure)
        fallPreventionPlan: {
          checked: { type: Boolean, default: false }, // "Need for Fall Prevention Plan"
          notes: { type: String }, // Plan of Care Notes
          interventions: {
            teachHighRiskFallPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          goals: {
            ableToIdentifyFallRisks: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstratesProperUseOfAssistiveDevices: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            wearsAppropriateFootwear: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            clearPathways: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            adequateLighting: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bathroomSafetyEquipment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            understandsRisksWithPets: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            complianceHomeExercise: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            freeOfFallsInjury: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },

    functionalAbilitiesGoals: {
      priorFunctioningEverydayActivities: {
        selfCare: { type: String }, // E.g., "Independent", "Needs Assistance", Depenedent, Unknown, NotApplicable
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
        wheelchairOrScooterUse: {
          use: { type: String }, // "No", "Yes", "No information available"
          wheel50FeetWithTwoTurns: {
            socRocPerformance: { type: String }, // Dropdown selection
            typeUsed: { type: String }, // "Manual", "Motorized"
          },
          wheel150Feet: {
            socRocPerformance: { type: String }, // Dropdown selection
            typeUsed: { type: String }, // "Manual", "Motorized"
          },
        },
      },
      comments: { type: String }, // Field for additional comments
      ordersForDisciplineAndTreatment: {
        // PHYSICAL THERAPY (PT)
        ptNeedForTherapy: {
          checked: { type: Boolean, default: false },
          // INTERVENTIONS
          interventions: {
            physicalTherapyToTreatAndEvaluate: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // GOALS
          goals: {
            evaluationWillBePerformed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalPtEvaluationGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // MEDICAL NECESSITY
          medicalNecessity: {
            strengthEnduranceTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachAndTrainTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            unableToNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSitInChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          notes: { type: String }, // Free text for section-level notes if needed
        },

        // OCCUPATIONAL THERAPY (OT)
        otNeedForTherapy: {
          checked: { type: Boolean, default: false },
          // INTERVENTIONS
          interventions: {
            occupationalTherapyToTreatAndEvaluate: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // GOALS
          goals: {
            evaluationWillBePerformed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalOtEvaluationGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // MEDICAL NECESSITY
          medicalNecessity: {
            strengthEnduranceTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachAndTrainTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            unableToNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSitInChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          notes: { type: String },
        },

        // SPEECH THERAPY (ST)
        stNeedForTherapy: {
          checked: { type: Boolean, default: false },
          // INTERVENTIONS
          interventions: {
            speechTherapyToTreatAndEvaluate: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // GOALS
          goals: {
            evaluationWillBePerformed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalStEvaluationGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // MEDICAL NECESSITY
          medicalNecessity: {
            diagnosticEvaluation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachAndTrainTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            unableToNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortToLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSitInChair: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          notes: { type: String },
        },
      },
    },
    endocrineHematologicalAssessment: {
      assessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        anemia: {
          checked: { type: Boolean, default: false }, // Main anemia checkbox
          types: [{ type: String }], // Examples: ["Iron deficiency", "Vitamin B-12 deficiency", ...]
          otherType: { type: String }, // If "Other" is checked, fill in this field
        },
        cancer: { type: String },
        hypothyroidism: { type: Boolean, default: false },
        hyperthyroidism: { type: Boolean, default: false },
        diabetes: {
          bloodSugarsPerformedBy: { type: String }, // Person performing blood sugars
          fastingBloodSugar: {
            from: { type: String }, // mg/dl value
            to: { type: String }, // mg/dl value
          },
          randomBloodSugar: {
            from: { type: String }, // mg/dl value
            to: { type: String }, // mg/dl value
          },
          statusUnknown: { type: String }, // "Yes" or empty
          symptoms: [{ type: String }], // e.g. ["S/S of hyperglycemia", "S/S of hypoglycemia"]
          diabeticFootCareNotFollowed: { type: String }, // "Yes" or empty
          diabeticManagement: { type: String }, // "Yes" or empty
        },
      },
      comments: { type: String }, // Field to store additional comments
      ordersForDisciplineAndTreatment: {
        alterationInGlucoseMetabolism: {
          checked: { type: Boolean, default: false }, // Main checkbox
          notes: { type: String }, // Plan of Care notes

          // INTERVENTIONS
          interventions: {
            teachDiabetesMellitus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachInsulinInjection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachDiabeticFootcare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performAssessBloodSugarLevels: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performInsulinAdministration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performHypoglycemiaPlan: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performInsulinAdminSS: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performDiabeticFingerStick: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performDiabeticFingerStickPRN: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performPreFillingInsulinSyringes: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19HighRisk: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            telehealthDiabetes: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalEndocrineOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateReturnStableEndocrineStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            minimizeLongTermDiabetesComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            maintainBloodSugarWithinNormalRange: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            decreasedChemoRadiationSideEffects: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateSymptomManagementStrategies: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalEndocrineGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            recentHospitalizationExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newDiagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableEndocrineStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            progressionOfDiseaseAssessment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachInsulinSelfAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            requiresSNInsulinAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            reasonUnablePerformInsulinAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            noWillingAbleCaregiver: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundDiseaseStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            severeNeuropathy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            weaknessChemoRadiation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSit: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19MedicalRestriction: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },

        alterationInHematologicalStatus: {
          checked: { type: Boolean, default: false }, // Main checkbox
          notes: { type: String }, // Plan of Care notes

          // INTERVENTIONS
          interventions: {
            teachIronDeficiencyAnemia: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachCancer: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19HighRisk: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            telehealthHematological: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHematologicOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            demonstrateCompetenceSelfManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateReturnStableEndocrineStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            minimizeLongTermDiabetesComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            maintainBloodSugarWithinNormalRange: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            decreasedChemoRadiationSideEffects: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateSymptomManagementStrategies: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHematologicGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            recentHospitalizationExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newDiagnosis: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            acuteExacerbation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unstableEndocrineStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            progressionOfDiseaseAssessment: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            newChangedMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachInsulinSelfAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            requiresSNInsulinAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            reasonUnablePerformInsulinAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            noWillingAbleCaregiver: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundDiseaseStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            severeNeuropathy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            weaknessChemoRadiation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            unableNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSit: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            covid19MedicalRestriction: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
      },
    },

    nutritionAssessment: {
      nutritionAssessment: {
        noProblemsIdentified: { type: Boolean, default: false },
        difficultyChewing: { type: Boolean, default: false },
        edentulous: { type: Boolean, default: false },
        tubeFeeding: {
          present: { type: Boolean, default: false }, // Main checkbox: Tube feeding present

          // If tube feeding is present:
          typeOfTube: [{ type: String }], // e.g., "PEG", "NGT", "G-tube", etc.
          residualMl: { type: String }, // e.g., "120"
          feedingAmount: { type: String }, // e.g., "200 ml"
          feedingFrequency: { type: String }, // e.g., "Every 4 hours", or "Continuous"
          freeWater: { type: String }, // e.g., "100 ml every 6 hours"
          managementComplications: {
            notToleratingFeeding: { type: Boolean, default: false },
            managedByPatient: { type: Boolean, default: false },
            managedByCaregiver: { type: Boolean, default: false },
            patientCaregiverRequireTraining: { type: Boolean, default: false },
            physicianNotifiedComplications: { type: Boolean, default: false },
            clinicalManagerNotifiedComplications: {
              type: Boolean,
              default: false,
            },
          },
        },
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
        noProblemsIdentified: { type: Boolean, default: false },
        hasLostWeight: { type: Boolean, default: false }, // 15 - Without reason, has lost more than 10 lbs. in the last 3 months
        illnessChangedEating: { type: Boolean, default: false }, // 10 - Has an illness or condition that made Patient change the type and/or amount of food eaten
        openUlcerBurnWound: { type: Boolean, default: false }, // 10 - Has open decubitus, ulcer, burn or wound
        eatsFewerThan2Meals: { type: Boolean, default: false }, // 10 - Eats fewer than 2 meals a day
        mouthToothProblem: { type: Boolean, default: false }, // 10 - Has a tooth/mouth problem that makes it hard to eat
        drinksAlcoholDaily: { type: Boolean, default: false }, // 10 - Has 3 or more drinks of beer, liquor or wine almost every day
        moneyForFood: { type: Boolean, default: false }, // 10 - Does not always have enough money to buy foods needed
        eatsFewFruitsVegMilk: { type: Boolean, default: false }, // 5 - Eats few fruits or vegetables, or milk products
        eatsAloneMostTime: { type: Boolean, default: false }, // 5 - Eats alone most of the time
        takes3OrMoreMeds: { type: Boolean, default: false }, // 5 - Takes 3 or more prescribed or OTC medications a day
        notPhysicallyAble: { type: Boolean, default: false }, // 5 - Is not always physically able to cook and/or feed self and has no caregiver to assist
        frequentDiarrheaConstipation: { type: Boolean, default: false }, // 5 - Frequently has diarrhea or constipation

        // Calculated fields
        totalScore: { type: Number, default: 0 },
        riskCategory: { type: String }, // "Good Nutritional Status", "Moderate Nutritional Risk", "High Nutritional Risk"
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
        sodiumRestriction: {
          checked: { type: Boolean, default: false },
          details: { type: String }, // "Enter Sodium Restriction"
        },
        noAddedSalt: { type: Boolean, default: false },
        calorieADA: {
          checked: { type: Boolean, default: false },
          details: { type: String }, // "Enter Calorie ADA Diet Details"
        },
        noConcentratedSweets: { type: Boolean, default: false },
        coumadinDiet: { type: Boolean, default: false },
        renalDiet: { type: Boolean, default: false },
        enteralNutrition: { type: Boolean, default: false },
        TPN: { type: Boolean, default: false },
        supplements: {
          checked: { type: Boolean, default: false },
          details: { type: String }, // "Enter Supplements"
        },
        fluidRestriction: {
          checked: { type: Boolean, default: false },
          details: { type: String }, // "Fluid restriction"
        },
        other: {
          checked: { type: Boolean, default: false },
          details: { type: String }, // "Enter Nutritional Requirements"
        },
      },
      ordersForDisciplineAndTreatment: {
        alterationInNutrition: {
          checked: { type: Boolean, default: false }, // Main checkbox for "Alteration in Nutrition"
          notes: { type: String }, // Plan of Care Notes

          // INTERVENTIONS
          interventions: {
            teachObesityDiagnosed: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachOverEating: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachMalnutrition: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            needForDietician: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalNutritionOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            achieveMaintainBodyWeight: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            caregiverAbleToVerbalizeActivityNutritionRelationship: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalNutritionGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // MEDICAL NECESSITY
          medicalNecessity: {
            interventionToManageObesity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            interventionToManageMalnutrition: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            interventionToManageDehydration: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            initiationOfEnteralNutritionTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            complicationsOfEnteralNutritionTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundDiseaseStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            unableNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSit: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
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
        // Main toggles
        medicationsReconciled: { type: Boolean, default: false },
        medicationIssuesIdentified: { type: Boolean, default: false },

        // Medication(s) Issues Block
        medicationIssues: {
          adverseReaction: { type: Boolean, default: false }, // e.g., rash
          drugInteraction: { type: Boolean, default: false }, // serious drug to drug
          duplicateTherapy: { type: Boolean, default: false }, // brand and generic
          ineffectiveDrugTherapy: { type: Boolean, default: false }, // e.g., analgesics for pain
          missingDrugs: { type: Boolean, default: false },
          nonAdherence: { type: Boolean, default: false },
          takingMoreThanPrescribed: { type: Boolean, default: false },
          takingLessThanPrescribed: { type: Boolean, default: false },
          physicianNotified: { type: Boolean, default: false },
          clinicalManagerNotified: { type: Boolean, default: false },
          // Free text for medication name(s) and issue description
          medicationIssueDetails: { type: String }, // Required field in UI
        },

        // Anticoagulant Use Block
        anticoagulantUse: {
          present: { type: Boolean, default: false }, // Main checkbox
          currentMedication: { type: String }, // Free text for medication and dosage

          // Checkbox options
          selfMonitorPTINR: { type: Boolean, default: false },
          monitoredAtPhysicianOffice: { type: Boolean, default: false },
          monitoredByHomeHealth: { type: Boolean, default: false },
          excessiveBruising: { type: Boolean, default: false },
          adverseReactionToAnticoagulant: { type: Boolean, default: false },
          teachingRequiredMonitoring: { type: Boolean, default: false },
          teachingRequiredAdministration: { type: Boolean, default: false },
          independentAdministration: { type: Boolean, default: false },
          independentMonitoring: { type: Boolean, default: false },
          noAdverseReaction: { type: Boolean, default: false },
        },

        // Pre-filled Medication Items
        pillBoxPrefilled: { type: Boolean, default: false },
        insulinSyringesPrefilled: { type: Boolean, default: false },

        // Intravenous or Infusion Therapy Block
        intravenousInfusionTherapy: {
          present: { type: Boolean, default: false },
          // Type of access (multi-checkbox)
          typeOfAccess: {
            centralLine: { type: Boolean, default: false },
            medAPort: { type: Boolean, default: false },
            piccLine: { type: Boolean, default: false },
            portACath: { type: Boolean, default: false },
            salineLock: { type: Boolean, default: false },
            other: { type: Boolean, default: false },
            otherDetails: { type: String }, // Free text if other is checked
          },
          ivLocation: { type: String }, // Free text
          // Condition of IV site (multi-checkbox)
          conditionOfIVSite: {
            wnl: { type: Boolean, default: false },
            bleeding: { type: Boolean, default: false },
            extravasation: { type: Boolean, default: false },
            pallor: { type: Boolean, default: false },
            red: { type: Boolean, default: false },
            swelling: { type: Boolean, default: false },
            warmth: { type: Boolean, default: false },
          },
          // Condition of Dressing (multi-checkbox)
          conditionOfDressing: {
            cleanDryIntact: { type: Boolean, default: false },
            bloody: { type: Boolean, default: false },
            soiled: { type: Boolean, default: false },
            other: { type: Boolean, default: false },
            otherDetails: { type: String }, // Free text if other is checked
          },
          signsSymptomsInfection: { type: String }, // Free text: area of infection
          lastDressingChangeDate: { type: String }, // Date string
          insertionDate: { type: String }, // Date string
        },
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
          antipsychotic: { type: String },
          anticoagulant: { type: String },
          antibiotic: { type: String },
          opioid: { type: String },
          antiepileptic: { type: String },
          hypoglycemics: { type: String },
          noneOfTheAbove: { type: Boolean, default: false },
        },
        indicationNeeded: {
          highRiskDrugClasses: {
            antipsychotic: {
              isTaking: { type: Boolean, default: false },
              indicationNoted: { type: Boolean, default: false },
            },
            opioid: {
              isTaking: { type: Boolean, default: false },
              indicationNoted: { type: Boolean, default: false },
            },
            anticoagulant: {
              isTaking: { type: Boolean, default: false },
              indicationNoted: { type: Boolean, default: false },
            },
            antiplatelet: {
              isTaking: { type: Boolean, default: false },
              indicationNoted: { type: Boolean, default: false },
            },
            antibiotic: {
              isTaking: { type: Boolean, default: false },
              indicationNoted: { type: Boolean, default: false },
            },
            hypoglycemic: {
              isTaking: { type: Boolean, default: false },
              indicationNoted: { type: Boolean, default: false },
            },
            noneOfTheAbove: { type: Boolean, default: false },
            noInformationAvailable: { type: Boolean, default: false },
          },
        },
      },
      comments: { type: String },
      ordersForDisciplineAndTreatment: {
        // ---- Medication Management ----
        medicationManagement: {
          checked: { type: Boolean, default: false }, // Main checkbox
          // INTERVENTIONS
          interventions: {
            medReviewAndReconciliation: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachMedicationKnowledgeDeficits: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachAnticoagulationTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachUseOfAnticoagulationMachine: {
              checked: { type: Boolean, default: false },
              notes: { type: String }, // Plan of Care or detailed instructions
            },
            teachPillManagementSystem: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performPreFillPillBox: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performPTINR: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicationManagementOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // GOALS
          goals: {
            manageMedicationRegimen: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            medicationRegimenCompliance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            ptinrStabilized: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicationManagementGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // MEDICAL NECESSITY
          medicalNecessity: {
            knowledgeDeficitsRegardingMedications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            initiationOfTotalParenteralNutritionTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            totalParenteralNutritionComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            initiationOfIntravenousInfusionTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            complicationsOfIVInfusionTherapy: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            requiresIMMedicationAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            requiresSQMedicationAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            expoundMedicationAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalMedicalNecessity: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // HOMEBOUND NARRATIVE
          homeboundNarrative: {
            unableNegotiateStairs: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            taxingEffortLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            impairedMentalStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            bedboundUnableToSit: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundRequiringAssistance: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            chairboundAndCanTransferTaxing: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            furtherDescriptionInabilityLeaveHome: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalHomeboundNarrative: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },

        // ---- Injections ----
        injections: {
          checked: { type: Boolean, default: false },
          interventions: {
            performVitaminB12Injection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performSubQInjectionOther: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performIMInjections: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          goals: {
            demonstrateAbilityAdministerInjection: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // medical necessity, homebound narrative as above if required
        },

        // ---- IV and/or Parenteral Therapy ----
        parenteralTherapy: {
          checked: { type: Boolean, default: false },
          interventions: {
            teachIVManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performIVMedicationAdmin: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performIVAdministerTPN: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performIVAccessIV: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performIVDressingChange: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalIVOrders: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          goals: {
            ivAccessWithoutComplications: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            demonstrateAbilityPerformIVManagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            toleranceToIVMedication: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalIVGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // medical necessity, homebound narrative as above if required
        },

        // ---- Diagnostic Testing ----
        diagnosticTesting: {
          checked: { type: Boolean, default: false },
          interventions: {
            performDiagnosticBlood: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performDiagnosticUrine: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performDiagnosticStool: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            performDiagnosticCulture: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
          // goals, medical necessity, homebound narrative as above if required
        },
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
          checked: { type: Boolean, default: false }, // Main checkbox for Need for Process Measures

          notes: { type: String }, // Plan of Care text area

          // INTERVENTIONS
          interventions: {
            assessDepressionStatus: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachDiabeticFootCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachHighRiskForFalls: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            teachPressureUlcerPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalProcessMeasures: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },

          // GOALS
          goals: {
            processMeasureActiveEngagement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureAbilityToSetGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureDepressionCopingSkills: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureDepressionStabilization: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasurePHQ2Improvement: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureDiabeticFootCare: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureSkinLesionPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureFallPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasureAbilityToVerbalizeFallPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            processMeasurePressureUlcerPrevention: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
            additionalGoals: {
              checked: { type: Boolean, default: false },
              notes: { type: String },
            },
          },
        },
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
        name: { type: String, maxlength: 255 },
        phone: { type: String, maxlength: 50 },
        suppliesProvided: { type: String, maxlength: 1000 },
      },
      comments: {
        type: String,
        maxlength: 5000,
      },
      supplies: [
        {
          description: { type: String, required: true, maxlength: 255 }, // e.g., "Gauze", "Gloves"
          quantity: { type: Number, required: true, min: 1 }, // e.g., 10, 5, etc.
          date: { type: Date, required: true }, // Date supplied/provided
          // No "Action" in schema: handled by frontend logic
        },
      ],
    },

    aideCarePlan: {
      ordersForDisciplineAndTreatment: {
        hhaNeedForHomeHealthAide: {
          type: Boolean,
          default: false,
          default: false,
        }, // Checkbox for "HHA - Need for Home Health Aide"
        needForOtherAideServicesMedicaid: {
          type: Boolean,
          default: false,
          default: false,
        }, // Checkbox for "Need for Other Aide Services (Medicaid)"
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
      // PHYSICIAN VISIT INFORMATION (already defined above)
      physicianVisitInformation: {
        notApplicable: { type: Boolean, default: false },
        lastPhysicianVisitDate: { type: Date },
        faceToFace: {
          complete: { type: Boolean, default: false },
          incomplete: { type: Boolean, default: false },
          faceToFaceAddendumRequired: { type: Boolean, default: false },
          followupVisitRequired: { type: Boolean, default: false },
          instructedOnRegulation: { type: Boolean, default: false },
          assistedWithAppointment: { type: Boolean, default: false },
          barriersToCompletion: { type: Boolean, default: false },
          comments: { type: String },
        },
      },

      // LABS AND INFECTION CONTROL
      labsAndInfectionControl: {
        na: { type: Boolean, default: false }, // N/A
        bloodTestObtained: {
          checked: { type: Boolean, default: false },
          venipuncture: {
            needleGauge: { type: String },
            numberOfAttempts: { type: String },
            site: { type: String },
            bloodTestObtainedOptions: {
              toleratedWell: { type: Boolean, default: false },
              toleratedFairly: { type: Boolean, default: false },
              toleratedPoorly: { type: Boolean, default: false },
              bruising: { type: Boolean, default: false },
              bleeding: { type: Boolean, default: false },
            },
          },
        },
        urineSpecimenObtained: {
          checked: { type: Boolean, default: false },
          urinalysisObtained: { type: Boolean, default: false },
          uaReflexToCSObtained: { type: Boolean, default: false },
          cleanCatchObtained: { type: Boolean, default: false },
          collectedFromIndwellingCatheter: { type: Boolean, default: false },
          collectedViaInOutCatheter: { type: Boolean, default: false },
          other: { type: String },
        },
        comments: { type: String },

        // INFECTION CONTROL
        infectionControl: {
          universalPrecautionsObserved: { type: Boolean, default: false },
          sharpsDisposedPerBiohazard: { type: Boolean, default: false },
          soiledWasteDisposedPerBiohazard: { type: Boolean, default: false },
          patientKnowledgeDeficit: {
            checked: { type: Boolean, default: false },
            poorHandwashingTechnique: { type: Boolean, default: false },
            notFollowingProtocols: { type: Boolean, default: false },
            instructedFurther: { type: Boolean, default: false },
            other: { type: String },
          },
          infectionSuspected: {
            checked: { type: Boolean, default: false },
            physicianNotified: { type: Boolean, default: false },
            clinicalManagerNotified: { type: Boolean, default: false },
          },
          nosocomialInfectionIdentified: { type: Boolean, default: false },
          communityAcquiredInfectionIdentified: {
            type: Boolean,
            default: false,
          },
        },
      },
      patientRights: {
        notApplicable: { type: Boolean, default: false }, // N/A checkbox

        // Patient's Areas of Interest
        areasOfInterest: {
          howToTakeMedications: { type: Boolean, default: false },
          whatToEat: { type: Boolean, default: false },
          activityAndExercise: { type: Boolean, default: false },
          howToManageSymptoms: { type: Boolean, default: false },
          whenToSeekHelp: { type: Boolean, default: false },
          howToStayOutOfHospital: { type: Boolean, default: false },
          whereToGetMoreInformation: { type: Boolean, default: false },
          other: {
            checked: { type: Boolean, default: false },
            value: { type: String },
          },
        },

        // Patient Goal (large text area)
        patientGoal: { type: String },

        // Plan of Care Review
        planOfCareReview: {
          planOfCare: { type: Boolean, default: false },
          developedAndReviewedWithPatient: { type: Boolean, default: false },
          developedAndReviewedWithSelectedRep: {
            type: Boolean,
            default: false,
          },
          developedAndReviewedWithLegalRep: { type: Boolean, default: false },
        },

        // Plan of Care Patient Response
        patientResponse: {
          willingAbleToParticipate: { type: Boolean, default: false },
          willingUnableToParticipate: { type: Boolean, default: false },
          unwillingToParticipate: { type: Boolean, default: false },
          barriersImpedingParticipation: { type: Boolean, default: false },
          agreesWithIdentifiedGoals: { type: Boolean, default: false },
          disagreesWithGoals: { type: Boolean, default: false },
          planNotAcceptable: { type: Boolean, default: false },
          agreesAsPresented: { type: Boolean, default: false },
          agreesWithRevisions: { type: Boolean, default: false },
        },

        // Plan of Care - Representative Response
        repResponse: {
          notApplicable: { type: Boolean, default: false },
          willingAbleToParticipate: { type: Boolean, default: false },
          willingUnableToParticipate: { type: Boolean, default: false },
          unwillingToParticipate: { type: Boolean, default: false },
          barriersImpedingParticipation: { type: Boolean, default: false },
          agreesWithIdentifiedGoals: { type: Boolean, default: false },
          disagreesWithGoals: { type: Boolean, default: false },
          planNotAcceptable: { type: Boolean, default: false },
          agreesAsPresented: { type: Boolean, default: false },
          agreesWithRevisions: { type: Boolean, default: false },
        },

        // Plan of Care - Representative Involvement
        repInvolvement: {
          involvement: { type: Boolean, default: false },
          patientElectedNotToIncludeRep: { type: Boolean, default: false },
          patientAbleToIdentifySupportPeople: { type: Boolean, default: false },
          supportPeopleDetails: { type: String }, // "Enter Willing/Able Caregiver, etc."
          other: { type: Boolean, default: false },
          otherDetails: { type: String },
        },

        // Patient Strengths
        patientStrengths: {
          notApplicable: { type: Boolean, default: false },
          motivatedLearner: { type: Boolean, default: false },
          strongSupportSystem: { type: Boolean, default: false },
          absenceOfComorbidities: { type: Boolean, default: false },
          enhancedSocioeconomicStatus: { type: Boolean, default: false },
          highSchoolGraduate: { type: Boolean, default: false },
          collegeGraduate: { type: Boolean, default: false },
          other: {
            checked: { type: Boolean, default: false },
            description: { type: String },
          },
        },

        // Care Coordination
        careCoordination: {
          coordinatedCareWith: { type: Boolean, default: false }, // Main checkbox
          coordinatedCareOptions: [{ type: String }], // Multiselect, array of options
          nameOrTitle: { type: String }, // Name/Title field
          regarding: { type: Boolean, default: false }, // Main checkbox for "Regarding"
          regardingDetails: { type: String }, // Text field for "Regarding"
        },
      },
      visitInterventions: {
        notApplicable: { type: Boolean, default: false }, // N/A

        legal: {
          checked: { type: Boolean, default: false },
          patientReceivedRights: { type: Boolean, default: false },
          engagedPatientDiscussion: { type: Boolean, default: false },
          oralCommunicationRights: { type: Boolean, default: false },
          patientDeclinedNotice: { type: Boolean, default: false },
          informedHHApolicies: { type: Boolean, default: false },
          informedContactInfoFederal: { type: Boolean, default: false },
          informedContactInfoHHA: { type: Boolean, default: false },
          additionalIntervention: { type: String },
        },

        medicationReview: {
          checked: { type: Boolean, default: false },
          performedMedicationReview: { type: Boolean, default: false },
          performedReconciliation: { type: Boolean, default: false },
          instructedOnMedicationAdmin: { type: Boolean, default: false },
          additionalIntervention: { type: String },
        },

        diseaseProcess: {
          checked: { type: Boolean, default: false },
          instructedOnDiseaseSigns: { type: Boolean, default: false },
          establishedCarePlan: { type: Boolean, default: false },
          additionalIntervention: { type: String },
        },

        safety: {
          checked: { type: Boolean, default: false },
          instructedOnHomeSafety: { type: Boolean, default: false },
          instructedOnFallPrevention: { type: Boolean, default: false },
          instructedOnInfectionControl: { type: Boolean, default: false },
          additionalIntervention: { type: String },
        },

        disciplinesScheduling: {
          checked: { type: Boolean, default: false },
          instructedOnDisciplines: { type: Boolean, default: false },
          agreedOnSchedule: { type: Boolean, default: false },
          additionalIntervention: { type: String },
        },

        physicianContact: {
          checked: { type: Boolean, default: false },
          contactedPhysician: { type: Boolean, default: false },
          primaryCareOversight: { type: Boolean, default: false },
          identifiedAllPhysicians: { type: Boolean, default: false },
          additionalIntervention: { type: String },
        },

        customInterventions: {
          templates: [{ type: String }], // Template selection dropdown (array)
          interventionsDetails: { type: String, maxlength: 5000 },
          responseToTeaching: { type: String, maxlength: 5000 },
        },
      },
      admissionSummaryF2FAddendum: {
        templates: [{ type: String }], // Template dropdown, allows multiple selections
        visitNarrative: { type: String, maxlength: 5000 }, // Free text, up to 5000 characters
      },
      planOfCareDisciplineOrdersTreatment: {
        skilledNurseEvaluationNeeded: {
          checked: { type: Boolean, default: false },
          planOfCareOrdersLocator: { type: String },
          additionalOrders: { type: String },
        },
        therapyOnlyCase: {
          checked: { type: Boolean, default: false },
          planOfCareOrdersLocator: { type: String },
          additionalOrders: { type: String },
        },
        nonSkilledPlanManagement: {
          checked: { type: Boolean, default: false },
          planOfCareOrdersLocator: { type: String },
          additionalOrders: { type: String },
        },
        skilledNurseEvalNoFurtherVisits: {
          checked: { type: Boolean, default: false },
          nonAdmit: { type: Boolean, default: false },
        },
        additionalPhysiciansOnCase: {
          checked: { type: Boolean, default: false },
          physicians: [{ type: String }], // Array for storing additional physician info if needed
        },
        needOralExplanationBy2ndVisit: {
          checked: { type: Boolean, default: false },
          explanationNote: { type: String }, // Text field for oral explanation note
        },
      },
      planOfCareRehabAndDischarge: {
        rehabilitationPotential: {
          value: { type: String }, // e.g., "Excellent", "Good", "Fair", "Poor" or dropdown options
          notes: { type: String }, // optional: notes on rehab potential
        },
        dischargePlans: {
          providerAfterDischarge: { type: String }, // Care provider selected after discharge
          notes: { type: String }, // optional: additional notes about discharge plans
        },
        dischargePatientWhen: {
          patientDemonstratesSkillsToSelfManageDisease: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          caregiverDemonstratesSkillsToAidPatient: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          patientReturnToStableStatus: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          painLevelStabilizesPatientSelfManagesPain: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          patientAbleToPerformProcedureWithoutPrompting: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          caregiverAbleToPerformProcedureWithoutPrompting: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          woundsHealed: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          caregiverManagesWounds: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          caregiverIdentifiedToInstructAndDemonstrate: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
          other: {
            checked: { type: Boolean, default: false },
            notes: { type: String },
          },
        },
        disciplineFrequencyAndDuration: {
          sn: {
            frequency: { type: String }, // e.g., "2w2"
            description: { type: String }, // "Enter Frequency Description"
            effectiveDate: { type: Date }, // optional
          },
          pt: {
            frequency: { type: String },
            description: { type: String },
            effectiveDate: { type: Date },
          },
          ot: {
            frequency: { type: String },
            description: { type: String },
            effectiveDate: { type: Date },
          },
          st: {
            frequency: { type: String },
            description: { type: String },
            effectiveDate: { type: Date },
          },
          msw: {
            frequency: { type: String },
            description: { type: String },
            effectiveDate: { type: Date },
          },
          hha: {
            frequency: { type: String },
            description: { type: String },
            effectiveDate: { type: Date },
          },
        },
      },
    },

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
oasisAssessmentSchema
  .virtual("physicianOrPractitionerStatement")
  .get(function () {
    const formattedDate = this.updatedAt
      ? this.updatedAt.toISOString().slice(0, 10) // Formats date as YYYY-MM-DD
      : "N/A";
    return `I certify/recertify that this patient is confined to his/her home (as outlined in section 30.1.1 in Chapter 7 of the Medicare Benefit Policy Manual) and needs intermittent skilled nursing care, physical therapy and/or speech therapy or continues to need occupational therapy. The patient is under my care, and I have authorized services on this plan of care and will periodically review the plan. The patient had a face-to-face encounter with an allowed provider type on ${formattedDate} and the encounter was related to the primary reason for home health care.`;
  });

const OASISAssessment = mongoose.model(
  "OASISAssessment",
  oasisAssessmentSchema
);

module.exports = OASISAssessment;
