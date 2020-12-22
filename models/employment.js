const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const employmentSchema = new Schema({
  employmentType: { type: String, required: [ true, "Your employment type is required" ], enum: [ "full time", "part time", "contract", "outsourced", "self employed"], default: "self employed" },
  currentEmployer: { type: String, default: "self" },
  officeAddress: { type: String },
  officePhone: { type: String },
  dateEmployed: { type: Date },
  officialEmail: { type: String },
  jopPosition: { type: String },
  department: { type: String },
  netMonthlyPay: { type: Number, required: [ true, "Your net monthly income is required" ]},
  salaryPayDay: { type: Number, required: [ true, "Please tell us salary pay day" ], min: 1, max: 31},
  previousEmployer: { type: String },
  HRName: { type: String },
  HREmail: { type: String },
  HRPhone: { type: String },
  userId: { type: ObjectId, ref: "User", required: true }
});

const Employment = mongoose.model("Employment", employmentSchema);

exports.Employment = Employment;