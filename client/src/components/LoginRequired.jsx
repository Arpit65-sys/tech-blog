import { useNavigate } from "react-router-dom";

export default function LoginRequired() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn z-50">
        <div className="bg-white/30 backdrop-blur-xl shadow-2xl border border-white/40 p-8 rounded-3xl w-[430px] text-center animate-scaleUp">
          <div className="text-4xl mb-3">🔐</div>
          <h2 className="text-2xl font-bold text-gray-900">Login Required</h2>

          <p className="mt-3 text-gray-700">
            You must login to read this full article.
          </p>

          <button
            className="mt-5 w-full bg-gradient-to-r from-indigo-600 to-blue-500 hover:opacity-90 text-white py-3 rounded-xl font-semibold transition-all shadow-lg"
            onClick={() => navigate("/auth")}
          >
            Login Now
          </button>

          <button
            className="mt-3 w-full bg-gradient-to-r from-red-600 to-red-400 hover:opacity-90 text-white py-3 rounded-xl transition-all shadow-md"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
