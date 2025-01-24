const mongoose = require("mongoose");

const nutritionAssessmentSchema = new mongoose.Schema({
  nutritionAssessment: {
    noProblemsIdentified: { type: Boolean, default: false },
    difficultyChewing: { type: Boolean, default: false },
    edentulous: { type: Boolean, default: false },
    tubeFeedingPresent: { type: Boolean, default: false },
    anorexic: { type: Boolean, default: false },
    fairAppetite: { type: Boolean, default: false },
    poorAppetite: { type: Boolean, default: false },
    poorHydration: { type: Boolean, default: false },
    soreThroat: { type: Boolean, default: false },
    TPNorLipids: { type: Boolean, default: false },
    weightLoss: { type: Boolean, default: false },
    weightGain: { type: Boolean, default: false },
    comments: { type: String },
  },
  nutritionalHealthScreen: {
    questions: [
      {
        question: { type: String },
        answer: { type: Boolean, default: false },
      },
    ],
    totalScore: { type: Number },
    riskCategory: { type: String }, // e.g., "Good Nutritional Status", "Moderate Nutritional Risk", or "High Nutritional Risk"
  },
  nutritionalApproaches: {
    parenteralFeeding: { type: Boolean, default: false },
    mechanicallyAlteredDiet: { type: Boolean, default: false },
    therapeuticDiet: { type: Boolean, default: false },
    other: { type: Boolean, default: false },
    noneOfTheAbove: { type: Boolean, default: false },
    noInformationAvailable: { type: Boolean, default: false },
  },
  planOfCareNutritionalRequirements: {
    regular: { type: Boolean, default: false },
    mechanicalSoft: { type: Boolean, default: false },
    heartHealthy: { type: Boolean, default: false },
    lowCholesterol: { type: Boolean, default: false },
    lowFat: { type: Boolean, default: false },
    sodiumRestriction: { type: Boolean, default: false },
    noAddedSalt: { type: Boolean, default: false },
    calorieADA: { type: Boolean, default: false },
    noConcentratedSweets: { type: Boolean, default: false },
    consistentDiet: { type: Boolean, default: false },
    renalDiet: { type: Boolean, default: false },
    enteralNutrition: { type: Boolean, default: false },
    TPN: { type: Boolean, default: false },
    supplements: { type: Boolean, default: false },
    fluidRestriction: { type: Boolean, default: false },
    other: { type: String },
  },
  ordersForDisciplineAndTreatment: {
    alterationInNutrition: { type: Boolean, default: false },
  },
}, { timestamps: true });

const NutritionAssessment = mongoose.model(
  "NutritionAssessment",
  nutritionAssessmentSchema
);

module.exports = NutritionAssessment;
