// src/pages/EditPost.jsx
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import MarkdownEditor from "../../components/editor/MarkdownEditor";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        const p = res.data;
        setForm({ title: p.title || "", content: p.content || "" });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, {
        title: form.title,
        content: form.content,
      });
      alert("Post updated");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      {/* Glass Card */}
      <div className="bg-white/40 border border-gray/50 backdrop-blur-xl shadow-2xl p-8 rounded-3xl w-full max-w-4xl animate-scaleUp">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          ✏️ Edit Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Field */}
          <input
            className="w-full p-3 rounded-xl border border-gray-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
            placeholder="Title..."
            value={form.title}
            required
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          {/* Markdown Editor */}
          <MarkdownEditor
            value={form.content}
            onChange={(value) => setForm({ ...form, content: value })}
          />

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold hover:opacity-90 transition-all shadow-md"
            >
              ❌ Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-lg"
            >
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
