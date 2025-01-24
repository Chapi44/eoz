const mongoose = require("mongoose");

const aideSupervisoryVisitSchema = mongoose.Schema(
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
    homeHealthAide: { type: String, required: true }, // Name of the home health aide
    aidePresent: { type: Boolean, default: false, default: false }, // Whether the aide was present
    visitDate: { type: Date, required: true },
    associatedMileage: { type: Number },
    annualOnsiteSupervisoryVisitDate: { type: Date },
    evaluation: {
      openCommunication: { type: Boolean, default: false, default: false },
      arrivesAsScheduled: { type: Boolean, default: false, default: false },
      followsPlanOfCare: { type: Boolean, default: false, default: false },
      demonstratesCompetency: { type: Boolean, default: false, default: false },
      informsSupervisor: { type: Boolean, default: false, default: false },
      infectionControl: { type: Boolean, default: false, default: false },
      honorsClientRights: { type: Boolean, default: false, default: false },
      changesToPlanOfCare: { type: Boolean, default: false, default: false }, // Defaulting to false
      deficienciesIdentified: { type: Boolean, default: false, default: false }, // Defaulting to false
    },
    additionalComments: { type: String }, // Comments/Findings
    signature: { type: String }, // Signature of the supervisor
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const AideSupervisoryVisit = mongoose.model(
  "AideSupervisoryVisit",
  aideSupervisoryVisitSchema
);

module.exports = AideSupervisoryVisit;
