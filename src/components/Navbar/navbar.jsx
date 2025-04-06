// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import logo from "../../assets/images/logo.png";
import "./navbar.css";

const Navbar = () => {
  const { cart } = useCart();
  const { currentUser, role, userName } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isAdmin = role === "admin";

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <ul>
        {/* Usuario NO logueado */}
        {!currentUser && (
          <>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/tutoriales">Tutoriales</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/seguimiento">Seguimiento</Link></li>
            <li><Link to="/login">Iniciar sesión</Link></li>
          </>
        )}

        {/* Usuario logueado ADMIN */}
        {currentUser && isAdmin && (
          <>
            <li><Link to="/tienda">Tienda</Link></li>
            <li>
              <Link to="/admin" className="admin-link">
                <span className="crown">👑</span> Panel de Administrador
              </Link>
            </li>
            <li className="admin-name">Bienvenido, Admin {userName} 👋</li>
            <li>
              <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </li>
          </>
        )}

        {/* Usuario logueado COMÚN */}
        {currentUser && !isAdmin && (
          <>
            <li><Link to="/tienda">Tienda</Link></li>
            <li><Link to="/seguimiento">Seguimiento</Link></li>
            <li className="admin-name">¡Hola, {userName} 🐶!</li>

            <li>
              <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
