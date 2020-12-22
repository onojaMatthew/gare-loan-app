const express = require("express");
const { createEmploymentData } = require("../controller/employment");

const router = express.Router();

router.post("/create", createEmploymentData);