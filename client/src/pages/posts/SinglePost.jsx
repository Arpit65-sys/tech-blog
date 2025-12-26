// src/pages/SinglePost.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import LikeButton from "../../components/posts/LikeButton";
import CommentSection from "../../components/posts/CommentSection";
import ReactMarkdown from "react-markdown";


export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`); 
        setPost(res.data);
      } catch (err) {
        alert(err.response?.data?.message || "Failed to load post");
      }
    };
    loadPost();
  }, [id]);

  if (!post) {
    return (
      <p className="p-10 text-center text-gray-600 text-base">
        Loading post...
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-5 pb-10 px-4">
      {/* CONTENT */}
      <article className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
          {post.title}
        </h1>

        <p className="text-sm md:text-base text-gray-500 mb-6">
          By <span className="font-medium">{post.name}</span> ·{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        <div className="border-t border-gray-300 mb-6" />

        {/* POST CONTENT */}
        <div
          className="prose prose-lg max-w-none text-base md:text-lg leading-relaxed"
          onDoubleClick={() =>
            document.getElementById("like-trigger")?.click()
          }
        >
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="mt-10 pt-4 border-t flex items-center justify-between gap-4">
          <LikeButton
            postId={post._id || post.id}
            initialLikes={post.likes?.length || 0}
          />

          <CommentSection postId={post._id || post.id} />

          {/* Back button only for >= 924px */}
          <button
            onClick={() => navigate(-1)}
            className="hidden lg:block px-5 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition shadow"
          >
            ← Back
          </button>
        </div>
      </article>
    </div>
  );
}
