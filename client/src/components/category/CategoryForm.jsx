import { useState, useEffect } from "react";
import { generateSlug } from "../../utils/slugify";
import API from "../../utils/api";

export default function CategoryForm({ fetchCategories, editing, setEditing }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    if (editing) {
      setName(editing.name);
      setSlug(editing.slug);
    }
  }, [editing]);

  const handleGenerateSlug = () => {
    setSlug(generateSlug(name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !slug) return alert("Both name and slug are required");

    try {
      if (editing) {
        await API.put(`/categories/${editing.id}`, { name, slug });
        alert("Category updated");
      } else {
        await API.post("/categories", { name, slug });
        alert("Category created");
      }

      setName("");
      setSlug("");
      setEditing(null);
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {editing ? "Edit Category" : "Add Category"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            placeholder="Category Name"
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            placeholder="slug"
            className="border p-2 rounded w-full"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />

          <button
            type="button"
            onClick={handleGenerateSlug}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow-sm transition duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 md:w-80"
          >
            ⚡ Generate
          </button>
        </div>

        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transform transition duration-200 hover:scale-105 hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-48"
          >
           ➕ Create Category
          </button>
        </div>
      </form>
    </div>
  );
}
