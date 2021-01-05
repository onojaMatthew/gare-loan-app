const {check, validationResult } = require("express-validator");

exports.emailVerificationValidator = [
  check("email_verification_token").isEmpty().withMessage("Verification token is required"),
  check("email_verification_token").isString().withMessage("Please provide a valid email verification token"),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({error: errors.array()})
    } else {
      next();
    }
  }
]