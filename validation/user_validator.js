const {check, validationResult} = require('express-validator');


exports.validateUser = [
  check('firstName').isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
  check("firstName").isAlpha().withMessage("Invalid name. First name must be alphabets"),
  check("firstName").exists().withMessage("First name is not provided"),
  check("firstName").isLength({ max: 20 }).withMessage("First name is too long. Use a maximum of 20 characters"),
  check('lastName').isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
  check("lastName").isAlpha().withMessage("Invalid name. Last name must be alphabets"),
  check("lastName").exists().withMessage("Last name is not provided"),
  check("lastName").isLength({ max: 20 }).withMessage("Last name is too long. Use a maximum of 20 characters"),
  check("phoneNumber").isMobilePhone("en-NG").withMessage("Invalid phone number"),
  check("email").isEmail().withMessage("Invalid email"),
  check("maritalStatus").exists().withMessage("Marital status is required"),
  check("maritalStatus").isIn([ "single", "married", "devorce", "other" ]).withMessage("Please enter a valid marrital status"),
  check("gender").exists().withMessage("Gender field is required"),
  check("gender").isIn([ "male", "female" ]).withMessage("Invalid gender"),
  check("dateOfBirth").exists().withMessage("Your date of birth is required"),
  check("dateOfBirth").isDate().withMessage("Date of birth must be of date type"),
  check("bvn").exists().withMessage("BVN is required"),
  check("bvn").isNumeric().withMessage("Invalid BVN. A BVN must be a number"),
  check("bvn").isLength({ min: 11, max: 11 }).withMessage("BVN must be 11 digits number"),
  check("city").exists().withMessage("Your city of residence is required"),
  check("city").isAlpha().withMessage("Invalid city. Please provide a valid city name"),
  check("city").isLength({ min: 3 }).withMessage("City name must be at least 2 characters long"),
  check("street").exists().withMessage("Your street of residence is required"),
  check("street").isString().withMessage("Invalid street name. Please provide a valid address name"),
  check("street").isLength({ min: 10 }).withMessage("Street name must be at least 10 characters long"),
  check("state").exists().withMessage("Your state of residence is required"),
  check("state").isAlpha().withMessage("Invalid state. Please provide a valid state name"),
  check("state").isLength({ min: 3 }).withMessage("State name must be at least 2 characters long"),
  check("meansOfIdentification").isIn(["international passport", "driver's license", "voter's card", "national identity", "others"]),
  check("identityNumber").isNumeric().isLength({ min: 9, max: 11 }).withMessage("Identity number must not be less than 9 or greater than 11 characters long"),
  function(req, res, next) {

    var errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        next();
    }
  }
];