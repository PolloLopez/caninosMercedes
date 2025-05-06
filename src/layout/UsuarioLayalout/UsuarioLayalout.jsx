// src/layout/UsuarioLayout/UsuarioLayout.jsx

import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "./UsuarioLayout.css";

const UsuarioLayout = () => {
  const { logout } = useAuth();

  return (
    <div className="usuario-layout">
      <aside className="sidebar">
        <h2>Panel Admin 🛠️</h2>
        <nav>
          <NavLink to="/tienda">🛍️ Cargar Pedido</NavLink>
          <NavLink to="/admin/productos">📦 Productos</NavLink>
          <NavLink to="/admin/ordenes">📑 Seguimiento</NavLink>
          <button onClick={logout} className="logout">🚪 Cerrar sesión</button>
        </nav>
      </aside>
      <main className="usuario-main">
        <Outlet />
      </main>
    </div>
  );
};

export default UsuarioLayout;
