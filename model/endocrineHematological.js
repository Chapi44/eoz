const mongoose = require("mongoose");

const endocrineHematologicalAssessmentSchema = new mongoose.Schema({
  assessment: {
    noProblemsIdentified: { type: Boolean },
    anemia: { type: Boolean },
    cancer: { type: Boolean },
    hypothyroidism: { type: Boolean },
    hyperthyroidism: { type: Boolean },
    diabetes: { type: Boolean },
  },
  comments: { type: String }, // Field to store additional comments
  ordersForDisciplineAndTreatment: {
    alterationInGlucoseMetabolism: { type: Boolean },
    alterationInHematologicalStatus: { type: Boolean },
  },
}, { timestamps: true });

const EndocrineHematologicalAssessment = mongoose.model(
  "EndocrineHematologicalAssessment",
  endocrineHematologicalAssessmentSchema
);

module.exports = EndocrineHematologicalAssessment;
