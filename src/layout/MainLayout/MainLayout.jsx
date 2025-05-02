// src/layout/MainLayout/MainLayout.jsx
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import "@/layout/Layout.css";

const MainLayout = () => {
  const { totalProductos } = useCart(); // Usa carrito y totalProductos desde el contexto 
  const location = useLocation();

  // Ocultar solo si estamos exactamente en /carrito
  const isOnCarritoPage = location.pathname === "/carrito";

  return (
    <div className="contenedor-principal">
      <Navbar />

      {!isOnCarritoPage && (
        <NavLink to="/carrito" className="icono-carrito">
          🛒
          {totalProductos > 0 && (  // ✅ ya no es función
            <span className="contador-carrito">{totalProductos}</span>  // ✅ también corregido
          )}
        </NavLink>
      )}

      <main className="contenido-principal">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
