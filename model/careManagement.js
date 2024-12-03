const mongoose = require("mongoose");

const careManagementSchema = new mongoose.Schema({
  oasisAssessmentId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to OASISAssessment
    ref: "OASISAssessment",
    required: true,
  },
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
}, { timestamps: true });

const CareManagement = mongoose.model("CareManagement", careManagementSchema);

module.exports = CareManagement;
