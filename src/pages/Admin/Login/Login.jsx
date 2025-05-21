// src/pages/Admin/Login/Login.jsx
// src/pages/Admin/Login.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/global.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de login acá
  };

  return (
    <div className="formulario-basico">
      <h2 className="titulo-login">Iniciar sesión</h2>

      <form className="formulario-login" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="campo-entrada"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="campo-entrada"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="boton-primario">
          Entrar
        </button>
      </form>

      {error && <p className="mensaje-error">{error}</p>}

      <p className="login-link">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export default Login;
