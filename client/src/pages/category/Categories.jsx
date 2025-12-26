import { useEffect, useState } from "react";
import API from "../../utils/api";
import CategoryForm from "../../components/category/CategoryForm";
import CategoryTable from "../../components/category/CategoryTable";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    const { data } = await API.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Manage Categories</h1>

      <CategoryForm fetchCategories={fetchCategories} editing={editing} setEditing={setEditing} />

      <CategoryTable categories={categories} fetchCategories={fetchCategories} setEditing={setEditing} />
    </div>
  );
}
