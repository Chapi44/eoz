const mongoose = require('mongoose');

// Define the schema with title and amount fields
const PaymentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, // Automatically removes leading/trailing whitespaces
    minlength: 3, // Minimum length for the title
    maxlength: 100, // Maximum length for the title
  },
  amountType: {
    type: String,
    enum: ['subscription', 'sponsorship', 'product_purchase', 'order', 'user_registration'],
  },
  description: {
    type: String,
    maxlength: 200, // Maximum length for the description
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensures the amount is a non-negative number
  },
  videoLink: {
    type: String,
    required: false, // Optional field for a video URL
    trim: true,
  }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt timestamps

// Export the schema as a model
module.exports = mongoose.model('Payment', PaymentSchema);
