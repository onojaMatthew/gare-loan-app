const { check, validationResult } = require("express-validator");

exports.validateBank = [
  check("accountName").isString().isLength({ min: 3 }).withMessage("Please enter your account name"),
  check("accountNumber").isFloat().isLength({ min: 10, max: 10 }).withMessage("Invalid account number"),
  check("accountType").isIn(["savings", "current" ]).withMessage("Account type must be either SAVINGS or CURRENT"),
  check("name").isIn([
    "Access Bank", 
    "Citibank", 
    "Diamond Bank",
    "Dynamic Standard Bank", 
    "Ecobank Nigeria", 
    "Fidelity Bank Nigeria",
    "First Bank of Nigeria",
    "First City Monument Bank",
    "Guaranty Trust Bank",
    "Heritage Bank Plc",
    "Jaiz Bank",
    "Keystone Bank Limited",
    "Providus Bank Plc",
    "Polaris Bank",
    "Stanbic IBTC Bank Nigeria Limited",
    "Standard Chartered Bank",
    "Sterling Bank",
    "Suntrust Bank Nigeria Limited",
    "Union Bank of Nigeria",
    "United Bank for Africa",
    "Unity Bank Plc",
    "Wema Bank",
    "Zenith Bank",
  ]).withMessage("Please enter your bank name"),
  check("code").isIn(["044", "023", "063", "050", "070", "011", "214", "058", "030", "301", "082", "101", "076", "221", "068", "232", "100", "032", "033", "215", "035", "057"])
  .withMessage("Invalid bank code"),
  check("userId").isMongoId().withMessage("Invalid user ID"),
  check("bvn").exists().withMessage("BVN is required"),
  check("bvn").isNumeric().withMessage("Invalid BVN. A BVN must be a number"),
  check("bvn").isLength({ min: 11, max: 11 }).withMessage("BVN must be 11 digits number"),
  function(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      next();
    }
  }
]