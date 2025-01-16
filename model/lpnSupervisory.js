const mongoose = require("mongoose");

const lpnSupervisoryVisitSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    lpnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    associatedMileage: {
      type: Number,
    },
    annualOnsiteSupervisoryVisitDate: {
      type: Date,
    },
    evaluation: {
      openCommunication: { type: Boolean, default: false }, // Maintains open communication
      scheduledVisits: { type: Boolean, default: false }, // Arrives for assigned visits
      followsPlanOfCare: { type: Boolean, default: false },
      demonstratesCompetency: { type: Boolean, default: false },
      informsSupervisor: { type: Boolean, default: false }, // Informs supervisor of needs and changes
      infectionControlCompliance: { type: Boolean, default: false },
      honorsClientRights: { type: Boolean, default: false },
      changesToPlanOfCare: { type: Boolean, default: false },
      deficiencyIdentified: { type: Boolean, default: false }, // Deficiency in services identified
    },
    services: {
      insulinAdministration: { type: Boolean, default: false },
      woundCare: { type: Boolean, default: false },
      highRiskForReadmission: { type: Boolean, default: false },
    },
    additionalComments: {
      type: String,
    },
    signature: {
      type: String,
    },
    signatureDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const LPNSupervisoryVisit = mongoose.model("LPNSupervisoryVisit", lpnSupervisoryVisitSchema);

module.exports = LPNSupervisoryVisit;
