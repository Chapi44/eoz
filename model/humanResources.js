const mongoose = require("mongoose");

const humanResourcesSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Link to the employee in the User collection
    required: true,
  },
  hrId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Link to the employee in the User collection
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: ["Nursing", "Therapy", "Admin", "Finance", "HR", "IT"],
    required: true,
  },
  employmentStatus: {
    type: String,
    enum: ["Active", "On Leave", "Terminated"],
    default: "Active",
  },
  dateOfHire: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  performanceEvaluations: [{
    date: { type: Date },
    rating: { type: Number, min: 1, max: 5 },  // 1-5 scale rating for performance
    feedback: { type: String },
  }],
  leaveRecords: [{
    leaveType: {
      type: String,
      enum: ["Sick", "Vacation", "Personal", "Maternity", "Other"],
    },
    startDate: { type: Date },
    endDate: { type: Date },
  }],
  payrollDetails: {
    bankAccount: { type: String },  // Bank account for direct deposit
    salaryFrequency: { type: String, enum: ["Monthly", "Bi-Weekly", "Weekly"] },
    deductions: [{
      description: { type: String },  // Tax, benefits, etc.
      amount: { type: Number },
    }],
    netSalary: { type: Number },  // Final salary after deductions
  }
}, { timestamps: true });

const HumanResources = mongoose.model("HumanResources", humanResourcesSchema);

module.exports = HumanResources;
