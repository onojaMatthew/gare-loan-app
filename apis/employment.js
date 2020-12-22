const express = require("express");
const { createEmploymentData } = require("../controller/employment");
const { validateEmployment } = require("../validation/employment_validation");

const router = express.Router();

router.post("/employment/create", validateEmployment, createEmploymentData);

module.exports = router;