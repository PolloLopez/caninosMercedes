// src/components/Navbar/Navbar.jsx

import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { carrito } = useCart();
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    await logout();
    navigate('/');
    setMenuAbierto(false);
  };

  const primerNombre = (nombreCompleto) => {
    if (!nombreCompleto) return '';
    return nombreCompleto.split(' ')[0];
  };

  const manejarClickLink = () => {
    setMenuAbierto(false);
  };

  const cantidadProductos = Array.isArray(carrito) ? carrito.length : 0;

  return (
    <nav className="barra-navegacion">
      <div className="contenedor-navegacion">
        <NavLink to="/" className="logo" onClick={manejarClickLink}>
          Caninos 🐶
        </NavLink>

        <button
          className="boton-hamburguesa"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir o cerrar menú"
        >
          {menuAbierto ? '❌' : '☰'}
        </button>

        <div className={`enlaces-navegacion ${menuAbierto ? 'abierto' : ''}`}>

          <NavLink to="/" onClick={manejarClickLink}>Inicio</NavLink>

          {/* ADMIN */}
          {user && user.role === 'admin' ? (
            <>
              <NavLink to="/tienda" onClick={manejarClickLink}>Cargar Pedido</NavLink>
              <NavLink to="/admin/productos" onClick={manejarClickLink}>Productos</NavLink>
              <NavLink to="/admin/ordenes" onClick={manejarClickLink}>Seguimiento Pedidos</NavLink>
              <span className="usuario-nav">👤 {primerNombre(user.name)}</span>
              <button className="boton-logout" onClick={cerrarSesion}>Cerrar sesión</button>
            </>
          ) : user ? (
            // USUARIO COMÚN
            <>
            <NavLink to="/" onClick={manejarClickLink}>Inicio</NavLink>
              <NavLink to="/tienda" onClick={manejarClickLink}>Tienda</NavLink>
              <NavLink to="/seguimiento" onClick={manejarClickLink}>Seguimiento</NavLink>
              <span className="usuario-nav">👤 {primerNombre(user.name)}</span>
              <button className="boton-logout" onClick={cerrarSesion}>Cerrar sesión</button>
            </>
          ) : (
            // NO LOGUEADO
            <>
              <NavLink to="/tienda" onClick={manejarClickLink}>Tienda</NavLink>
              <NavLink to="/tutoriales" onClick={manejarClickLink}>Tutoriales</NavLink>
              <NavLink to="/nosotros" onClick={manejarClickLink}>Nosotros</NavLink>
              <NavLink to="/login" onClick={manejarClickLink}>Iniciar sesión</NavLink>
            </>
          )}
        </div>

        <NavLink to="/carrito" className="icono-carrito" onClick={manejarClickLink}>
          🛒
          {cantidadProductos > 0 && <span className="contador-carrito">{cantidadProductos}</span>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
