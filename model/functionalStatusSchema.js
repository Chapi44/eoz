const mongoose = require("mongoose");

const functionalStatusSchema = new mongoose.Schema({
  musculoskeletalAssessment: {
    issues: { type: String }, // E.g., "No problems identified, Poor balance, Atrophy"
    comments: { type: String }, // Free-text for additional comments
  },
  fallRiskAssessment: {
    riskFactors: { type: String }, // E.g., "Diagnosis of M or N conditions, History of falls"
    riskScore: { type: String }, // E.g., "Low Risk, Medium Risk"
  },
  grooming: {
    ability: { type: String }, // E.g., "Able to groom self independently, Requires assistance"
    comments: { type: String }, // Free-text for additional grooming-related comments
  },
  dressingAbility: {
    upperBody: { type: String }, // E.g., "Able to dress upper body independently"
    lowerBody: { type: String }, // E.g., "Needs assistance for dressing lower body"
    comments: { type: String }, // Free-text for additional dressing-related comments
  },
  bathingToileting: {
    bathingAbility: { type: String }, // E.g., "Independent, Requires assistance"
    toiletingAbility: { type: String }, // E.g., "Independent, Requires help"
    comments: { type: String }, // Free-text for additional bathing/toileting comments
  },
  transferring: {
    ability: { type: String }, // E.g., "Independent, Requires assistance"
    comments: { type: String }, // Free-text for transferring comments
  },
  ambulationLocomotion: {
    ability: { type: String }, // E.g., "Ambulates independently, Requires supervision"
    comments: { type: String }, // Free-text for ambulation/locomotion comments
  },
  feedingEating: {
    ability: { type: String }, // E.g., "Able to feed self independently, Requires help"
    comments: { type: String }, // Free-text for feeding/eating-related comments
  },
  planOfCare: {
    functionalLimitations: { 
      limitations: { type: String }, // E.g., "Ambulation, Dyspnea with minimal exertion"
      other: { type: String }, // Free-text for other limitations not listed
    },
    activitiesPermittedRestricted: {
      permittedRestricted: { type: String }, // E.g., "No restrictions, Bedrest required"
      other: { type: String }, // Free-text for additional permitted/restricted activities
    },
  },
  ordersForDisciplineAndTreatment: {
    problemStatement: { 
      musculoskeletalIssues: { type: Boolean }, // "Alteration in Musculoskeletal Status"
      fallPreventionPlan: { type: Boolean }, // "Need for Fall Prevention Plan"
    },
  },
}, { timestamps: true });

const FunctionalStatus = mongoose.model("FunctionalStatus", functionalStatusSchema);

module.exports = FunctionalStatus;
