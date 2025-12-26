import express from "express";
import { authUser } from "../middleware/auth.js";
import { getAllUsers, editUserByAdmin, DisableUserByAdmin, EnableUserByAdmin, ExportUsers } from "../controllers/userController.js";

const router = express.Router();

router.get("/get-all-users", authUser, getAllUsers);
router.put("/edit-user-by-admin/:id", authUser, editUserByAdmin);
router.put("/disable-user-by-admin/:id", authUser, DisableUserByAdmin);
router.put("/enable-user-by-admin/:id", authUser, EnableUserByAdmin);
router.get("/export", authUser, ExportUsers);

export default router;
