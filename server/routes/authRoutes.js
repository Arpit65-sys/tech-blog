import express from "express";
import { authUser } from "../middleware/auth.js";
import { registerUserByAdmin, login, registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", authUser, registerUserByAdmin);
router.post("/register-user", registerUser);
router.get("/validate", authUser, (req, res) => {
  res.json({
    valid: true,
    user: req.user
  });
});


export default router;
