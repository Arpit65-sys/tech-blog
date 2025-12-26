// server/models/commentModel.js
import db from "../config/database.js";

export const Comment = {

  async addComment(postId, userId, text) {
    await db.query(
      "INSERT INTO comments (post_id, user_id, comment) VALUES (?, ?, ?)",
      [postId, userId, text]
    );

    return { success: true };
  },

  async deleteComment(commentId, userId, role) {
    // IF NOT ADMIN, CHECK COMMENT OWNERSHIP
    if (role !== "admin") {
      const [rows] = await db.query(
        "SELECT * FROM comments WHERE id = ? AND user_id = ?",
        [commentId, userId]
      );

      if (rows.length === 0) return { deleted: false };
    }

    await db.query("DELETE FROM comments WHERE id = ?", [commentId]);
    return { deleted: true };
  },

  async getComments(postId) {
    const [rows] = await db.query(
      `SELECT comments.id, comments.comment, comments.created_at,
              users.username, users.id AS user_id
       FROM comments 
       JOIN users ON comments.user_id = users.id
       WHERE comments.post_id = ?
       ORDER BY comments.created_at DESC`,
      [postId]
    );

    return rows;
  },

  async countComments(postId) {
    const [result] = await db.query(
      "SELECT COUNT(*) AS total FROM comments WHERE post_id = ?",
      [postId]
    );

    return result?.[0]?.total ?? 0;
  },

  async updateComment(commentId, userId, newText, role) {

    // IF NOT ADMIN, CHECK COMMENT OWNERSHIP
    if (role !== "admin") {
      const [rows] = await db.query(
        "SELECT id FROM comments WHERE id = ? AND user_id = ?",
        [commentId, userId]
      );

      if (rows.length === 0) return { updated: false }; 
    }

    await db.query(
      "UPDATE comments SET comment = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newText, commentId]
    );

    return { updated: true };
  }
};
