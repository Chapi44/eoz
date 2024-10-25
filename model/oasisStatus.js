const mongoose = require("mongoose");

const oasisStatusSchema = new mongoose.Schema({
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
  assessmentType: {
    type: String,
    enum: ["Start of Care", "Reevaluation", "Transfer", "Discharge", "Resumption of Care"],
    required: true,
  },
  assessmentDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Transmitted"],
    default: "Pending",
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

const OASISStatus = mongoose.model("OASISStatus", oasisStatusSchema);

module.exports = OASISStatus;


// const mongoose = require("mongoose");

// const oasisStatusSchema = new mongoose.Schema({
//   patientId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Patients",
//     required: true,
//   },
//   nurseId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   assessmentType: {
//     type: String,
//     enum: ["Start of Care", "Resumption of Care", "Reevaluation", "Transfer", "Discharge"],
//     required: true,
//   },
//   assessmentDate: {
//     type: Date,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Completed", "Transmitted"],
//     default: "Pending",
//   },
//   transmissionDate: {
//     type: Date, // Date when OASIS assessment is transmitted to relevant authorities
//   },
//   notes: {
//     type: String, // Notes related to the assessment
//   }
// }, { timestamps: true });

// const OASISStatus = mongoose.model("OASISStatus", oasisStatusSchema);

// module.exports = OASISStatus;

