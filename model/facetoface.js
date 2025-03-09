const mongoose = require("mongoose");

const faceToFaceSchema = mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
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
      ref: "User",  // References the "User" model
      required: false,  // Optional, can be removed if you want it to be required
    },
    encounterDate: {
      type: Date,
      required: true,
    },
    certifyingPhysician: {
      isCertifying: { type: Boolean, default: false, default: true },
      name: { type: String }, // Optional if not the certifying physician
    },
    primaryReason: {
      type: String,
      required: true,
    },
    otherConditions: {
      type: String,
    },
    homeHealthServices: {
      skilledNursing: { type: Boolean, default: false, default: false },
      physicalTherapy: { type: Boolean, default: false, default: false },
      occupationalTherapy: { type: Boolean, default: false, default: false },
      speechTherapy: { type: Boolean, default: false, default: false },
      homeHealthAide: { type: Boolean, default: false, default: false },
      msw: { type: Boolean, default: false, default: false }, // Medical Social Worker
      other: { type: String },
    },
    soc: { type: Date }, // Start of care
    episode: {
      start: { type: Date },
      end: { type: Date },
    },
    physicianSignature: { type: String },
    signatureDate: { type: Date },
  },
  { timestamps: true }
);

const FaceToFace = mongoose.model("FaceToFace", faceToFaceSchema);

module.exports = FaceToFace;
