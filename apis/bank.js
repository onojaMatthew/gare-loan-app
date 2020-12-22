const express = require("express");
const { createBank } = require("../controller/bank");
const { validateBank } = require("../validation/bank_validator");

const router = express.Router();

router.post("/bank/create", validateBank, createBank);

module.exports = router;