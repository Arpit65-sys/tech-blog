import { useEffect, useState } from "react";
import API from "../../utils/api";
import { FaCommentDots, FaTrash } from "react-icons/fa";

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editText, setEditText] = useState("");

  // -------------------------
  // GET USER FROM LOCALSTORAGE
  // -------------------------
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const user = {
    id: storedUser._id || storedUser.id,
    username: storedUser.username,
    role: storedUser.role,   // <-- Important for permissions
  };

  const loadComments = async () => {
    try {
      const res = await API.get(`/comments/${postId}`);
      setComments(res.data.comments);
      setCount(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  const addComment = async () => {
    if (!text.trim()) return;

    try {
      const res = await API.post(
        `/comments/${postId}`,
        { text },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      setComments(res.data.comments);
      setCount(res.data.count);
      setText("");
    } catch {
      alert("Login required to comment");
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`/comments/${deleteTarget}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      loadComments();
      setDeleteTarget(null);
    } catch (err) {
      console.log(err);
    }
  };

  const updateComment = async () => {
    if (!editText.trim()) return;

    try {
      await API.put(
        `/comments/${editingComment}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      loadComments();
      setEditingComment(null);
      setEditText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);


  return (
    <>
      {/* Open Comments */}
      <div
        className="cursor-pointer flex items-center gap-2 text-gray-600 hover:scale-[1.05] transition"
        onClick={() => setOpenModal(true)}
      >
        <FaCommentDots className="text-xl" />
        <span className="font-semibold">{count} Comments</span>
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex justify-center items-center z-50 transition">
          <div className="bg-white w-[450px] max-h-[520px] rounded-xl shadow-2xl p-5 flex flex-col animate-fadeIn">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
              <button
                onClick={() => setOpenModal(false)}
                className="hover:bg-gray-200 p-2 rounded-full transition"
              >
                ✖
              </button>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto border rounded-lg p-4 space-y-4 bg-gray-50">
              {comments.length === 0 ? (
                <p className="text-center text-sm text-gray-400">No comments yet 📝</p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-lg bg-white shadow-sm flex justify-between items-start border hover:shadow-md transition"
                  >
                    <div>
                      <strong className="text-sm text-gray-800">{c.username}</strong>
                      <p className="text-sm mt-1 text-gray-600">{c.comment}</p>
                      <small className="text-gray-400 text-xs block mt-1">
                        {new Date(c.created_at).toLocaleString()}
                      </small>
                    </div>

                    {/* -----------------------
                        ROLE + OWNERSHIP CHECK
                       ----------------------- */}
                    {(Number(user?.id) === Number(c.user_id) || user.role === "admin") && (
                      <div className="flex gap-2">
                        <button
                          className="p-2 hover:bg-blue-100 rounded-full transition"
                          onClick={() => {
                            setEditingComment(c.id);
                            setEditText(c.comment);
                          }}
                        >
                          ✏️
                        </button>

                        <button
                          className="p-2 hover:bg-red-100 rounded-full transition"
                          onClick={() => setDeleteTarget(c.id)}
                        >
                          <FaTrash className="text-red-500" size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Add Comment */}
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                placeholder="Write a comment..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border flex-1 p-2 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
              <button
                disabled={!text.trim()}
                onClick={addComment}
                className={`px-4 py-2 rounded-lg text-white transition ${
                  text.trim()
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingComment && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center">
            <h3 className="font-bold text-lg mb-2">Edit Comment</h3>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              rows="3"
            />

            <div className="flex justify-center gap-4 mt-5">
              <button
                onClick={() => setEditingComment(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={updateComment}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px] text-center">
            <h3 className="font-bold text-lg mb-2">Delete Comment?</h3>
            <p className="text-gray-500 text-sm mb-5">
              Are you sure you want to delete this comment?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
