import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import API from "../utils/api";
import PostCard from "../components/posts/PostCard";
import ExportUsersButton from "../components/users/ExportUsersButton";
import CategorySelector from "../components/category/CategorySelector";
import Pagination from "../components/Pagination";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [backupPosts, setBackupPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    loadMyPosts();

    if (user.role === "admin") {
      loadUsers();
    }
  }, []);

  const loadMyPosts = async () => {
    try {
      const res = await API.get("/posts");

      // admin sees all posts
      const filtered =
        user.role === "admin"
          ? res.data
          : res.data.filter((post) => post.user_id === user.id);

      setMyPosts(filtered);
      setBackupPosts(filtered); // store original result for reset
    } catch (err) {
      console.error("Error loading posts", err);
    }
  };

  const filterByCategory = async (slug) => {
    setSelectedCategory(slug);
    setCurrentPage(1);

    if (!slug) {
      setMyPosts(backupPosts);
      return;
    }

    try {
      const res = await API.get(`/posts/category/${slug}`);

      const filtered =
        user.role === "admin"
          ? res.data
          : res.data.filter((post) => post.user_id === user.id);

      setMyPosts(filtered);
    } catch (err) {
      console.error("Error filtering posts", err);
    }
  };

  const deletePostHandler = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${id}`);
      loadMyPosts();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete");
    }
  };

  const loadUsers = async () => {
    try {
      const res = await API.get("/users/get-all-users");
      setUsers(res.data);
    } catch (err) {
      console.error("Error loading users", err);
    }
  };

  const totalPages = Math.ceil(myPosts.length / pageSize);
  const paginatedPosts = myPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Welcome Card */}
      <div className="bg-white/40 border border-white/50 backdrop-blur-xl shadow-xl p-6 rounded-3xl mx-auto max-w-4xl text-center mb-4 md:mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">
          👋 Welcome, <span className="text-indigo-600">{user.name}</span>
        </h1>
        <p className="text-gray-700 mt-2">
          Manage your posts, profile and settings from here.
        </p>
      </div>

      {/* ADMIN PANEL */}
      {user.role === "admin" && (
        <div className="max-w-5xl mx-auto mb-4 md:mb-10 bg-white/40 border border-white/50 backdrop-blur-xl shadow-lg p-6 rounded-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ⚙️ Admin Panel
          </h2>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            <Link
              to="/admin/create-user"
              className="flex-shrink-0 w-55 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all text-center"
            >
              ➕ Create User
            </Link>

            <Link
              to="/admin/users"
              className="flex-shrink-0 w-55 px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-400 text-white font-semibold shadow-lg hover:opacity-90 transition-all text-center"
            >
              👤 View All Users
            </Link>

            <Link
              to="/admin/categories"
              className="flex-shrink-0 w-55 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-white font-semibold shadow-lg hover:opacity-90 transition-all text-center"
            >
              ⚙️ Manage Category
            </Link>

            <ExportUsersButton className="flex-shrink-0 w-55 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold hover:bg-blue-700 transition-all shadow-md text-center" />
          </div>
        </div>
      )}

      {/* POSTS SECTION */}
      <div className="max-w-5xl mx-auto bg-white/40 border border-white/50 backdrop-blur-xl shadow-lg p-6 rounded-3xl">
        <div className="flex gap-2 flex-wrap md:justify-between items-center">
          {user.role === "admin" ? (
            <h2 className="text-2xl font-bold text-gray-900">📝 All Posts</h2>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">📝 My Posts</h2>
          )}

          <Link
            to="/create-post"
            className="flex-shrink-0 w-50 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all text-center"
          >
            ➕ Create Post
          </Link>
        </div>

        {/* Category Filter */}
        <div className="w-[15rem] my-4">
          <CategorySelector
            value={selectedCategory}
            onCategoryChange={filterByCategory}
            showAllOption={true}
          />
        </div>

        {/* POSTS LIST */}
        <div className="grid grid-cols-1 gap-6">
          {paginatedPosts.length ? (
            paginatedPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={deletePostHandler}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center w-full py-4">
              No posts found. Create your first one!
            </p>
          )}
        </div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
