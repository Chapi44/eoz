const mongoose = require("mongoose");

const planOfCareSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  careManagerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Admin or care manager who creates the plan
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date, // Optional if care is ongoing
  },
  goals: [
    {
      description: { type: String, required: true }, // Specific goal
      status: { type: String, enum: ["pending", "in-progress", "achieved"], default: "pending" },
      targetDate: { type: Date }, // Expected achievement date
    },
  ],
  interventions: [
    {
      visitType: {
        type: String,
        enum: ["Nursing", "Physical Therapy", "Occupational Therapy", "Speech Therapy", "Home Health Aide", "MSW"],
        required: true,
      },
      frequency: { type: String, required: true }, // Example: "3 times per week"
      tasks: [{ type: String }], // List of tasks for each visit
      assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned care provider
    },
  ],
  healthMetrics: {
    painLevel: { type: Number, min: 0, max: 10 }, // Target pain level
    bloodPressure: { systolic: Number, diastolic: Number }, // Blood pressure goal
    bloodSugar: { type: Number }, // Blood sugar target
    mobilityStatus: { type: String }, // E.g., "Independent", "With Assistance"
  },
  followUpSchedule: [
    {
      date: { type: Date },
      notes: { type: String },
    },
  ],
  dischargePlan: {
    expectedDischargeDate: { type: Date },
    criteria: { type: String }, // Criteria for discharge
    postDischargeInstructions: { type: String },
  },
  notes: { type: String }, // Additional notes
}, { timestamps: true });

const PlanOfCare = mongoose.model("PlanOfCare", planOfCareSchema);

module.exports = PlanOfCare;
