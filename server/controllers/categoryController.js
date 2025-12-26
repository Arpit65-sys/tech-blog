import * as Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    await Category.createCategory(name, slug);
    res.json({ message: "Category created successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const [rows] = await Category.getCategories();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    await Category.updateCategory(req.params.id, name, slug);
    res.json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.deleteCategory(req.params.id);
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
