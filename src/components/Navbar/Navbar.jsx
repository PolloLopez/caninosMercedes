// src/components/Navbar/Navbar.jsx

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalProductos } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [shake, setShake] = useState(false);

  const prevTotalRef = useRef(totalProductos);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  // Animación "shake" solo si se agregan productos nuevos
  useEffect(() => {
    if (totalProductos > prevTotalRef.current) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 400);
      return () => clearTimeout(timer);
    }
    prevTotalRef.current = totalProductos;
  }, [totalProductos]);

  // Render de links de navegación
  const renderLinks = (mobile = false) => (
    <>
      <li><Link to="/carrito" className={`cart-link ${shake ? "cart-shake" : ""}`} onClick={mobile ? toggleMenu : undefined}>🛒{totalProductos > 0 && <span className="cart-count">{totalProductos}</span>}</Link></li>
      <li><Link to="/" onClick={mobile ? toggleMenu : undefined}>Inicio</Link></li>
      <li><Link to="/tienda" onClick={mobile ? toggleMenu : undefined}>Tienda</Link></li>
      <li><Link to="/tutoriales" onClick={mobile ? toggleMenu : undefined}>Tutoriales</Link></li>
      <li><Link to="/nosotros" onClick={mobile ? toggleMenu : undefined}>Nosotros</Link></li>
      <li><Link to="/seguimiento" className="btn-seguimiento" onClick={mobile ? toggleMenu : undefined}>📦 Seguimiento {user?.tienePedidosPendientes && <span className="badge-pendiente"></span>}</Link></li>
      {user && (
        <>
          {user.email === "caninosmercedes@gmail.com" && (
            <li><Link to="/admin" onClick={mobile ? toggleMenu : undefined}>Admin</Link></li>
          )}
          <li>
            <button onClick={logout} className="btn-logout">Cerrar sesión</button>
          </li>
        </>
      )}

      {!user && (
        <li><Link to="/login" onClick={mobile ? toggleMenu : undefined}>Iniciar Sesión</Link></li>
      )}


    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🐶 Caninos Mercedes</Link>

        {/* Menú Desktop */}
        <ul className="nav-links">{renderLinks()}</ul>

        {/* Botón Hamburguesa (Mobile) */}
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>

      {/* Menú Mobile */}
      {menuAbierto && <ul className="nav-links active">{renderLinks(true)}</ul>}
    </nav>
  );
};

export default Navbar;
