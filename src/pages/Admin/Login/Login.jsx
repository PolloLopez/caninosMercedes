// src/pages/Admin/Login/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import './Login.css'; 

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(correo, contraseña);
      navigate('/');
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Hubo un error al iniciar sesión. Intenta nuevamente.');
    }
  };

  return (
    <div className="contenedor-login">
      <form className="formulario-login" onSubmit={manejarEnvio}>
        <h2 className="titulo-login">Iniciar sesión</h2>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo electrónico"
          className="campo-entrada"
          required
        />
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
          className="campo-entrada"
          required
        />
        <button type="submit" className="boton-primario">Ingresar</button>
        {error && <p className="mensaje-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
