// server/models/likeModel.js
import db from "../config/database.js";

export const Like = {
  async toggleLike(postId, userId) {
    // db.query returns [rows, fields]
    const [existingRows] = await db.query(
      "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
      [postId, userId]
    );

    if (existingRows.length > 0) {
      await db.query("DELETE FROM likes WHERE post_id = ? AND user_id = ?", [
        postId,
        userId,
      ]);
      return { liked: false };
    } else {
      await db.query("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", [
        postId,
        userId,
      ]);
      return { liked: true };
    }
  },

  async getLikeStatus(postId, userId) {
    // count query
    const [countRows] = await db.query(
      "SELECT COUNT(*) AS total FROM likes WHERE post_id = ?",
      [postId]
    );
    // countRows is an array; first element has total
    const totalLikesCount = countRows?.[0]?.total ?? 0;

    // user liked?
    const [userLikedRows] = await db.query(
      "SELECT * FROM likes WHERE post_id = ? AND user_id = ?",
      [postId, userId]
    );
    const isLikedByCurrentUser = userLikedRows.length > 0;

    return {
      totalLikesCount,
      isLikedByCurrentUser,
    };
  },

  // utility: get total likes without user context (optional)
  async getTotalLikes(postId) {
    const [countRows] = await db.query(
      "SELECT COUNT(*) AS total FROM likes WHERE post_id = ?",
      [postId]
    );
    return countRows?.[0]?.total ?? 0;
  }
};
