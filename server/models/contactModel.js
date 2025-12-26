import db from "../config/database.js";

export const contact = {
  async contactByUser({ name, email, message }) {
    await db.query(
      "INSERT INTO contacts (name, email, message, seen) VALUES (?, ?, ?, 0)",
      [name, email, message]
    );
    return { success: true };
  },

  async getAllContacts() {
    const [rows] = await db.query("SELECT * FROM contacts WHERE seen = 0 ORDER BY created_at DESC");
    return rows;
  },

  async seenQuery(queryId){
    const [result] = await db.query(
      "UPDATE contacts SET seen = 1 WHERE id = ?",
      [queryId]
    );
    return { success: result.affectedRows > 0 ? true : false }
  }
};