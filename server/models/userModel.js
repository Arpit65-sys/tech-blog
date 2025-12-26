import db from "../config/database.js";

const createUser = (name, username, email, password, role = "user") => {
  const sql = "INSERT INTO users (name, username, email, password, role) VALUES (?, ?, ?, ?, ?)";
  return db.query(sql, [name, username, email, password, role]);
};

const getUserByUsername = (username) => {
  return db.query("SELECT * FROM users WHERE username = ?", [username]);
};

const checkUserMail = (email) => {
  const sql = "SELECT id FROM users WHERE email = ?";
  return db.query(sql, [email]);
}

const getAllUsers = () => {
  return db.query("SELECT id, name, username, email, role, is_active, created_at FROM users");
};

const UpdateUserByAdmin = (id, name, username, email, role) => {
  const sql = "UPDATE users SET name = ?, username = ?, email = ?, role = ? WHERE id = ?";
  return db.query(sql, [name, username, email, role, id]); 
};

const DisableUserByAdmin = (id) => {
  const sql = "UPDATE users SET is_active = 0 WHERE id = ?";
  return db.query(sql, [id]);
};

const EnableUserByAdmin = (id) => {
  const sql = "UPDATE users SET is_active = 1 WHERE id = ?";
  return db.query(sql, [id]);
};

export default { createUser, getUserByUsername, checkUserMail, getAllUsers, UpdateUserByAdmin, DisableUserByAdmin, EnableUserByAdmin };
