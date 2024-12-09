// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Define the type for PrivateRouteProps
interface PrivateRouteProps {
  children: JSX.Element;  // Expecting a single child element
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth(); // Get the logged-in user

  if (!user) {
    return <Navigate to="/login" />; // Redirect to login if not logged in
  }

  return children; // Render the protected component if logged in
};

export default PrivateRoute;
