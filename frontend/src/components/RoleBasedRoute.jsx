import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { token, role } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait for localStorage to load (once)
    if (token !== null && role !== null) {
      setIsReady(true);
    }
  }, [token, role]);

  if (!isReady) return null; // or return a loader/spinner

  if (!token) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" />;

  return children;
};

export default RoleBasedRoute;
