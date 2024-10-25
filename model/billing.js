const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service", // Reference to the service provided (e.g., nurse visit, therapy session)
    required: true,
  },
  serviceDescription: {
    type: String, // Short description of the service
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  insuranceDetails: {
    insuranceProvider: { type: String }, // Name of the insurance provider
    policyNumber: { type: String }, // Patient's insurance policy number
    coverageAmount: { type: Number }, // How much the insurance covers
    coPayAmount: { type: Number }, // Co-pay amount paid by the patient
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Denied", "Partially Paid"],
    default: "Pending",
  },
  paymentDate: {
    type: Date,
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "Cash", "Check", "Insurance"],
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Billing = mongoose.model("Billing", billingSchema);

module.exports = Billing;
