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
      required: true,
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
    },
    // Clinical Record Section
    clinicalRecord: {
      primaryDiagnosis: { type: String },
      otherDiagnoses: [{ diagnosis: { type: String }, icdCode: { type: String } }],
      allergies: [{ type: String }],
      medications: [
        {
          name: { type: String },
          dosage: { type: String },
          frequency: { type: String },
        },
      ],
      comorbidities: [{ type: String }],
    },
    // Vital Signs
    vitalSigns: {
      temperature: { type: Number },
      pulseRate: { type: Number },
      respiratoryRate: { type: Number },
      oxygenSaturation: { type: Number },
      bloodPressure: {
        lying: { systolic: { type: Number }, diastolic: { type: Number } },
        sitting: { systolic: { type: Number }, diastolic: { type: Number } },
        standing: { systolic: { type: Number }, diastolic: { type: Number } },
      },
      heightInches: { type: Number },
      weightPounds: { type: Number },
      bmi: { type: Number },
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
    },
    // Prognosis Section
    prognosis: {
      response: { type: String },
      comments: {
        templates: { type: String },
        additionalComments: { type: String },
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
    // Additional Notes
    additionalNotes: { type: String },
  },
  { timestamps: true }
);

const OASISAssessment = mongoose.model("OASISAssessment", oasisAssessmentSchema);

module.exports = OASISAssessment;
