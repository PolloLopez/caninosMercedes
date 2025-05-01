// src/layout/UsuarioLayout/UsuarioLayout.jsx

import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "@/layout/Layout.css";

const UsuarioLayout = () => {
  const { logout } = useAuth();

  return (
    <div>
      <nav className="usuario-navbar">
        <ul style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
          <li>
            <Link to="/tienda">🛍️ Cargar Pedido</Link>
          </li>
          <li>
            <Link to="/admin/productos">📦 Productos</Link>
          </li>
          <li>
            <Link to="/admin/ordenes">📑 Seguimiento</Link>
          </li>
          <li>
            <button onClick={logout}>🚪 Cerrar sesión</button>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default UsuarioLayout;
