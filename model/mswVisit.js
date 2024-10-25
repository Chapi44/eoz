const mongoose = require("mongoose");

const mswVisitSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  mswId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  visitNotes: {
    type: String, // Record of discussion and resources provided
  },
}, { timestamps: true });

const MSWVisit = mongoose.model("MSWVisit", mswVisitSchema);

module.exports = MSWVisit;