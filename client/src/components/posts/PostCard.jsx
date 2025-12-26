import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PostCard({
  post,
  onDelete,
  onRead,
  showActions = true,
}) {
  const { user } = useContext(AuthContext);

  const truncateContent = (text, wordLimit = 15) => {
    if (!text) return "";
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + " …";
  };

  const canManage = user && (user.role === "admin" || user.id === post.user_id);

  return (
    <article className="bg-white/60 backdrop-blur-lg border border-gray-500 rounded-2xl shadow-md p-5 flex flex-col max-h-72 w-full">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
        {post.title}
      </h2>
      <p className="text-gray-400 text-sm pb-4">
        By {post.name} on {new Date(post.created_at).toLocaleDateString()}
      </p>

      {/* Content */}
      <p className="text-gray-600 text-sm flex-1 overflow-hidden">
        {truncateContent(post.content, 15)}
      </p>

      {/* Bottom buttons */}
      <div className="mt-2 flex flex-wrap gap-3 items-center justify-between">
        {/* Read More */}
        {typeof onRead === "function" ? (
          <button
            onClick={() => onRead(post.id)}
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            Read More →
          </button>
        ) : (
          <Link
            to={`/post/${post.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition"
          >
            Read More →
          </Link>
        )}

        {/* Edit & Delete */}
        {showActions && canManage && onDelete && (
          <div className="flex gap-3 max-[425px]:justify-between max-[425px]:w-full">
            <Link
              to={`/edit-post/${post.id}`}
              className="text-yellow-600 hover:text-yellow-700 font-medium transition"
            >
              ✏ Edit
            </Link>

            <button
              onClick={() => onDelete(post.id)}
              className="text-red-600 hover:text-red-700 font-medium transition"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
