const mongoose = require("mongoose");

const nutritionAssessmentSchema = new mongoose.Schema({
  nutritionAssessment: {
    noProblemsIdentified: { type: Boolean },
    difficultyChewing: { type: Boolean },
    edentulous: { type: Boolean },
    tubeFeedingPresent: { type: Boolean },
    anorexic: { type: Boolean },
    fairAppetite: { type: Boolean },
    poorAppetite: { type: Boolean },
    poorHydration: { type: Boolean },
    soreThroat: { type: Boolean },
    TPNorLipids: { type: Boolean },
    weightLoss: { type: Boolean },
    weightGain: { type: Boolean },
    comments: { type: String },
  },
  nutritionalHealthScreen: {
    questions: [
      {
        question: { type: String },
        answer: { type: Boolean },
      },
    ],
    totalScore: { type: Number },
    riskCategory: { type: String }, // e.g., "Good Nutritional Status", "Moderate Nutritional Risk", or "High Nutritional Risk"
  },
  nutritionalApproaches: {
    parenteralFeeding: { type: Boolean },
    mechanicallyAlteredDiet: { type: Boolean },
    therapeuticDiet: { type: Boolean },
    other: { type: Boolean },
    noneOfTheAbove: { type: Boolean },
    noInformationAvailable: { type: Boolean },
  },
  planOfCareNutritionalRequirements: {
    regular: { type: Boolean },
    mechanicalSoft: { type: Boolean },
    heartHealthy: { type: Boolean },
    lowCholesterol: { type: Boolean },
    lowFat: { type: Boolean },
    sodiumRestriction: { type: Boolean },
    noAddedSalt: { type: Boolean },
    calorieADA: { type: Boolean },
    noConcentratedSweets: { type: Boolean },
    consistentDiet: { type: Boolean },
    renalDiet: { type: Boolean },
    enteralNutrition: { type: Boolean },
    TPN: { type: Boolean },
    supplements: { type: Boolean },
    fluidRestriction: { type: Boolean },
    other: { type: String },
  },
  ordersForDisciplineAndTreatment: {
    alterationInNutrition: { type: Boolean },
  },
}, { timestamps: true });

const NutritionAssessment = mongoose.model(
  "NutritionAssessment",
  nutritionAssessmentSchema
);

module.exports = NutritionAssessment;
