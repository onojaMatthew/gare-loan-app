const mongoose = require("mongoose");

const { Schema } = mongoose;

const attestationSchema = new Schema({
  signature: { type: String, required: [ true, "Your testation is required"]},
  date: { type: Date, default: Date.now() }
}, { timestamps: true });

const Attestation = mongoose.model("Attestation", attestationSchema);