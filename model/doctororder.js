// const mongoose = require("mongoose");

// const doctorOrderSchema = mongoose.Schema(
//   {
//     patientId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Patients",
//       required: true,
//     },
//     physicianId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//        adminId: {
//                   type: mongoose.Schema.Types.ObjectId, 
//                   ref: "User", // References another user (admin)
//                   required: false, // Optional, remove if you want it to be required
//                 },
//     orderNumber: { type: String, required: true },
//     orderDate: { type: Date, required: true },
//     effectiveDate: { type: Date, required: true },
//     time: { type: String }, // Optional time field (e.g., "2:10 PM")
//     summary: { type: String }, // Brief description of the order
//     episodeAssociated: {
//       start: { type: Date },
//       end: { type: Date },
//     },
//     allergies: {
//       type: String,
//       default: "NKA (Food/Drugs/Latex/Environment)", // Default to "No Known Allergies"
//     },
//     readBackVerified: { type: Boolean, default: false, default: true },
//     clinicianSignature: { type: String }, // Signature of the clinician
//     clinicianSignatureDate: { type: Date },
//     physicianSignature: { type: String }, // Signature of the physician
//     physicianSignatureDate: { type: Date },
//   },
//   { timestamps: true }
// );

// const DoctorOrder = mongoose.model("DoctorOrder", doctorOrderSchema);

// module.exports = DoctorOrder;


const mongoose = require("mongoose");

const doctorOrderSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    // Attending Physician (main physician responsible for the order)
    attendingPhysician: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Physician User reference
      required: true,
    },
    // Send To (can be multiple physicians to send the order to)
    sendTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    // Optional: Copy To (optional list of users to copy the order)
    copyTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ],
    // Administrative User for audit, if needed
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    // Episode date range (start and end)
    episodeAssociated: {
      start: { type: Date },
      end: { type: Date },
    },
    // Order meta-data
    orderNumber: { type: String, required: true },
    orderDate: { type: Date, required: true },     // Date (e.g., "5/31/2025")
    time: { type: String },                        // Time (e.g., "2:20 PM")
    effectiveDate: { type: Date, required: true }, // Effective Date
    orderIsForNextEpisode: { type: Boolean, default: false }, // Checkbox
    summary: { type: String },                     // Summary/Title (free text)
    // Order Types (multi-select for UI tabs, e.g., Medication, POC, etc.)
    orderTypes: [{ type: String, enum: ["Medication Orders", "Plan of Care Orders", "Discipline Frequency", "Supply Manager", "Other"] }],
    // Frequency fields (supporting discipline-specific frequencies)
    frequencyFormat: [{ type: String }],           // List of frequency formats/tags
    frequencyStartDate: { type: Date },
    frequencyByDiscipline: {
      sn: { type: String },    // Skilled Nursing
      pt: { type: String },    // Physical Therapy
      ot: { type: String },    // Occupational Therapy
      st: { type: String },    // Speech Therapy
      hha: { type: String },   // Home Health Aide
      msw: { type: String },   // Medical Social Worker
    },
    additionalFrequencyAndDuration: { type: String },
    // Orders
    medicationOrder: { type: String },
    planOfCareOrder: { type: String },
    goals: { type: String },
    // Clinician/Physician sign-off and verification
    readBackVerified: { type: Boolean, default: false },
    clinicianSignature: { type: String },
    clinicianSignatureDate: { type: Date },
    physicianSignature: { type: String },
    physicianSignatureDate: { type: Date },
  },
  { timestamps: true }
);

const DoctorOrder = mongoose.model("DoctorOrder", doctorOrderSchema);

module.exports = DoctorOrder;
