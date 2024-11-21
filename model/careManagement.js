const mongoose = require("mongoose");

const careManagementSchema = new mongoose.Schema({
  typesAndSourcesOfAssistance: {
    supervisionAndSafety: {
      type: String, // E.g., "No assistance needed", "Non-agency caregiver(s) currently provide assistance", etc.
    },
  },
  comments: { type: String }, // Text field for additional comments (up to 5000 characters).
  ordersForDisciplineAndTreatment: {
    needForProcessMeasures: { type: Boolean }, // Boolean to indicate whether process measures are required.
  },
  trainingAndEducationResources: {
    physicalAssessment: { type: Boolean }, // Boolean to indicate the use of physical assessment training resources.
    fifteenMinuteWalk: { type: Boolean }, // Boolean to indicate the use of 15-minute walk resources.
    woundManager: { type: Boolean }, // Boolean to indicate the use of wound manager training resources.
  },
}, { timestamps: true });

const CareManagement = mongoose.model("CareManagement", careManagementSchema);

module.exports = CareManagement;
