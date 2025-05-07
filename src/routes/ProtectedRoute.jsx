// src/routes/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { users, usersData, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>🌀 Cargando autenticación...</p>;

  if (!users) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!usersData || usersData.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
