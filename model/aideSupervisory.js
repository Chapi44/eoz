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
    aidePresent: { type: Boolean, required: true }, // Whether the aide was present
    visitDate: { type: Date, required: true },
    associatedMileage: { type: Number },
    annualOnsiteSupervisoryVisitDate: { type: Date },
    evaluation: {
      openCommunication: { type: Boolean, required: true },
      arrivesAsScheduled: { type: Boolean, required: true },
      followsPlanOfCare: { type: Boolean, required: true },
      demonstratesCompetency: { type: Boolean, required: true },
      informsSupervisor: { type: Boolean, required: true },
      infectionControl: { type: Boolean, required: true },
      honorsClientRights: { type: Boolean, required: true },
      changesToPlanOfCare: { type: Boolean },
      deficienciesIdentified: { type: Boolean },
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
