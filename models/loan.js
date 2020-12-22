const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const amountEnum = [ 3000, 10000, 20000, 30000, 50000, 75000, 100000, 150000, 200000, 300000, 500000, 1000000 ];
const loanSchema = new Schema({
  amount: { type: Number, min: 3000, max: 1000000, enum: amountEnum },
  purpose: { type: String, required: [ true, "Please tell us what the loan is for"]},
  tenure: { type: String, required: [ true, "Tenure of the loan is required"]},
  userId: { type: ObjectId, ref: "User", required: [ true, "User ID is required" ]},
  status: { type: Boolean, default: "pending" }
}, { timestamps: true });

const Loan = mongoose.model("Loan", loanSchema);

exports.Loan = Loan;