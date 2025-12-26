import db from "../config/database.js";

const createPost = (user_id, title, content, category) => {
  const sql = "INSERT INTO posts (user_id, title, content, category) VALUES (?, ?, ?, ?)";
  return db.query(sql, [user_id, title, content, category || "others"]);
};

const getAllPosts = () => {
  return db.query(`
    SELECT posts.*, users.username, users.name 
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.is_deleted = 0
    ORDER BY posts.created_at DESC
  `);
};


const getPostById = (id) => {
  return db.query(`
    SELECT posts.*, users.username, users.name 
    FROM posts 
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?`, 
    [id]
  );
};

const getPostsByCategorySlug = (categorySlug) => {
  const sql = `
    SELECT posts.*, users.username, users.name
    FROM posts
    LEFT JOIN users ON posts.user_id = users.id
    WHERE posts.is_deleted = 0 AND posts.category = ?
    ORDER BY posts.created_at DESC
  `;
  return db.query(sql, [categorySlug]);
}

const updatePost = (id, title, content) => {
  const sql = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
  return db.query(sql, [title, content, id]);
};

const softDeletePost = (id) => {
  const sql = "UPDATE posts SET is_deleted = 1 WHERE id = ?";
  return db.query(sql, [id]);
};

export default {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  softDeletePost,
  getPostsByCategorySlug
};
