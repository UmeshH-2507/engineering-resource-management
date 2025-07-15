import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = loading

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // convert to true/false
  }, []);

  // Still loading — avoid flashing redirect
  if (isAuthenticated === null) return null;

  // Final decision
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
