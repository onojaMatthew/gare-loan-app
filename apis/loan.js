const express = require("express");
const { 
  loanRequest, 
  getLoans,
  getLoan,
  approveLoan,
} = require("../controller/loan");

const router = express.Router();

router.post("/loan/new", loanRequest);
router.get("/loan/all", getLoans);
router.put("/loan/single", getLoan);
router.put("/loan/approve", approveLoan);


module.exports = router;