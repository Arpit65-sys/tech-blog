import express from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authUser, createCategory);         
router.get("/", getCategories);                            
router.put("/:id", authUser, updateCategory);
router.delete("/:id", authUser, deleteCategory);

export default router;
