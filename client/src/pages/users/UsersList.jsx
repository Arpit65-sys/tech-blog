import { useEffect, useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ExportUsersButton from "../../components/users/ExportUsersButton";
import UsersTable from "../../components/users/UsersTable";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await API.get("/users/get-all-users");
      setUsers(res.data.users);
    } catch (err) {
      alert("Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const goBack = () => navigate("/dashboard");

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setEditFormData({ ...user });
  };

  const handleInputChange = (field, value) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async (id) => {
    try {
      await API.put(`/users/edit-user-by-admin/${id}`, editFormData);
      alert("User updated successfully.");
      setEditUserId(null);
      loadUsers();
    } catch (err) {
      alert("Update failed.");
    }
  };

  const toggleStatus = async (user) => {
    try {
      const endpoint = user.is_active
        ? `/users/disable-user-by-admin/${user.id}`
        : `/users/enable-user-by-admin/${user.id}`;

      await API.put(endpoint);

      alert(
        user.is_active
          ? "User disabled successfully."
          : "User enabled successfully."
      );

      loadUsers();
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  return (
    <div className="min-h-[700px] p-4 sm:p-10 bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center">
      <div className="w-full max-w-5xl bg-white/20 backdrop-blur-xl shadow-xl border border-gray/40 rounded-3xl p-4 sm:p-8 animate-fadeIn">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-4 sm:mb-8">
          👥 Manage Users
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible justify-between mb-4 sm:mb-6">
          <button
            onClick={goBack}
            className="w-full sm:w-60 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold hover:opacity-90 transition-all shadow-md"
          >
            ⬅ Back to Dashboard
          </button>

          <ExportUsersButton className="w-full sm:w-60 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold hover:bg-blue-700 transition-all shadow-md" />
        </div>

        <UsersTable
          users={users}
          editUserId={editUserId}
          editFormData={editFormData}
          handleEditClick={handleEditClick}
          handleInputChange={handleInputChange}
          saveEdit={saveEdit}
          setEditUserId={setEditUserId}
          toggleStatus={toggleStatus}
        />
      </div>
    </div>
  );
}
