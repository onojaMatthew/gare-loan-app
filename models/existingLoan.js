const mongoose = require("mongoose");

const existloanSchema = new mongoose.Schema({
  outstandingBalance: { type: Number, required: [ true, "Outstanding loan balance is required"], min: 0 },
  monthlyRepayment: { type: Number, required: [ true, "Loan monthly repayment is required"], min: 0 },
  institution: { type: String, required: [ true, "Loan institution name is required"], minlength: 3 }
}, { timestamps: true });

const ExistingLoan = mongoose.model("ExistingLoan", existloanSchema);


exports.ExistingLoan = ExistingLoan;