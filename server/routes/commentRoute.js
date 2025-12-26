import express from "express";
import { authUser } from "../middleware/auth.js";
import { addComment, getComments, deleteComment, editComment } from "../controllers/commentController.js";

const router = express.Router();

router.post("/:postId", authUser, addComment);
router.get("/:postId", getComments);
router.delete("/:commentId", authUser, deleteComment);
router.put("/:commentId", authUser, editComment);

export default router;