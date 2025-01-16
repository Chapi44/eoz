const mongoose = require("mongoose");

const doctorOrderSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true,
    },
    physicianId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderNumber: { type: String, required: true },
    orderDate: { type: Date, required: true },
    effectiveDate: { type: Date, required: true },
    time: { type: String }, // Optional time field (e.g., "2:10 PM")
    summary: { type: String }, // Brief description of the order
    episodeAssociated: {
      start: { type: Date },
      end: { type: Date },
    },
    allergies: {
      type: String,
      default: "NKA (Food/Drugs/Latex/Environment)", // Default to "No Known Allergies"
    },
    readBackVerified: { type: Boolean, default: true },
    clinicianSignature: { type: String }, // Signature of the clinician
    clinicianSignatureDate: { type: Date },
    physicianSignature: { type: String }, // Signature of the physician
    physicianSignatureDate: { type: Date },
  },
  { timestamps: true }
);

const DoctorOrder = mongoose.model("DoctorOrder", doctorOrderSchema);

module.exports = DoctorOrder;
