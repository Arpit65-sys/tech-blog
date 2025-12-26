// server/controllers/likeController.js
import { Like } from "../models/likeModel.js";

export const toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const result = await Like.toggleLike(postId, userId);

    // fetch fresh status
    const status = await Like.getLikeStatus(postId, userId);

    return res.json({
      message: result.liked ? "Liked" : "Unliked",
      ...status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to toggle like" });
  }
};

export const getLikeStatus = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const status = await Like.getLikeStatus(postId, userId);

    return res.json(status);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get like info" });
  }
};
