const mongoose = require("mongoose");

const functionalAbilitiesGoalsSchema = new mongoose.Schema({
  priorFunctioningEverydayActivities: {
    selfCare: { type: String }, // Independent, Needed Some Help, Dependent, etc.
    indoorMobility: { type: String }, // Independent, Needed Some Help, Dependent, etc.
    stairs: { type: String }, // Independent, Needed Some Help, Dependent, etc.
    functionalCognition: { type: String }, // Independent, Needed Some Help, Dependent, etc.
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
    Puttingontakingofffootwear:{
        socRocPerformance: { type: String },
        dischargeGoal: { type: String },
    }
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

const FunctionalAbilitiesGoals = mongoose.model("FunctionalAbilitiesGoals", functionalAbilitiesGoalsSchema);

module.exports = FunctionalAbilitiesGoals;
