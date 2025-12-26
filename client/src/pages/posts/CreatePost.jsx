import { useState } from "react";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import CategorySelector from "../../components/category/CategorySelector";
import MarkdownEditor from "../../components/editor/MarkdownEditor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/posts", {
      title,
      content,
      category,
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          ✍️ Write a New Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <CategorySelector
            value={category}
            onCategoryChange={setCategory}
            label="Category"
          />

          <input
            type="text"
            placeholder="Post Title"
            required
            className="w-full text-xl font-semibold p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* MARKDOWN EDITOR */}
          <MarkdownEditor value={content} onChange={setContent} />

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500"
            >
              Publish
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
