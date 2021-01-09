const express = require("express");
const { 
  createUser, 
  getUsers, 
  getUser,
  deleteUser,
  verifyEmail,
  otherPersonalDetails
} = require("../controller/user");
const { emailVerificationValidator } = require("../validation/email_verification_validation");
const { otherDetailsValidator } = require("../validation/otherDetailValidation");
const { validateUser } = require("../validation/user_validator");


const router = express.Router();

router.post("/create", validateUser, createUser);
router.put("/user/verify_email", verifyEmail);
router.get("/users", getUsers);
router.put("/user/details", otherDetailsValidator, otherPersonalDetails)
router.put("/user", getUser);
router.put("/delete", deleteUser);

module.exports = router;