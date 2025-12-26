import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((sec) => {
        if (sec === 1) {
          clearInterval(timer);
          navigate("/");         }
        return sec - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">🚫 Access Denied</h1>
      <p className="mt-4 text-lg font-medium text-gray-700">
        You are not authorized to view this page.
      </p>

      <p className="mt-6 text-gray-500 text-md">
        Redirecting to home in <span className="font-bold">{seconds}</span> seconds...
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go Home Now
      </button>
    </div>
  );
}
