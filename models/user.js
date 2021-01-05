const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;


const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, minlength: 5, maxlength: 50, required: true, index: true },
  lastName: { type: String, minlength: 3, maxlength: 40, required: true },
  gender: { type: String, enum: [ "male", "female" ]},
  password: { type: String, required: true },
  maritalStatus: { type: String, enum: [ "single", "married", "devorced"]},
  dateOfBirth: { type: Date },
  phoneNumber: { type: String, required: [ true, "Your phone number is required" ]},
  address: {
    street: {type: String },
    city: { type: String },
    state: { type: String }
  },
  how_you_hear_about_us: { type: String },
  email_verified: { type: Boolean, default: false },
  email_verification_token: { type: String },
  password_reset_token: { type: String },
  bank: { type: ObjectId, ref: "Bank"},
  employmentId: { type: ObjectId, ref: "Employment" },
  loan: { type: ObjectId, ref: "Loan" },
  existingLoan: { type: ObjectId, ref: "ExistingLoan" },
  attestationId: { type: ObjectId, ref: "Attestation" },
  bvn: { type: Number, unique: true },
  meansOfIdentification: { type: String, enum: ["international passport", "driver's license", "voter's card", "national identity", "others"]},
  identityNumber: { type: Number, unique: true },
  creditScore: { type: Number },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

exports.User = User;