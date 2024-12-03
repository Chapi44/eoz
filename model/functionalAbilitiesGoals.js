const mongoose = require("mongoose");

const functionalAbilitiesGoalsSchema = new mongoose.Schema({
  oasisAssessmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OASISAssessment",
    required: true, // Ensure every FunctionalAbilitiesGoals entry is linked to an OASIS Assessment
  },
  priorFunctioningEverydayActivities: {
    selfCare: { type: String },
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
    Puttingontakingofffootwear: {
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
  comments: { type: String },
}, { timestamps: true });

const FunctionalAbilitiesGoals = mongoose.model(
  "FunctionalAbilitiesGoals",
  functionalAbilitiesGoalsSchema
);

module.exports = FunctionalAbilitiesGoals;
