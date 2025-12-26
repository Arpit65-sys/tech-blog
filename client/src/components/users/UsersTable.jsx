export default function UsersTable({
  users,
  editUserId,
  editFormData,
  handleEditClick,
  handleInputChange,
  saveEdit,
  setEditUserId,
  toggleStatus,
}) {
  return (
    <div className="overflow-x-auto overflow-hidden rounded-2xl border border-gray/30">
      <table className="w-full text-left backdrop-blur-lg bg-white/30">
        <thead className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Name</th>
            <th className="p-4">Username</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-white/60 border-b border-gray/40 transition"
            >
              <td className="px-4 py-2 font-semibold text-gray-800">{user.id}</td>

              {/* Name */}
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    className="p-2 border rounded-lg w-full"
                    value={editFormData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>

              {/* Username */}
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    className="p-2 border rounded-lg w-full"
                    value={editFormData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>

              {/* Email */}
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <input
                    className="p-2 border rounded-lg w-full"
                    value={editFormData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>

              {/* Role */}
              <td className="px-4 py-2">
                {editUserId === user.id ? (
                  <select
                    className="p-2 border rounded-lg"
                    value={editFormData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                ) : (
                  <span className="capitalize">{user.role}</span>
                )}
              </td>

              {/* Status */}
              <td className="px-4 py-2">
                <span className="px-4 py-2 rounded-full font-semibold">
                  {user.is_active ? "Active" : "Disabled"}
                </span>
              </td>

              {/* Actions */}
              <td className="px-4 py-2 flex gap-3 justify-center">
                {editUserId === user.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(user.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditUserId(null)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(user)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => toggleStatus(user)}
                      className={`px-4 py-2 rounded-full text-white ${
                        user.is_active
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {user.is_active ? "Disable" : "Enable"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
