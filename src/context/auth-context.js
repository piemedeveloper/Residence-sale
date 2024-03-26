import React, { createContext, useState, useEffect } from "react";
import { getToken } from "../hooks/user-token";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getToken();
      setIsAuthenticated(!!token);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {isAuthenticated === null ? (
        <div>Loading...</div> // Render a loader while checking authentication status
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
