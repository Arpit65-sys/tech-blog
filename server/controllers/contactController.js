import { contact } from "../models/contactModel.js";

export const contactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    await contact.contactByUser({ name, email, message });
    res.status(201).json({ message: "Contact message received successfully" });
  } catch (error) {
    console.error(error); // 👈 log actual error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getContacts = async (req, res) => {
  try { 
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const contacts = await contact.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const seenQuery = async (req, res ) => {
  try {
    if(!req.user || req.user.role !== "admin"){
      return res.status(403).json({ message: "Access denied" });
    }
    const { queryId } = req.params;
    const results = await contact.seenQuery(queryId);
    if(results.success){
      res.status(200).json({ message: "User query has seen successfully" });
    } else {
      res.status(404).json({ message: "Query not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};