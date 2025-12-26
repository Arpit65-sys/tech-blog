import express from "express";
import { contactUs, getContacts, seenQuery } from "../controllers/contactController.js";
import { authUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/", contactUs);
router.get("/", authUser, getContacts);
router.put("/seen-query/:queryId", authUser, seenQuery);

export default router;