// src/routes/ProtectedRoute.jsx

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { users, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>🌀 Cargando autenticación...</p>;

  if (!users) {
    // No está logueado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && users.role !== "admin") {
    // No es admin y se requiere admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

