const express = require("express");
const { createUser } = require("../controller/user");
const { validateUser } = require("../validation/user_validator");


const router = express.Router();

router.post("/create", createUser);

module.exports = router;