// src/pages/Home.jsx
import { useEffect, useState } from "react";
import API from "../utils/api";
import PostCard from "../components/posts/PostCard";
import { useNavigate } from "react-router-dom";
import CategorySelector from "../components/category/CategorySelector";
import Pagination from "../components/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const navigate = useNavigate();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error loading posts:", err);
    }
  };

  const filterPosts = async (categorySlug) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);

    if (!categorySlug) {
      loadPosts();
      return;
    }

    try {
      const res = await API.get(`/posts/category/${categorySlug}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error filtering posts:", err);
    }
  };

  const handleRead = (id) => {
    navigate(`/post/${id}`);
  };

  const totalPages = Math.ceil(posts.length / pageSize);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      {/* HERO SECTION */}
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800">
          🚀 Explore Latest Tech Blogs
        </h1>
        <p className="mt-3 text-lg text-gray-700">
          Stay updated with the latest tech—read, learn & grow 🚀
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="w-[15rem] mb-4">
          <CategorySelector
            onCategoryChange={filterPosts}
            value={selectedCategory}
            showAllOption={true}
          />
        </div>
      </div>

      {/* POSTS LIST */}
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        {paginatedPosts.length ? (
          paginatedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onRead={() => handleRead(post.id)}
            />
          ))
        ) : (
          <p className="text-center text-lg text-gray-600 pt-10">
            📭 No posts found for this category.
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
  );
}
