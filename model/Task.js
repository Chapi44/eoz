const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patients",

    },
    nurseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",

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
    nurseStatus: {
      type: String,
      enum: ["available", "full"],
      default: "available",
    },
    personalNote: {
      type: String,
      default: ""
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    nursesigniturepictures:{
      type: [String],
      default: [],
    },
    patientsigniturepictures:{
      type:[String],
       default:[]
      },
    location: {
      type: [String], // Location as an array of strings, e.g., ["latitude", "longitude"]
      default: []
    },
    price: {
      type: Number,  // Added price field
      default: 0     // Default value for the price
    }
  },
  {
    timestamps: true
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
