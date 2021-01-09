const express = require("express");
const { 
  createCategory,
  updateCategory,
  getAllCategories, 
  getCategory,
} = require("../controller/loanCategory");
const { loanCategoryValidator } = require("../validation/loanCategoryValidation");

const router = express.Router();

router.post("/category/new", loanCategoryValidator, createCategory);
router.put("/category/:categoryId", updateCategory)
router.get("/category/all", getAllCategories);
router.get("/category/:categroyId", getCategory)
module.exports = router;