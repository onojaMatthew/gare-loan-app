const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const loanCategorySchema = new Schema({
  name: { type: String, required: true, unique: true },
  createdBy: { type: ObjectId, ref: "Admin" }
}, { timestamps: true });

const LoanCategory = mongoose.model("LoanCategory", loanCategorySchema);

exports.LoanCategory = LoanCategory;