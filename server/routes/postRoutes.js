import express from "express";
import { authUser } from "../middleware/auth.js";
import checkOwnerOrAdmin from "../middleware/checkOwnerOrAdmin.js";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByCategory
} from "../controllers/postController.js";

const router = express.Router();

router.post("/", authUser, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id", authUser, checkOwnerOrAdmin, updatePost);
router.delete("/:id", authUser, checkOwnerOrAdmin, deletePost);
router.get("/category/:categorySlug", getPostsByCategory);

export default router;
