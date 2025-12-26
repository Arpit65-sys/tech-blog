import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import LoginRequired from "./LoginRequired";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useContext(AuthContext);
  const [showPopup, setShowPopup] = useState(false);
  
  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // If NOT logged in → Model
  if (!user) {
    return <LoginRequired onClose={() => setShowPopup(false)} />;
  }

  // If role required → check role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
