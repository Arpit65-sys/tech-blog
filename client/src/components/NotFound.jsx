import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl sm:text-8xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you are looking for does not exist or the URL is incorrect.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
}
