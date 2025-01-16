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
    encounterDate: {
      type: Date,
      required: true,
    },
    certifyingPhysician: {
      isCertifying: { type: Boolean, default: true },
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
      skilledNursing: { type: Boolean, default: false },
      physicalTherapy: { type: Boolean, default: false },
      occupationalTherapy: { type: Boolean, default: false },
      speechTherapy: { type: Boolean, default: false },
      homeHealthAide: { type: Boolean, default: false },
      msw: { type: Boolean, default: false }, // Medical Social Worker
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
