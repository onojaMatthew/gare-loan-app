const { Employment } = require("../models/employment");
const { User } = require("../models/user");

exports.createEmploymentData = async (req, res) => {

  try {
    let employment = new Employment();
    employment.employmentType = req.body.employmentType;
    employment.jopPosition = req.body.jopPosition;
    employment.netMonthlyPay = req.body.netMonthlyPay;
    employment.officeAddress = req.body.officeAddress;
    employment.officePhone = req.body.officePhone;
    employment.officialEmail = req.body.officialEmail;
    employment.previousEmployer = req.body.previousEmployer;
    employment.salaryPayDay = req.body.salaryPayDay;
    employment.userId = req.body.userId;
    employment.department = req.body.department;
    employment.HREmail = req.body.HREmail;
    employment.HRName = req.body.HRName;
    employment.HRPhone = req.body.HRPhone;
    employment.dateEmployed = req.body.dateEmployed;

    employment = await employment.save();

    if (!employment) return res.status(400).json({ error: "Something went wrong. Please try again" });
    let user = await User.findByIdAndUpdate({ _id: req.body.userId }, { $set: { employmentId: employment._id }}, { new: true });
    if (!user) return res.status(404).json({ status: "fail", error: "User not found" });
    return res.json({ status: "success", message: "User employment information updated" });
  } catch (error) {
    return res.status(400).json({ status: "fail", error: error.message });
  }
}