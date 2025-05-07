// src/components/Navbar/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react'; 
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { users, logout } = useAuth();
  const { carrito } = useCart();
  const navigate = useNavigate();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = users?.role === 'admin';
  const isusers = users && users?.role !== 'admin';  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo-navbar" />
        </Link>

        <div className="nav-links">
          <Link to="/carrito" className="cart-link">
            <ShoppingCart size={20} />
            <span className="cart-count">{totalItems}</span>
          </Link>

          {!isAdmin && (
            <>
              <Link to="/" className="nav-link">Inicio</Link>
              <Link to="/tienda" className="nav-link">Tienda</Link>
              <Link to="/nosotros" className="nav-link">Nosotros</Link>
              <Link to="/tutoriales" className="nav-link">Tutoriales</Link>
            </>
          )}

          {!users && (
            <>
              <Link to="/login" className="nav-link">Entrar</Link>      
            </>
          )}

          {isusers && (
            <>
              <Link to="/seguimientoorden" className="nav-link">Mis Pedidos</Link>
              <span className="users-name">{users?.nombreCompleto}</span>
              <button onClick={handleLogout} className="btn-salir">Salir</button>
            </>
          )}

          {isAdmin && (
            <>
              <Link to="/admin" className="nav-link">Panel Admin</Link>
              <Link to="/tienda" className="nav-link">Nuevo Pedido</Link>
              <Link to="/admin/productos" className="nav-link">Productos</Link>
              <Link to="/admin/ordenes" className="nav-link">Ver Pedidos</Link>
              <span className="users-name">{users?.nombreCompleto}</span>
              <button onClick={handleLogout} className="btn-salir">Salir</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
