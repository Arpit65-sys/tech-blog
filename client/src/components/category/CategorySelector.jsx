// src/components/category/CategorySelector.jsx
import { useEffect, useState } from "react";
import API from "../../utils/api";
import { FaTags } from "react-icons/fa";

export default function CategorySelector({ onCategoryChange, value, label = "Select Category", showAllOption = false }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await API.get("/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error loading categories", err);
    }
  };

  return (
    <div className="">
      <label className="flex items-center gap-2 text-gray-800 font-semibold mb-2">
        <FaTags className="text-blue-600" />
        {label}
      </label>

      <select
        className="w-full p-3 rounded-xl border-2 border-gray-400 shadow-md bg-white text-gray-700 
        outline-none hover:border-blue-400 focus:border-blue-600 transition-all duration-300 cursor-pointer"
        value={value}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        {showAllOption && <option value="">🔥 All Posts</option>}

        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
