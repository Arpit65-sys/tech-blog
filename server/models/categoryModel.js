import db from "../config/database.js";

export const createCategory = (name, slug) => {
  return db.query("INSERT INTO categories (name, slug) VALUES (?, ?)", [name, slug]);
};

export const getCategories = () => {
  return db.query("SELECT * FROM categories ORDER BY name ASC");
};

export const updateCategory = (id, name, slug) => {
  return db.query("UPDATE categories SET name = ?, slug = ? WHERE id = ?", [
    name,
    slug,
    id,
  ]);
};

export const deleteCategory = (id) => {
  return db.query("DELETE FROM categories WHERE id = ?", [id]);
};
