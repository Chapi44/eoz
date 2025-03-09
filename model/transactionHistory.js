const mongoose = require("mongoose");

const { Schema } = mongoose;

const transactionHistorySchema = new Schema(
  {
    txnId: {
      type: String,
      // required: true,
    },
    txnType: {
      type: String,
      enum: ["sponsor", "donation", "product_purchase", "order", "user_registration"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    amountId: { // New field for amountId
      type: mongoose.Types.ObjectId,
      ref: "Payment", // Reference to the Payment model
      required: true,
    },
    amount: {
      type: Number,
    },
    paymentGatewayFee: {
      type: Number,
    },
    commissionFee: {
      type: Number,
    },
    sellerAmount: {
      type: Number,
    },
    shippingFee: {
      type: Number,
    },
    txnMadeThrough: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      required: true,
    },
    phoneNumber: {  // Add the phone number field
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransactionHistory", transactionHistorySchema);
