const { LoanCategory } = require("../models/loanCategory");

exports.createCategory = async (req, res) => {
  try {
    let category = await LoanCategory.findOne({ name: req.body.name });
    if (category) return res.status(400).json({ error: "Category already exists" });
    let newCategory = new LoanCategory({
      name: req.body.name,
      createdBy: req.body.createdBy
    });

    newCategory = await newCategory.save();
    if (!newCategory) return res.status(400).json({ error: "Failed to create loan category. Please try again" });
    return res.json(newCategory);
  } catch (error) {
    return res.status(400).json({ error: errors.message });
  }
}

// Fetch one category using the category ID
exports.getCategory = async (req, res) => {
  try {
    let category = await LoanCategory.findById({ _id: req.params.categoryId }).populate("createdBy");
    if (!category) return res.status(404).json({ error: "No records found" });
    return res.json(category);
  } catch (error) {
    return res.status(400).json({ error: errors.message });
  }
}

exports.getAllCategories = async (req, res) => {
  try {
    let categories = await LoanCategory.find({}).populate("createdBy");
    if (!categories) return res.status(404).json({ error: "No records found" });
    return res.json(categories);
  } catch (error) {
    return res.status(400).json({ error: errors.message });
  }
}

exports.updateCategory = async (req, res) => {
  try {
    let category = await LoanCategory.findById({ _id: req.params.categoryId }).populate("createdBy");
    if (!category) return res.status(404).json({ error: "Record not found" });
    if (req.body.name) category.name = req.body.name;
    let updatedCategory = await category.save();
    if (!updatedCategory) return res.status(400).json({ error: "Request failed. Please try again" });
    return res.json(updatedCategory);
  } catch (error) {
    return res.status(400).json({ error: errors.message });
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    let category = await LoanCategory.findByIdAndDelete({ _id: req.body.categoryId });
    if (!category) return res.status(404).json({ error: "Category not found" });
    return res.json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}