const Categories = require("../models/Categories");

exports.createCategory = async (req, res) => {
  const newCategory = new Categories(req.body);
  try {
    const savedCategory = await newCategory.save();
    res.status(200).json({ post: "successful", category: savedCategory });
  } catch (err) {
    res
      .status(500)
      .json({ post: "failed", category: "failed to create category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const Category = await Categories.find();

    res.status(200).json({ get: "successful", categories: Category });
  } catch (err) {
    res
      .status(500)
      .json({ get: "failed", category: "failed to get categories" });
  }
};
