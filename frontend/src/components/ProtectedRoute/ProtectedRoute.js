import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, isAdmin }) {
  const location = useLocation();

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (loading === false && isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
