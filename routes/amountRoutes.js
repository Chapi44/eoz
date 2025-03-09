const express = require('express');
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getAllTransactions,
  getTransactionAmounts
} = require('../controller/amountController'); // Adjust the path as per your file structure
const {
  authAuthorization,
  authMiddleware,
} = require("../middelware/authMiddleware");
// Create a new payment
router.post('/payments', authMiddleware,  createPayment);

// Get all payments
router.get('/payments', getAllPayments);

// Get a single payment by ID
router.get('/payments/:id', getPaymentById);

// Update a payment by ID
router.put('/payments/:id', authMiddleware, updatePayment);

// Delete a payment by ID
router.delete('/payments/:id', authMiddleware, deletePayment);


router.get("/transactions", getAllTransactions);
router.get("/transactions/data", getTransactionAmounts);



module.exports = router;
