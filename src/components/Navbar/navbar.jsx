// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './navbar.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuAbierto && !event.target.closest('.navbar')) {
        cerrarMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuAbierto]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" onClick={cerrarMenu}>
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <button
        className={`hamburger ${menuAbierto ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>

      <div className={`overlay ${menuAbierto ? 'active' : ''}`}></div>

      <ul className={`nav-links ${menuAbierto ? 'open' : ''}`}>
        <li><Link to="/nosotros" onClick={cerrarMenu}>Nosotros</Link></li>
        <li><Link to="/tutoriales" onClick={cerrarMenu}>Tutoriales</Link></li>
        <li><Link to="/tienda" onClick={cerrarMenu}>Tienda</Link></li>
        <li><Link to="/carrito" onClick={cerrarMenu}>Carrito</Link></li>
        <li><Link to="/seguimiento" onClick={cerrarMenu}>Seguimiento</Link></li>
        <li><Link to="/login" onClick={cerrarMenu}>Iniciar sesión</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

