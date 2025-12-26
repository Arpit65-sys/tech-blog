import { useState } from "react";
import API from "../../utils/api";
import { generateSlug } from "../../utils/slugify";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";

export default function CategoryTable({ categories, fetchCategories }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editSlug, setEditSlug] = useState("");

  const startEditing = (cat) => {
    setEditId(cat.id);
    setEditName(cat.name);
    setEditSlug(cat.slug);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
    setEditSlug("");
  };

  const saveEdit = async (id) => {
    if (!editName || !editSlug) return alert("Name & Slug required");

    try {
      await API.put(`/categories/${id}`, { name: editName, slug: editSlug });
      fetchCategories();
      cancelEdit();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating");
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await API.delete(`/categories/${id}`);
    fetchCategories();
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border-collapse text-sm shadow-md rounded-lg">
        
        {/* Header */}
        <thead className="bg-gray-100 text-gray-700 text-left">
          <tr>
            <th className="px-4 py-2 border-b">S.No</th>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Slug</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((cat, index) => (
            <tr
              key={cat.id}
              className="hover:bg-gray-50 transition-all border-b"
            >
              <td className="px-4 py-2 whitespace-nowrap">{index + 1}</td>

              {/* Name */}
              <td className="px-4 py-2 whitespace-nowrap min-w-[180px]">
                {editId === cat.id ? (
                  <input
                    className="p-2 w-full bg-gray-100 rounded-md outline-none focus:ring-2 focus:ring-blue-400 transition"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <span className="font-medium">{cat.name}</span>
                )}
              </td>

              {/* Slug */}
              <td className="px-4 py-2 whitespace-nowrap min-w-[220px]">
                {editId === cat.id ? (
                  <div className="flex gap-2 w-full">
                    <input
                      className="p-2 bg-gray-100 rounded-md outline-none w-full focus:ring-2 focus:ring-blue-400 transition"
                      value={editSlug}
                      onChange={(e) => setEditSlug(e.target.value)}
                    />
                    <button
                      onClick={() => setEditSlug(generateSlug(editName))}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:scale-105 transition text-xs"
                    >
                      Auto
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-600">{cat.slug}</span>
                )}
              </td>

              {/* Actions */}
              <td className="px-4 py-2 whitespace-nowrap flex gap-3">
                {editId === cat.id ? (
                  <>
                    <button
                      className="text-green-600 hover:scale-110 transition py-2"
                      onClick={() => saveEdit(cat.id)}
                      title="Save"
                    >
                      <FaSave size={18} />
                    </button>
                    <button
                      className="text-gray-500 hover:scale-110 transition py-2"
                      onClick={cancelEdit}
                      title="Cancel"
                    >
                      <FaTimes size={18} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="text-yellow-600 hover:scale-110 transition"
                      onClick={() => startEditing(cat)}
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:scale-110 transition"
                      onClick={() => deleteCategory(cat.id)}
                      title="Delete"
                    >
                      <FaTrash size={18} />
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
