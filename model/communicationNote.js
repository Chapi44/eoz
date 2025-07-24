const mongoose = require("mongoose");

const communicationNoteSchema = mongoose.Schema(
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
   adminId: {
              type: mongoose.Schema.Types.ObjectId, 
              ref: "User", // References another user (admin)
              required: false, // Optional, remove if you want it to be required
            },
    date: { type: Date, required: true }, // Date of the communication note
    clinicianSignature: { type: String }, // Signature of the clinician
    additionalDetails: {
      type: String, // Optional field for extra notes
    },
  },
  { timestamps: true }
);

const CommunicationNote = mongoose.model("CommunicationNote", communicationNoteSchema);

module.exports = CommunicationNote;
