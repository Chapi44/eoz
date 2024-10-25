const mongoose = require("mongoose");

const hhaSupervisionSchema = new mongoose.Schema({
  hhaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  supervisingNurseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  supervisionDate: {
    type: Date,
    required: true,
  },
  notes: {
    type: String, // Notes about the supervision
  },
  followUpActions: {
    type: String, // Actions to take after supervision
  }
}, { timestamps: true });

const HHASupervision = mongoose.model("HHASupervision", hhaSupervisionSchema);

module.exports = HHASupervision;
