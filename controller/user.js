const { User } = require("../models/user");
const mongoose = require("mongoose");
const { verifyPhoneNumber, sanitizePhoneNumber } = require("nigerian-phone-number-validator");

exports.createUser = (req, res) => {
  const bvn = req.body.bvn;
  
  // console.log(result, " the phone validation result")
  if (!verifyPhoneNumber(req.body.phoneNumber)) return res.status(400).json({ error: "Invalid phone number" });
  
  if (typeof bvn !== "number" && bvn.length !== 11) return res.status(400).json({ error: "Invalid BVN" });
  // At this point validate bvn before saving the user

  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    bvn: req.body.bvn,
    "address.city": req.body.city,
    "address.state": req.body.state,
    "address.street": req.body.street,
    gender: req.body.gender,
    meansOfIdentification: req.body.meansOfIdentification,
    identityNumber: req.body.identityNumber,
    dateOfBirth: req.body.dateOfBirth,
    maritalStatus: req.body.maritalStatus
  });

  return user.save((err, doc) => {
    // console.log(doc);
    if (err || !doc) return res.status(400).json({ error: `Failed to process. ${err.message}`});
    
    return res.json({ status: "success", message: "Success", customerId: doc._id });
  });
}

// Fetch all users
exports.getUsers = async (req, res) => {
  let users;

   try {
     users = await User.find({}).populate("employmentId").populate("bankId").populate("attestationId")

     if (!users) return res.status(404).json({ status: "fail", error: "No records found" });
     return res.json(users);
   } catch (error) {
     return res.status(400).json({ status: "fail", error: error.message });
   }
}

exports.getUser = async (req, res) => {
  const { userId } = req.body;
  if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: "Invalid userId"});

  let user;
  try {
    user = await User.findById({ _id: userId });
  } catch (error) {
    return res.status(400).json({ error: err.message });
  }
}