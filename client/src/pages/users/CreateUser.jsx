import { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/auth/register", form);
      alert("✅ User created successfully!");

      // reset form
      setForm({ name: "", username: "", email: "", password: "", role: "user" });

      // redirect to users list
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray/30 transition-all w-[600px] animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-900">
          👤 Create User
        </h2>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />
          
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </div>
      </form>
    </div>
  );
}
