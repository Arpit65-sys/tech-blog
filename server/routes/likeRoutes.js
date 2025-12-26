import express from "express";
import { toggleLike, getLikeStatus } from "../controllers/likeController.js";
import { authUser } from "../middleware/auth.js";


const router = express.Router();

router.post("/:postId/toggle", authUser, toggleLike);
router.get("/:postId/status", authUser, getLikeStatus);

export default router;
