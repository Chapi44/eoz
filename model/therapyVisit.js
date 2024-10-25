const mongoose = require("mongoose");

const therapyVisitSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  therapyType: {
    type: String,
    enum: ["PT", "OT", "ST"],
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  functionalAssessment: {
    type: String, // e.g., Mobility, Cognitive improvement for OT, Speech clarity for ST
  },
  tasksPerformed: {
    type: [String],  // Specific tasks performed in this session
  },
  reassessment: {
    type: Boolean,
    default: false,
  },
  dischargePlan: {
    type: Boolean,
    default: false, // Flag for indicating discharge
  },
  followUp: {
    type: String,  // Follow-up actions
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

const TherapyVisit = mongoose.model("TherapyVisit", therapyVisitSchema);

module.exports = TherapyVisit;
