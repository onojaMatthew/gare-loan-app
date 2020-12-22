const { Bank } = require("../models/bank");
const { User } = require("../models/user");

exports.createBank = async (req, res) => {
  try {
    let bank = new Bank();

    bank.accountName = req.body.accountName;
    bank.name = req.body.name;
    bank.accountNumber = req.body.accountNumber;
    bank.code = req.body.code;
    bank.accountType = req.body.accountType;

    bank = await Bank.save();
    if (!bank) return res.status(400).json({ status: "fail", error: "Request failed. Please try again after some time" });
    let user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { bankId: bank._id }}, { new: true });
    if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
    return res.json({ status: "success", message: "Bank information updated" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}