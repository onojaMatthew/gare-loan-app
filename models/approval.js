const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const approvalSchema = new Schema({
  approvedBy: { type: String, required: [ true, "Who is approving this loan" ]},
  dateApproved: { type: Date, required: [ true, "Approve date is required" ]},
  comment: { type: String, required: [ true, "Please send a comment along" ]},
  amountApproved: { type: Number, required: [ true, "How much loan are you approving" ]},
  loanId: { type: ObjectId, ref: "Loan", required: [ true, "Loan ID is required" ]},
  disbursementStatus: { type: Boolean, default: false },
}, { timestamps: true });

const Approval = mongoose.model("Approval", approvalSchema);

exports.Approval = Approval;