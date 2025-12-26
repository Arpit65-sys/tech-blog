import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";

export default function PostFooter({ postId, navigateBackHandler, likes }) {
  return (
    <div className="flex items-center justify-between border-t pt-4 mt-4">

      <LikeButton
        postId={postId}
        initialLikes={likes}
      />

      <CommentSection postId={postId} />

      <button
        onClick={navigateBackHandler}
        className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold hover:opacity-90 transition-all shadow-md"
      >
        ← Back
      </button>
    </div>
  );
}
