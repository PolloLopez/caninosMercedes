// src/pages/Admin/Login/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext"; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Limpiar error previo

    try {
      await login(email, password);
      navigate('/');  // Redirigir después del login
    } catch (err) {
      console.error('Error al iniciar sesión:', err.message);
      setError('Error al iniciar sesión. Intenta de nuevo.');  // Mostrar mensaje de error
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p>{error}</p>}  {/* Mostrar mensaje de error si ocurre */}
    </div>
  );
};

export default Login;

