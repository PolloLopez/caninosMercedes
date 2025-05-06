// src/components/Navbar/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCart } from 'lucide-react'; 
import logo from '../../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { carrito } = useCart();
  const navigate = useNavigate();

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0); 

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isAdmin = user?.role === 'admin';
  const isUser = user && user?.role !== 'admin'; 

  console.log('isAdmin:', isAdmin);  
  console.log('isUser:', isUser);   

  return (
    <nav className="navbar">
  <div className="navbar-container">
    <Link to="/">
      <img src={logo} alt="logo" className="logo-navbar" />
    </Link>

    <div className="nav-links">

            {/* ✅ Carrito visible para todos los usuarios */}
            <Link to="/carrito" className="cart-link">
        <ShoppingCart size={20} />
        <span className="cart-count">{totalItems}</span>
      </Link>

      {/* ✅ Estos links se muestran solo si NO sos admin (user común o no logueado) */}
      {!isAdmin && (
        <>
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/tienda" className="nav-link">Tienda</Link>
          <Link to="/nosotros" className="nav-link">Nosotros</Link>
          <Link to="/tutoriales" className="nav-link">Tutoriales</Link>
        </>
      )}



      {/* ✅ Mostrar botón de login si NO hay usuario logueado */}
      {!user && (
        <>
        <Link to="/login" className="nav-link">Iniciar Sesión</Link>      
      
      </>
      )}


      {/* ✅ Links visibles solo si sos usuario común (logueado y NO admin) */}
      {isUser && (
        <>
          <Link to="/seguimientoorden" className="nav-link">Mis Pedidos</Link>
          <span className="user-name">User: {user?.name}</span>
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </>
      )}

      {/* ✅ Links visibles solo si sos admin */}

      {/*solo funciona tienda*/}


      {isAdmin && (
        <>
          <Link to="/admin" className="nav-link">Panel Admin</Link>
          <Link to="/tienda" className="nav-link">Cargar Pedido</Link>
          <Link to="/admin/productos" className="nav-link">Productos</Link>
          <Link to="/admin/ordenes" className="nav-link">Gestión Pedidos</Link>
          <span className="user-name">Admin: {user?.name}</span>
          <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
        </>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;
