const mongoose = require("mongoose");
const { bankEnum } = require("../helper/enum")

const { Schema, ObjectId } = mongoose;

const nameEnum = [
  "Access Bank", "Citibank", 
  "Diamond Bank", 
  "Dynamic Standard Bank", 
  "Ecobank Nigeria", 
  "Fidelity Bank Nigeria",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank Plc",
  "Jaiz Bank",
  "Keystone Bank Limited",
  "Providus Bank Plc",
  "Polaris Bank",
  "Stanbic IBTC Bank Nigeria Limited",
  "Standard Chartered Bank",
  "Sterling Bank",
  "Suntrust Bank Nigeria Limited",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank Plc",
  "Wema Bank",
  "Zenith Bank",
];

const codeEnum = [
  "044", "023", "063", "050", "070", "011", "214", "058", "030", "301", "082", "101", "076", "221", "068", "232", "100", "032", "033", "215", "035", "057"
];

const bankSchema = new Schema({
  name: { type: String, required: [ true, "Bank name is required"], enum: nameEnum },
  accountNumber: { type: Number, required: [ true, "Account number is required"]},
  accountName: { type: String, required: [ true, "What is your account name"]},
  accountType: { type: String, required: [ true, "What is your account type"]},
  code: { type: Number, required: [ true, "Your bank code is required"], enum: codeEnum },
  userId: { type: ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Bank = mongoose.model("Bank", bankSchema);

exports.Bank = Bank;