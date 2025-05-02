// src/routes/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Cargando...</p>; // Para evitar errores mientras carga

  if (!currentUser) {
    // Si no está autenticado, redirige a login y guarda la página previa
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (role !== "admin") {
    // Si es desigualdad (!==) admin, lo mandamos al inicio
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

