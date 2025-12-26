import bcrypt from "bcrypt";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  const username = "admin";
  const email = "admin@system.com";
  const password = "Admin@123";
  const role = "admin";

  const [existing] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (existing.length > 0) {
    console.log("Admin already exists");
    return;
  }

  const hashed = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [username, email, hashed, role]
  );

  console.log("Admin created: username=admin | password=Admin@123");
};

seedAdmin();