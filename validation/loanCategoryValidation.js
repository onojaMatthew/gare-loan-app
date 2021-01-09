const { check, validationResult } = require("express-validator");

exports.loanCategoryValidator = [
  check("name").isEmpty().withMessage("The name of the loan category is required"),
  check("name").isString().withMessage("The name of a category must be a string"),
  check("createdBy").isEmpty().withMessage("Please provide the person creatding this category"),
  check("createdBy").isMongoId().withMessage("Invalid user ID"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()});
    } else {
      next();
    }
  }
]