import React from "react";
import { Navigate, Outlet } from "react-router-dom"; // Import Outlet
import { useAuth } from "../context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth(); // Get the user and loading state from the context
  console.log("ProtectedRoute: Current user state:", user);

  if (loading) {
    // Wait for the loading state to finish before rendering or redirecting
    return <div>Loading...</div>; // You can show a loading spinner here
  }

  if (!user) {
    console.warn("ProtectedRoute: User not authenticated. Redirecting to /login.");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: User authenticated. Rendering protected content.");
  return <Outlet />;
};

export default ProtectedRoute;
