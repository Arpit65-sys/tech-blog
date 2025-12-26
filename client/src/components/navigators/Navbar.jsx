import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/40 backdrop-blur-lg border-b border-white/10 text-white">
      
      <div className="mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg sm:text-xl"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="TechQeeda" className="h-7 sm:h-8" />
          <span className="font-extrabold">
            TechQeeda
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link to="/" className="hover:text-[15px] transition">Home</Link>
          <Link to="/contact-us" className="hover:text-[15px] transition">Contact Us</Link>

          {!user ? (
            <Link
              to="/auth"
              className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-xl shadow-md"
            >
              Login / Sign Up
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="hover:text-[15px] transition">Dashboard</Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin/contact-queries"
                  className="hover:text-[15px] transition"
                >
                  Contact Queries
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-xl shadow-md"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "×" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900/80 backdrop-blur-lg border-t border-white/10 px-4 py-4 flex flex-col gap-4 text-base sm:text-lg">
          
          <Link to="/" className="hover:text-[15px ] transition" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/contact-us" className="hover:text-[15px] transition" onClick={() => setMenuOpen(false)}>
            Contact Us
          </Link>

          {user && (
            <Link to="/dashboard" className="hover:text-[15px] transition" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin/contact-queries"
              className="hover:text-[15px] transition"
              onClick={() => setMenuOpen(false)}
            >
              Contact Queries
            </Link>
          )}

          {!user ? (
            <Link
              to="/auth"
              className="text-center bg-indigo-600 hover:bg-indigo-500 transition px-3 py-2 rounded-xl shadow-md text-sm sm:text-base"
              onClick={() => setMenuOpen(false)}
            >
              Login / Sign Up
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 transition px-3 py-2 rounded-xl shadow-md text-sm sm:text-base"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
