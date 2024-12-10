import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RootRedirect: React.FC = () => {
  const { user, loading } = useAuth();
  console.log("RootRedirect: Current user state:", user);

  if (loading) {
    // You can return a loading spinner or some indication that the app is waiting for the user data
    return <div>Loading...</div>; // Or some other loading indicator
  }

  if (user) {
    console.log("RootRedirect: User logged in. Redirecting to /affiliate-tournaments.");
    return <Navigate to="/dashboard" replace />;
  }

  console.warn("RootRedirect: User not logged in. Redirecting to /login.");
  return <Navigate to="/login" replace />;
};

export default RootRedirect;
