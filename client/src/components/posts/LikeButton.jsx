// src/components/LikeButton.jsx
import { useEffect, useState } from "react";
import API from "../../utils/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function LikeButton({ postId }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const res = await API.get(`/likes/${postId}/status`, { headers });
      setLikes(typeof res.data.totalLikesCount === "number" ? res.data.totalLikesCount : 0);
      setIsLiked(Boolean(res.data.isLikedByCurrentUser));
    } catch (err) {
      if (err.response?.status === 401) {
        try {
          const res2 = await API.get(`/posts/${postId}`); 
          if (Array.isArray(res2.data.likes)) {
            setLikes(res2.data.likes.length);
          } else {
            setLikes(res2.data.likes ?? 0);
          }
          setIsLiked(false);
        } catch (e) {
          console.error("Couldn't load likes without auth", e);
        }
      } else {
        console.error("Can't load like status", err);
      }
    }
  };

  const format = (num) => {
    if (!Number.isFinite(num)) return 0;
    if (num < 1000) return num;
    if (num < 1e6) return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    if (num < 1e9) return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  };

  const toggleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to like posts.");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post(`/likes/${postId}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const total = typeof res.data.totalLikesCount === "number" ? res.data.totalLikesCount : likes;
      setLikes(total);
      setIsLiked(Boolean(res.data.isLikedByCurrentUser));
    } catch (err) {
      console.error("Failed to toggle like", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus(); 
  }, [postId]);

  return (
    <div
      id="like-trigger"
      className="flex items-center gap-3 cursor-pointer select-none"
      onClick={toggleLike}
      role="button"
      aria-pressed={isLiked}
    >
      {isLiked ? (
        <FaHeart size={24} className={`text-red-500 transition-transform ${loading ? "opacity-60" : "hover:scale-105"}`} />
      ) : (
        <FaRegHeart size={24} className={`text-gray-400 transition-transform ${loading ? "opacity-40" : "hover:text-red-400 hover:scale-105"}`} />
      )}
      <span className="text-gray-600 text-sm">{format(likes)} likes</span>
    </div>
  );
}
