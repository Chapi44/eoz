const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",
      required: true
    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    description: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "completed", "pastdue", "ongoing"],
      default: "pending"
    },
    comment: {
      type: String,
      default: ""
    },
    shift:{
      type: Boolean,
      default: false
    },
    personalNote: {
      type: String,
      default: ""
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    location: {
      type: [String], // Location as an array of strings, e.g., ["latitude", "longitude"]
      default: []
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
