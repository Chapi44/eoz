const mongoose = require("mongoose");

const aideCarePlanSchema = new mongoose.Schema({
  aideTaskAssignment: {
    type: String, // This will store any special instructions or tasks assigned
    maxlength: 5000, // Assuming it matches the comment field limits
  },
  problemStatements: {
    hhaNeedForHomeHealthAide: { type: Boolean, default: false }, // Checkbox for HHA need
    needForOtherAideServices: { type: Boolean, default: false }, // Checkbox for Medicaid-related need
  },
  trainingAndEducationResources: {
    physicalAssessment: { type: Boolean, default: false }, // Whether this resource is used
    fifteenMinuteWalk: { type: Boolean, default: false }, // OASIS 15-minute Walk
    woundManager: { type: Boolean, default: false }, // How to Use the Wound Manager
  },
});

module.exports = mongoose.model("AideCarePlan", aideCarePlanSchema);
