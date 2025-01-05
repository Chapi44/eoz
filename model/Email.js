// models/Email.js
const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    file: {
      type: String, // URL or file path
    },
    recipient: {
      type: String,
      required: true, // Email address of the recipient
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Email", EmailSchema);
