import Logo from "../../assets/images/logo.png"; 

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-700">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1 - Branding */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src={Logo}
              alt="TechQeeda Logo"
              className="w-8 h-8 object-contain"
            />
            <h3 className="text-xl font-bold text-white">TechQeeda</h3>
          </div>

          <p className="text-sm text-gray-400 leading-relaxed">
            Discover, share and learn tech insights. A platform where curiosity
            meets innovation and creativity.
          </p>
        </div>

        {/* Column 2 - Explore */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => (window.location.href = "/about-us")}
                className="hover:text-blue-400 transition text-left"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/")}
                className="hover:text-blue-400 transition text-left"
              >
                Blogs
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "#")}
                className="hover:text-blue-400 transition text-left"
              >
                Categories
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/contact-us")}
                className="hover:text-blue-400 transition text-left"
              >
                Contact Us
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3 - Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => (window.location.href = "/faqs")}
                className="hover:text-blue-400 transition text-left"
              >
                FAQs
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/help-center")}
                className="hover:text-gray-300 transition text-left"
              >
                Help Center
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/privacy-policy")}
                className="hover:text-gray-300 transition text-left"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "/terms-and-conditions")}
                className="hover:text-gray-300 transition text-left"
              >
                Terms & Conditions
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4 - Connect */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => (window.location.href = "#")}
                className="hover:text-blue-400 transition text-left"
              >
                LinkedIn
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "#")}
                className="hover:text-blue-400 transition text-left"
              >
                Instagram
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "#")}
                className="hover:text-blue-400 transition text-left"
              >
                Twitter
              </button>
            </li>
            <li>
              <button
                onClick={() => (window.location.href = "#")}
                className="hover:text-blue-400 transition text-left"
              >
                Facebook
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-12 border-t border-gray-700 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-semibold">TechQeeda</span> — All Rights
        Reserved.
      </div>
    </footer>
  );
}
