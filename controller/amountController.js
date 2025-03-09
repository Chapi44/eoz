const Payment = require('../model/amount'); // Assuming your schema is saved as payment.js
const { StatusCodes } = require('http-status-codes');

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { title, amount, amountType, description, videoLink } = req.body;

    if (!title || !amount || !amountType) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Title, amount, and amountType are required",
      });
    }

    const newPayment = new Payment({
      title,
      amount,
      amountType,
      description,
      videoLink,
    });

    const savedPayment = await newPayment.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Payment created successfully",
      data: savedPayment,
    });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Get all payments with optional filter by amountType
const getAllPayments = async (req, res) => {
  try {
    const { amountType } = req.query;
    let query = {};

    if (amountType) {
      query.amountType = amountType;
    }

    // Retrieve all payment records, sorted by 'createdAt' in descending order
    const payments = await Payment.find(query).sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// Get a single payment by ID
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error('Error fetching payment by ID:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};

// Update a payment by ID
const updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, amountType, description, videoLink } = req.body;

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { title, amount, amountType, description, videoLink },
      { new: true, runValidators: true }
    );

    if (!updatedPayment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Payment updated successfully",
      data: updatedPayment,
    });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete a payment by ID
const deletePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPayment = await Payment.findByIdAndDelete(id);

    if (!deletedPayment) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Payment not found',
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: 'Payment deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Server Error',
      message: error.message,
    });
  }
};



const TransactionHistory = require("../model/transactionHistory");



const getTransactionAmounts  = async (req, res) => {
  try {
    // Aggregate totals for all transactions
    const [totals] = await TransactionHistory.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalCommission: { $sum: "$commissionFee" },
        },
      },
    ]);

    // Aggregate totals grouped by transaction type
    const amountsByType = await TransactionHistory.aggregate([
      {
        $group: {
          _id: "$txnType",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Map grouped totals to specific types
    const amounts = {
      totalAmount: totals?.totalAmount || 0,
      totalCommission: totals?.totalCommission || 0,
      totalAmountUserRegistration: 0,
      totalAmountDonation: 0,
      totalAmountSponsors: 0,
      totalAmountOrders: 0,
    };

    amountsByType.forEach((type) => {
      switch (type._id) {
        case "user_registration":
          amounts.totalAmountUserRegistration = type.totalAmount;
          break;
        case "donation":
          amounts.totalAmountDonation = type.totalAmount;
          break;
        case "sponsor":
          amounts.totalAmountSponsors = type.totalAmount;
          break;
        case "order":
          amounts.totalAmountOrders = type.totalAmount;
          break;
        default:
          break;
      }
    });

    // Return the response
    return res.status(200).json(amounts);
  } catch (error) {
    console.error("Error calculating transaction amounts:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, limit = 10, txnType } = req.query;

    // Pagination parameters
    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    // Build the query object
    const query = {};
    if (txnType) {
      query.txnType = txnType;
    }

    // Fetch filtered and paginated transactions
    const transactions = await TransactionHistory.find(query)
      .sort({ createdAt: -1 }) // Sort by createdAt descending
      .skip((pageNumber - 1) * pageSize) // Pagination: Skip records
      .limit(pageSize) // Pagination: Limit records
      .populate({
        path: "userId", // Populate the userId field
        select: "username pictures", // Select only the username and pictures fields from the User schema
      });
      

    // Calculate total count
    const totalCount = await TransactionHistory.countDocuments(query);

    // Calculate overall totals (total amount and total commission)
    const overallTotals = await TransactionHistory.aggregate([
      { $match: query }, // Filter by query (txnType if provided)
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          totalCommission: { $sum: "$commissionFee" },
        },
      },
    ]);

    const totalAmount = overallTotals.length > 0 ? overallTotals[0].totalAmount : 0;
    const totalCommission = overallTotals.length > 0 ? overallTotals[0].totalCommission : 0;

    // Calculate amounts grouped by transaction type
    const amountsByType = await TransactionHistory.aggregate([
      { $match: query }, // Filter by query (txnType if provided)
      {
        $group: {
          _id: "$txnType", // Group by txnType
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    // Format grouped totals into an object
    const amountsByTxnType = {};
    amountsByType.forEach((type) => {
      amountsByTxnType[type._id] = type.totalAmount;
    });

    // Prepare the response
    const response = {
      totalCount,
      transactions,
      totalAmount,
      totalCommission,
      amountsByTxnType, // Object with txnType-specific totals
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  getAllTransactions,
  getTransactionAmounts
};
