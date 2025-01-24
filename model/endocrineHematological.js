const mongoose = require("mongoose");

const endocrineHematologicalAssessmentSchema = new mongoose.Schema(
  {
    oasisAssessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OASISAssessment",
      required: true,
    },
    assessment: {
      noProblemsIdentified: { type: Boolean, default: false , default: false},
      anemia: { type: Boolean, default: false , default: false},
      cancer: { type: Boolean, default: false , default: false},
      hypothyroidism: { type: Boolean, default: false , default: false},
      hyperthyroidism: { type: Boolean, default: false, default: false },
      diabetes: { type: Boolean, default: false, default: false },
    },
    comments: { type: String }, // Field to store additional comments
    ordersForDisciplineAndTreatment: {
      alterationInGlucoseMetabolism: { type: Boolean, default: false , default: false},
      alterationInHematologicalStatus: { type: Boolean, default: false , default: false},
    },
  },
  { timestamps: true }
);

const EndocrineHematologicalAssessment = mongoose.model(
  "EndocrineHematologicalAssessment",
  endocrineHematologicalAssessmentSchema
);

module.exports = EndocrineHematologicalAssessment;
