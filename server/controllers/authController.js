import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendMail } from "../utils/sendMail.js";
import { welcomeEmail } from "../utils/emailTemplates.js";

export const registerUserByAdmin = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  try {
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can create users" });
    }

    const [existing] = await User.getUserByUsername(username);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const [existingEmail] = await User.checkUserMail(email);
    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.createUser(name, username, email, hashed, role || "user");

    res.json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    username = username.trim();
    email = email.trim().toLowerCase();

    const [existing] = await User.getUserByUsername(username);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const [existingEmail] = await User.checkUserMail(email);
    if (existingEmail.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.createUser(name, username, email, hashed, "user");

    // Send welcome email
    const emailContent = welcomeEmail(name);
    await sendMail({
      to: email,
      subject: "Explore into TechQeeda🐛",
      html: emailContent,
    });

    res.status(201).json({ message: "Account created successfully. Please check your email 📧" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await User.getUserByUsername(username);

    // User not found
    if (rows.length === 0) {
      return res.status(404).json({ message: "❌ User not found." });
    }

    const user = rows[0];

    // Disabled account
    if (user.is_active === 0) {
      return res
        .status(403)
        .json({ message: "🚫 Account disabled. Contact admin." });
    }

    // Wrong password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ message: "❌ Invalid username or password." });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "✅ Login successful!",
      token,
      id: user.id,
      role: user.role,
      name: user.name,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error. Please try again later." });
  }
};
