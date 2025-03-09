const mongoose = require("mongoose");

const nursingVisitSchema = mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["FoleyCathChange", "INFUSION_THERAPY", "LVNHourly", "LVNVisit", "Midday_Insulin_Administration", "PRN_Nursing_Visit", "PTWithINR", "RNVisit", "SkilledNurseVisit", "SN_BMP", "SN_CBC", "SN_Diabetic_Daily", "SN_IV_Insertion", "SN_B12INJECTION", "SN_Haldol_Inj", "SN_Insulin_AM", "SN_Insulin_HS", "SN_Insulin_PM", "SN_Labs", "SN_WoundCare_Visit"],
      required: true,
    },
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
      start: { type: Date },
      end: { type: Date },
    },
    primaryDiagnosis: { type: String },
    secondaryDiagnosis: { type: String },
    vitalSigns: {
      neurological: {
        orientedTo: {
          person: { type: Boolean, default: false },
          place: { type: Boolean, default: false },
          time: { type: Boolean, default: false },
        },
        abnormalities: {
          noProblemsIdentified: { type: Boolean, default: false },
          abnormalBehavior: { type: Boolean, default: false },
          abnormalPupilsVision: { type: Boolean, default: false },
          aphasia: { type: Boolean, default: false },
          dizziness: { type: Boolean, default: false },
          forgetful: { type: Boolean, default: false },
          lossOfSensation: { type: Boolean, default: false },
          headache: { type: Boolean, default: false },
          hearingImpaired: { type: Boolean, default: false },
          lethargic: { type: Boolean, default: false },
          neuromuscularWeaknessLoss: { type: Boolean, default: false },
          rigidity: { type: Boolean, default: false },
          seizurePrecautions: { type: Boolean, default: false },
          slurredSpeech: { type: Boolean, default: false },
          spasticity: { type: Boolean, default: false },
          tremors: { type: Boolean, default: false },
        },
      },
      respiratory: {
        noProblemsIdentified: { type: Boolean, default: false },
        abnormalBreathSounds: { type: Boolean, default: false },
        accessoryMusclesUsed: { type: Boolean, default: false },
        coughNonproductive: { type: Boolean, default: false },
        coughProductive: { type: Boolean, default: false },
        cpapBipap: { type: Boolean, default: false },
        dyspnea: { type: Boolean, default: false },
        nebulizer: { type: Boolean, default: false },
        orthopnea: { type: Boolean, default: false },
        oxygenUseIntermittent: { type: Boolean, default: false },
        oxygenUseContinuous: { type: Boolean, default: false },
        o2PrecautionsNotDemonstrated: { type: Boolean, default: false },
        paroxysmalNocturnalDyspneaPND: { type: Boolean, default: false },
        tachypnea: { type: Boolean, default: false },
        tracheostomy: { type: Boolean, default: false },
      },
      cardiovascular:  {
        noProblemsIdentified: { type: Boolean, default: false },
        abnormalHeartRhythm: { type: Boolean, default: false },
        abnormalHeartSounds: { type: Boolean, default: false },
        abnormalLowerExtremityAppearance: { type: Boolean, default: false },
        abnormalLowerExtremitySensation: { type: Boolean, default: false },
        abnormalPulses: { type: Boolean, default: false },
        activityIntolerance: { type: Boolean, default: false },
        capillaryRefillGreaterThan3Sec: { type: Boolean, default: false },
        chestPain: { type: Boolean, default: false },
        distendedNeckVeins: { type: Boolean, default: false },
        dizzinessLightHeadedness: { type: Boolean, default: false },
        edemaNonPitting: { type: Boolean, default: false },
        edemaPitting: { type: Boolean, default: false },
        fatigueWeakness: { type: Boolean, default: false },
        orthopnea: { type: Boolean, default: false },
        orthostaticHypotension: { type: Boolean, default: false },
        palpitations: { type: Boolean, default: false },
        paroxysmalNocturnalDyspneaPND: { type: Boolean, default: false },
      },
      gastrointestinal: {
        lastBM: { type: String, default: "Invalid Date" },
        noProblemsIdentified: { type: Boolean, default: false },
        abnormalBowelSounds: { type: Boolean, default: false },
        abnormalStool: { type: [String], default: [] }, // Options like Hard, Distended, etc.
        ascites: { type: Boolean, default: false },
        bowelIncontinence: { type: Boolean, default: false },
        distended: { type: Boolean, default: false },
        hard: { type: Boolean, default: false },
        heartburnReflux: { type: Boolean, default: false },
        hemorrhoids: { type: Boolean, default: false },
        laxativeEnemaAbuse: { type: Boolean, default: false },
        laxativeEnemaUse: { type: Boolean, default: false },
        nausea: { type: Boolean, default: false },
        ostomy: { type: Boolean, default: false },
        pain: { type: Boolean, default: false },
        rectalBleeding: { type: Boolean, default: false },
        tenderness: { type: Boolean, default: false },
        vomiting: { type: Boolean, default: false },
      },
      genitourinary: {
        noProblemsIdentified: { type: Boolean, default: false },
        bladderDistention: { type: Boolean, default: false },
        abnormalControl: { type: Boolean, default: false },
        abnormalVolume: { type: Boolean, default: false },
        discharge: { type: Boolean, default: false },
        nocturia: { type: Boolean, default: false },
        abnormalUrineAppearance: { type: Boolean, default: false },
        dialysis: { type: Boolean, default: false },
        suprapubicCatheter: { type: Boolean, default: false },
        urostomy: { type: Boolean, default: false },
        indwellingFoleyCatheter: { type: Boolean, default: false },
        intermittentCatheterization: { type: Boolean, default: false },
        utiSignsSymptoms: { type: Boolean, default: false },
      },
      musculoskeletal: {
        noProblemsIdentified: { type: Boolean, default: false },
        amputation: { type: Boolean, default: false },
        aftercareHipReplacement: { type: Boolean, default: false },
        aftercareKneeReplacement: { type: Boolean, default: false },
        atrophy: { type: Boolean, default: false },
        contracture: { type: Boolean, default: false },
        fracture: { type: Boolean, default: false },
        highRiskForFalls: { type: Boolean, default: false },
        jointPain: { type: Boolean, default: false },
        jointStiffness: { type: Boolean, default: false },
        limitedROM: { type: Boolean, default: false },
        muscleWeakness: { type: Boolean, default: false },
        poorBalance: { type: Boolean, default: false },
        shufflingGait: { type: Boolean, default: false },
        unsteadyGait: { type: Boolean, default: false },
        weakHandGripStrength: { type: Boolean, default: false },
        weightBearingRestrictionFull: { type: Boolean, default: false },
        weightBearingRestrictionPartial: { type: Boolean, default: false },
        autoimmuneDiseasesAffectingFunction: { type: Boolean, default: false },
      },
      integumentary: {
        noProblemsIdentified: { type: Boolean, default: false },
        bruising: { type: Boolean, default: false },
        cool: { type: Boolean, default: false },
        cyanotic: { type: Boolean, default: false },
        dry: { type: Boolean, default: false },
        clammy: { type: Boolean, default: false },
        diaphoretic: { type: Boolean, default: false },
        flushed: { type: Boolean, default: false },
        incision: { type: Boolean, default: false },
        jaundice: { type: Boolean, default: false },
        pallor: { type: Boolean, default: false },
        poorTurgor: { type: Boolean, default: false },
        pruritus: { type: Boolean, default: false },
        rash: { type: Boolean, default: false },
        skinLesionRequiringIntervention: { type: Boolean, default: false },
        wounds: { type: Boolean, default: false },
        ivAccess: { type: Boolean, default: false },
      },
      painProfile: {
        description: { type: String },
        location: { type: String },
        intensity: { type: String },
        frequency: { type: String },
        duration: { type: String },
      },
      endocrineHematologic: {
        noProblemsIdentified: { type: Boolean, default: false },
        anemia: { type: Boolean, default: false },
        anticoagulantUse: { type: Boolean, default: false },
        cancer: { type: Boolean, default: false },
        hypothyroidism: { type: Boolean, default: false },
        hyperthyroidism: { type: Boolean, default: false },
      },
      nutrition: {
        noProblemsIdentified: { type: Boolean, default: false },
        difficultyChewing: { type: Boolean, default: false },
        dysphagia: { type: Boolean, default: false },
        illFittingDentures: { type: Boolean, default: false },
        anorexic: { type: Boolean, default: false },
        fairAppetite: { type: Boolean, default: false },
        poorAppetite: { type: Boolean, default: false },
        poorHydration: { type: Boolean, default: false },
        soreThroat: { type: Boolean, default: false },
        tubeFeedingPresent: { type: Boolean, default: false },
        tpnOrLipids: { type: Boolean, default: false },
        weightLoss: { type: Boolean, default: false },
        weightGain: { type: Boolean, default: false },
      }, labs: {
        na: { type: Boolean, default: false }, // N/A
        bloodTestObtained: { type: Boolean, default: false },
        urineSpecimenObtained: { type: Boolean, default: false },
        woundCultureObtained: { type: Boolean, default: false },
        other: { type: String },
      },
        // Infection Control
  infectionControl: {
    universalPrecautionsObserved: { type: Boolean, default: false },
    sharpsDisposedPerBiohazard: { type: Boolean, default: false },
    soiledWasteDisposedPerBiohazard: { type: Boolean, default: false },
    patientDemonstratesKnowledge: { type: Boolean, default: false },
    infectionControlSurveillance: {
      newInfectionSuspected: { type: Boolean, default: false },
      newInfectionDiagnosed: { type: Boolean, default: false },
    },
  },

  // Homebound Status
  homeboundStatus: {
    mobility: {
      ambulatory: { type: Boolean, default: false },
      ambulatoryWithDevice: { type: Boolean, default: false },
      bedfast: { type: Boolean, default: false },
      chairfast: { type: Boolean, default: false },
    },
    assistiveDevice: {
      cane: { type: Boolean, default: false },
      crutches: { type: Boolean, default: false },
      humanAssistance: { type: Boolean, default: false },
      specialTransportation: { type: Boolean, default: false },
      walker: { type: Boolean, default: false },
      wheelchair: { type: Boolean, default: false },
    },
    homeboundNarrative: { type: String },
  },
  planOfCare: {
    patientResponse: {
      willingAble: { type: Boolean, default: false },
      willingUnable: { type: Boolean, default: false },
      unwilling: { type: Boolean, default: false },
      barriersImpedingParticipation: { type: Boolean, default: false },
    },
    caregiverInvolvement: {
      noCaregiver: { type: Boolean, default: false },
      willingAble: { type: Boolean, default: false },
      willingUnable: { type: Boolean, default: false },
      unwilling: { type: Boolean, default: false },
      barriersImpedingParticipation: { type: Boolean, default: false },
    },
    caregiverAvailability: { type: Boolean, default: false },
    newChangedOrdersToPOCRequired: { type: Boolean, default: false },
    newChangedOrders: { type: String },
  },

  // Discharge Planning
  dischargePlanning: {
    na: { type: Boolean, default: false },
    discussedWithPatient: { type: Boolean, default: false },
    noticesProvided: {
      patientReceived: { type: Boolean, default: false },
      legalRepresentativeReceived: { type: Boolean, default: false },
      patientReceivedBeneficiaryNotice: { type: Boolean, default: false },
    },
  },

  // Care Coordination
  careCoordination: {
    coordinatedWith: { type: String },
    regarding: { type: String },
  },

  // Health Management
  healthManagement: {
    medicationsReconciled: { type: Boolean, default: false },
    newChangedMedicationsInHome: { type: Boolean, default: false },
    medicationIssuesIdentified: { type: Boolean, default: false },
    pillBoxPreFilled: { type: Boolean, default: false },
    insulinSyringesPreFilled: { type: Boolean, default: false },
    homeEnvironmentAltered: { type: Boolean, default: false },
    suspectedAbuse: { type: Boolean, default: false },
    barriersToHealthStatus: { type: Boolean, default: false },
    exhibitingSignsSymptomsOfHeartFailure: { type: Boolean, default: false },
    exhibitingSignsSymptomsOfOtherCoMorbidity: { type: Boolean, default: false },
  },

  // Plan of Care Review
  planOfCare: {
    patientResponse: {
      willingAble: { type: Boolean, default: false },
      willingUnable: { type: Boolean, default: false },
      unwilling: { type: Boolean, default: false },
      barriersImpedingParticipation: { type: Boolean, default: false },
    },
    caregiverInvolvement: {
      noCaregiver: { type: Boolean, default: false },
      willingAble: { type: Boolean, default: false },
      willingUnable: { type: Boolean, default: false },
      unwilling: { type: Boolean, default: false },
      barriersImpedingParticipation: { type: Boolean, default: false },
    },
    caregiverAvailability: { type: Boolean, default: false },
    newChangedOrdersToPOCRequired: { type: Boolean, default: false },
    newChangedOrders: { type: String },
  },

  // Discharge Planning
  dischargePlanning: {
    na: { type: Boolean, default: false },
    discussedWithPatient: { type: Boolean, default: false },
    noticesProvided: {
      patientReceived: { type: Boolean, default: false },
      legalRepresentativeReceived: { type: Boolean, default: false },
      patientReceivedBeneficiaryNotice: { type: Boolean, default: false },
    },
  },

  // Care Coordination
  careCoordination: {
    coordinatedWith: { type: String },
    regarding: { type: String },
  },
    },


    careCoordination: {
      coordinatedWith: { type: String },
      regarding: { type: String },
    },
    interventions: { type: String },
    responseToCare: { type: String },
    medicalNecessity: { type: String },
    visitNarrative: { type: String },
    clinicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const NursingVisit = mongoose.model("NursingVisitspecial", nursingVisitSchema);

module.exports = NursingVisit;
