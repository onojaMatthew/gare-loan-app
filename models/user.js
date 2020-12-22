const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, minlength: 5, maxlength: 50, required: true, index: true },
  lastName: { type: String, minlength: 3, maxlength: 40, required: true },
  gender: { type: String, enum: [ "male", "female" ]},
  maritalStatus: { type: String, required: [ true, "What is your marital status" ], enum: [ "single", "married", "devorced"]},
  dateOfBirth: { type: Date, required: [ true, "What is your date of birth" ]},
  phoneNumber: { type: String, required: [ true, "Your phone number is required" ]},
  address: {
    street: {type: String, required: [ true, "Street name is required"]},
    city: { type: String, required: [ true, "City of residence is required" ]},
    state: { type: String, required: [ true, "State of residences is required" ]}
  },
  bankId: { type: ObjectId, ref: "Bank" },
  employmentId: { type: ObjectId, ref: "Employment" },
  loan: { type: ObjectId, ref: "Loan" },
  existingLoan: { type: ObjectId, ref: "ExistingLoan" },
  attestationId: { type: ObjectId, ref: "Attestation" },
  bvn: { type: Number, required: [ true, "Account BVN is required"], unique: true },
  meansOfIdentification: { type: String, required: true,
  enum: ["international passport", "driver's license", "voter's card", "national identity", "others"]},
  identityNumber: { type: Number, required: [ true, "Your identity number is required"], unique: true },
  creditScore: { type: Number },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

exports.User = User;