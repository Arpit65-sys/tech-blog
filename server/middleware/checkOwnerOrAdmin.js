import db from "../config/database.js";

const checkOwnerOrAdmin = async (req, res, next) => {
  const { id: userId, role } = req.user;
  const postId = req.params.id;

  const [rows] = await db.query("SELECT user_id FROM posts WHERE id = ?", [postId]);

  if (rows.length === 0) return res.status(404).json({ message: "Post not found" });

  if (role === "admin" || rows[0].user_id === userId) {
    return next();
  }

  return res.status(403).json({ message: "Not allowed" });
};

export default checkOwnerOrAdmin;
