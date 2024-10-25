const mongoose = require("mongoose");

const nurseVisitSchema = new mongoose.Schema({
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
  visitType: {
    type: String,
    enum: ["Routine", "IV Therapy", "Pediatric Shift", "Lab Draw", "Shift", "Supervision"],
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
  servicesProvided: {
    type: [String],  // Example: ['IV Therapy', 'Wound Care', 'Vital Signs']
  },
  notes: {
    type: String,
  },
  followUp: {
    type: String,  // Any follow-up actions or next visit details
  },
  location: {
    type: [String], // GPS coordinates or address
  },
}, { timestamps: true });

const NurseVisit = mongoose.model("NurseVisit", nurseVisitSchema);

module.exports = NurseVisit;
