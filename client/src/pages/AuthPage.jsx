import { useState, useContext, useEffect } from "react";
import API from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const { login, user } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [regData, setRegData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await API.post("/auth/login", loginData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      if (err.response) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Server error, try again later.");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register-user", regData);

      alert(res.data.message || "Registration successful!");
      setActiveTab("login");

      setRegData({ name: "", username: "", email: "", password: "" }); // Clear form after successful registration
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Server error, try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white/20 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-gray/30 transition-all w-[420px]">
        {/* Tabs */}
        <div className="flex mb-6">
          {["login", "signup"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-1/2 py-2 text-lg font-semibold transition-all
                ${
                  activeTab === tab
                    ? "border-b-4 border-blue-600 text-blue-700"
                    : "border-b-2 border-gray-300 text-gray-600"
                }`}
            >
              {tab === "login" ? "Login" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* LOGIN FORM */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="space-y-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 bg-white/40 rounded-xl outline-none border border-gray/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            {errorMessage && (
              <p className="text-red-600 text-sm text-center font-semibold">
                {errorMessage}
              </p>
            )}

            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-xl font-semibold hover:opacity-90 transition">
              Login
            </button>
          </form>
        )}

        {/* SIGNUP FORM */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full p-3 bg-white/40 rounded-xl border border-gray/50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={(e) => setRegData({ ...regData, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Username"
              required
              className="w-full p-3 bg-white/40 rounded-xl border border-gray/50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={(e) =>
                setRegData({ ...regData, username: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              required
              className="w-full p-3 bg-white/40 rounded-xl border border-gray/50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={(e) =>
                setRegData({ ...regData, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full p-3 bg-white/40 rounded-xl border border-gray/50 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
              onChange={(e) =>
                setRegData({ ...regData, password: e.target.value })
              }
            />

            {errorMessage && (
              <p className="text-red-600 text-sm text-center font-semibold">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2
                ${
                  loading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90"
                }
                text-white
              `}>
              {loading && (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}

              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
