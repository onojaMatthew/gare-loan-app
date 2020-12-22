const { Loan } = require("../models/loan");
const { User } = require("../models/user");
const { Approval } = require("../models/approval");

exports.loanRequest = async (req, res) => {
  try {
    let loan = new Loan();

    loan.amount = req.body.amount;
    loan.tenure = req.body.tenure;
    loan.purpose = req.body.purpose;
    loan.userId = req.body.userId;
    loan = await loan.save();

    if (!loan) return res.status(400).json({ status: "fail", error: "Request failed. Please try again" });
    const user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { loanId: loan._id }}, { new: true });
    if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
    return res.json({ status: "success", message: "Loan request request" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.getLoans = async (req, res) => {
  try {
    let loans = await Loan.find({}).populate("userId");
    if (!loans) return res.status(404).json({ status: "fail", message: "No records found" });
    return res.json(loans);
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.getLoan = async (req,res) => {
  try {
    let loan = await Loan.findById({ _id: req.body.loanId }).populate("userId");
    if (!loan) return res.status(404).json({ status: "fail", message: "Record not found" });
    return res.json({ status: "success", doc: loan });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}

exports.approveLoan = (req, res) => {
  Loan.findByIdAndUpdate({ _id: req.body.loanId })
    .then(loan => {
      if (!loan) return res.status(404).json({ status: "fail", message: "Record not found" });
      loan.status = "approved";
      return loan.save((err, doc) => {
        if (err || !doc) return res.status(400).json({ status: "fail", error: err.message });
        // Fire loan disbursement using Okra api here


        let approval = new Approval({
          approvedBy: req.body.approvedBy,
          dateApproved: new Date(),
          comment: req.body.comment,
          amountApproved: req.body.amountApproved,
          loanId: loan._id,
          disbursementStatus: "condition" ? true : false
        });

        return approval.save((err, doc) => {
          if (err || !doc) return res.status(400).json({ status: "fail", error: err.message });
          return res.json({ status: "success", message: "Loan approved" });
        });
      })
    })
    .catch(err => {
      return res.statu(400).json({ status: "fail", error: `Internal server error ${err.message}`});
    });
}