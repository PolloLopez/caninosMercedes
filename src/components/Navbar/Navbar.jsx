// src/components/Navbar/Navbar.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { users, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = users?.role === 'admin';
  const isUser = users && users?.role !== 'admin';

  const toggleMenu = () => {
    setMenuAbierto(prev => {
      document.body.classList.toggle('menu-abierto', !prev);
      return !prev;
    });
  };
  
  const cerrarMenu = () => {
    document.body.classList.remove('menu-abierto');
    setMenuAbierto(false);
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" onClick={cerrarMenu}>
          <img src={logo} alt="logo" className="logo-navbar" />
        </Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          {menuAbierto ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className={`nav-links ${menuAbierto ? 'active' : ''}`}>
          <Link to="/carrito" className="cart-link" onClick={cerrarMenu}>
            <ShoppingCart size={20} />
            <span className="cart-count">{totalItems}</span>
          </Link>

          {!isAdmin && (
            <>
              <Link to="/" className="nav-link" onClick={cerrarMenu}>Inicio</Link>
              <Link to="/tienda" className="nav-link" onClick={cerrarMenu}>Tienda</Link>
              <Link to="/nosotros" className="nav-link" onClick={cerrarMenu}>Nosotros</Link>
              <Link to="/tutoriales" className="nav-link" onClick={cerrarMenu}>Tutoriales</Link>
            </>
          )}

          {!users && (
            <Link to="/login" className="nav-link" onClick={cerrarMenu}>Entrar</Link>
          )}

          {isUser && (
            <>
              <Link to="/seguimientoorden" className="nav-link" onClick={cerrarMenu}>Mis Pedidos</Link>
              <span className="users-name">{users?.nombreCompleto}</span>
              <button onClick={() => { handleLogout(); cerrarMenu(); }} className="btn-salir">Salir</button>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin" className="nav-link" onClick={cerrarMenu}>Administrador</Link>
              <Link to="/tienda" className="nav-link" onClick={cerrarMenu}>Cargar Pedido</Link>
              <Link to="/admin/ordenes" className="nav-link" onClick={cerrarMenu}>Ver Pedidos</Link>
              <Link to="/admin/productos" className="nav-link" onClick={cerrarMenu}>Productos</Link>
              <span className="users-name">{users?.nombreCompleto}</span>
              <button onClick={() => { handleLogout(); cerrarMenu(); }} className="btn-salir">Salir</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

