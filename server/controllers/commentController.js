// server/controllers/commentController.js

import { Comment } from "../models/commentModel.js";

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.postId;
    const userId = req.user.id;

    if (!text || text.trim() === "")
      return res.status(400).json({ message: "Comment cannot be empty" });

    await Comment.addComment(postId, userId, text);

    const comments = await Comment.getComments(postId);
    const count = await Comment.countComments(postId);

    res.json({ message: "Comment added", comments, count });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.getComments(postId);
    const count = await Comment.countComments(postId);

    res.json({ comments, count });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load comments" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const role = req.user.role;

    const result = await Comment.deleteComment(commentId, userId, role);

    if (!result.deleted)
      return res.status(403).json({ message: "Not authorized to delete" });

    res.json({ message: "Comment deleted" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};

export const editComment = async (req, res) => {
  try {
    const { text } = req.body;
    const commentId = req.params.commentId;
    const userId = req.user.id;
    const role = req.user.role;

    if (!text?.trim()) return res.status(400).json({ message: "Comment cannot be empty" });

    const result = await Comment.updateComment(commentId, userId, text, role);

    if (!result.updated)
      return res.status(403).json({ message: "Not authorized to edit comment" });

    res.json({ message: "Comment updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update comment" });
  }
};
