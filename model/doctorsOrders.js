const mongoose = require("mongoose");

const healthMetricsSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  visitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NurseVisit", // Could also reference other visit types (HHA, PT, etc.)
  },
  painLevel: {
    type: Number,  // Scale of 1-10
    min: 0,
    max: 10,
  },
  bloodSugar: {
    type: Number,  // Blood sugar readings if relevant
  },
  functionalStatus: {
    type: String, // Updated functional status based on the visit
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

const HealthMetrics = mongoose.model("HealthMetrics", healthMetricsSchema);

module.exports = HealthMetrics;
