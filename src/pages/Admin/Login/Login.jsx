// src/pages/Admin/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import "@/assets/global.css";
import "@/pages/Registro.css";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const { users, login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (users?.role === "admin") {
      navigate("/admin/ordenes");
    } else if (users?.role === "users") {
      navigate("/seguimiento");
    }
  }, [users, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setMensajeError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      setCargando(true);
      setMensajeError("");
      await login(email, password);
    } catch (err) {
      console.error("❌ Error al iniciar sesión:", err.message);
      setMensajeError("Correo o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setCargando(true);
      setMensajeError("");
      await loginWithGoogle();
    } catch (err) {
      console.error("❌ Error al iniciar con Google:", err.message);
      setMensajeError("No se pudo iniciar con Google.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="formulario-basico">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="campo-entrada"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div style={{ position: "relative" }}>
          <input
            className="campo-entrada"
            type={mostrarPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            onClick={() => setMostrarPassword(!mostrarPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#666",
            }}
          >
            {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </span>
        </div>

        <button className="boton-primario" type="submit" disabled={cargando}>
          {cargando ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <div className="separador">o</div>

      <button
        className="boton-google"
        type="button"
        onClick={handleGoogle}
        disabled={cargando}
      >
        {cargando ? "Cargando..." : "Ingresar con Google"}
      </button>

      {mensajeError && <p className="mensaje-error">⚠ {mensajeError}</p>}

      <div className="login-link">
        <p>
          ¿No tenés cuenta? <Link to="/registro">Registrate</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
