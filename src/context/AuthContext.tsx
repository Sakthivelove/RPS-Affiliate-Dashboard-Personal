import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure you import correctly

// Define the type for the decoded token
interface DecodedToken {
  UserId: number;
  exp?: number; // Token expiration time (optional)
}

// Define the type for the user data
interface User {
  id: number; // Corresponding to AuthId
  token: string; // The authentication token
}

// Define the type for the context state
interface AuthContextType {
  user: User | null; // User data or null if not authenticated
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Function to update user
  logout: () => void; // Logout function
  loading: boolean; // Loading state for token check
}

// Create context with a default value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for AuthContextProvider props
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  // Function to decode the token and get AuthId
  const decodeToken = (token: string): DecodedToken | null => {
    try {
      console.log("Decoding token:", token);
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  // Check for a token in localStorage on mount and set the user
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token found in localStorage:", token);

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded token:", decodedToken);

      // Check if the token is expired
      if (decodedToken && (!decodedToken.exp || decodedToken.exp * 1000 > Date.now())) {
        setUser({ id: decodedToken.UserId, token });
        console.log("User set with decoded token:", { id: decodedToken.UserId, token });
      } else {
        console.warn("Token expired or invalid. Removing token.");
        localStorage.removeItem('token'); // Remove invalid or expired token
      }
    } else {
      console.warn("No token found in localStorage.");
    }

    setLoading(false); // Set loading to false once the token check is done
  }, []);

  // Logout function to clear the user and remove the token
  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  console.log("Auth context accessed:", context);
  return context;
};
