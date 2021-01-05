const {check, validationResult} = require('express-validator');


exports.validateEmployment = [
  check("employmentType").isIn([ "full time", "part time", "contract", "outsourced", "self employed"]).withMessage("Please enter a valid employment type"),
  check("salaryPayDay").isFloat({ min: 1, max: 31 }).isLength({ min: 1, max: 2 }).withMessage("Salary pay day must be a number"),
  check("netMonthlyPay").isFloat({ min: 3000 }).withMessage("Your net monthly pay must be at least 3000 naira"),
  
  function(req, res, next) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
      next();
    }
  }
];