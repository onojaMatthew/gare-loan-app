const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { verifyPhoneNumber } = require("nigerian-phone-number-validator");
const { mailer } = require("../services/mailer");

exports.createUser = async (req, res) => {
  // console.log(result, " the phone validation result")
  if (!verifyPhoneNumber(req.body.phoneNumber)) return res.status(400).json({ error: "Invalid phone number" });
  try {
    const isUserExists = await User.findOne({ email: req.body.email });
    if (isUserExists) return res.status(400).json({ error: `A user with the ${req.body.email} already exists` });
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      how_you_hear_about_us: req.body.how_you_hear_about_us
      // bvn: req.body.bvn,
      // "address.city": req.body.city,
      // "address.state": req.body.state,
      // "address.street": req.body.street,
      // gender: req.body.gender,
      // meansOfIdentification: req.body.meansOfIdentification,
      // identityNumber: req.body.identityNumber,
      // dateOfBirth: req.body.dateOfBirth,
      // maritalStatus: req.body.maritalStatus
    });

    user = await user.save();

    if (!user) return res.status(400).json({ error: "Failed to register user. Please try again" });
    return exports.sendToken(req, res, user.email);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

exports.sendToken = async (req, res, email) => {
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: `User with the email ${email} not found` });
    // generate email verification token with expiration time of 120 minutes
    const token = jwt.sign({ _id: user._id }, process.env.EMAIL_ACTIVATION_KEY, { expiresIn: "120m" });
    // create an email verification link with the token created above
    const link = `${process.env.CLIENT_URL}/verify_email/${token}`;
    user.email_verification_token = token;
    user = await user.save();

    const data = {
      from: "no-reply@gare.com",
      to: user.email,
      subject: "Email activation",
      text: "Gare Finance",
      html: `
        <h3>Hi ${user.firstName}</h3>
        <p>Please click on the following link ${link} to activate your email.</p>
      `
    }

    return mailer(data, res);
  } catch (error) {
    
  }
}

exports.verifyEmail = async (req, res) => {
  const { email_verification_token } = req.body;

  try {
    if (email_verification_token) {
      jwt.verify(email_verification_token, process.env.EMAIL_ACTIVATION_KEY, async (err, decodedData) => {
        if (!decodedData) return res.status(401).json({ error: "Invalid verification token or token has expired" });
  
        let user = await User.findOne({  email_verification_token });
        
        if (!user) return res.status(404).json({ error: "User with the token does not exist" });
        user.email_verified = true;
        user.email_verification_token = null;
        user = await user.save();
        if (!user) return res.status(400).json({ error: "Internal server error"});
  
        return res.status({ message: "Email successfully verified" });
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
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
    user = await User.findById({ _id: userId }).populate("employmentId").populate("bankId").populate("attestationId");
    if (!user) return res.status(404).json({ status: "fail", error: "Not found" });
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ error: err.message });
  }
}

exports.deleteUser = async (req, res) => {
  const { userId } = req.body;

  if (!mongoose.isValidObjectId(userId)) return res.status(400).json({ error: "Invalid user ID" });

  User.findByIdAndDelete({ userId }, (err, doc) => {
    if (err || !doc) return res.status(400).json({ error: `User not found` });
    return res.json({ status: "success", message: "User account deleted" });
  });
}