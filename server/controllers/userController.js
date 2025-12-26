import User from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const [userList] = await User.getAllUsers();
    res.json({ users: userList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const editUserByAdmin = async (req, res) => {
  const { id } = req.params;
  const { name, username, email, role } = req.body;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can edit user details" });
    }

    const [result] = await User.UpdateUserByAdmin(id, name, username, email, role);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User details updated successfully",
      updated: { id, name, username, email, role }
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const EnableUserByAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can disable users" });
    }

    const [result] = await User.EnableUserByAdmin(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User Enabled successfully",
      enabledUserId: id
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const DisableUserByAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can disable users" });
    }

    const [result] = await User.DisableUserByAdmin(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User disabled successfully",
      disabledUserId: id
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const ExportUsers = async (req, res) => {
  try{
    if (req.user.role !== "admin"){
      return res.status(403).json({ message: "Access denied, Only Admin can perform this operation" });
    }
    const [userList] =  await User.getAllUsers();
    // Convert user data to CSV format
    const csvHeaders = "ID,Name,Username,Email,Role,Is_Active,Created At\n";
    const csvRows = userList.map(user =>
      `${user.id},${user.name},${user.username},${user.email},${user.role},${user.is_active},${user.created_at}`
    ).join("\n");
    const csvData = csvHeaders + csvRows;
    // Set response headers for file download
    res.setHeader("Content-Disposition", "attachment; filename=users.csv");
    res.setHeader("Content-Type", "text/csv");
    res.status(200).send(csvData); 

  }catch(err){
    return res.status(500).json({ error: err.message });
  }
};