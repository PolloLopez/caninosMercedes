// src/pages/Registro.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Registro.css"; 

const Registro = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensajeError("Las contraseñas no coinciden");
      return;
    }

    try {
      setMensajeError("");
      setCargando(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: nombre });

      // Crear documento en Firestore en 'usuarios'
      const usersRef = doc(db, "usuarios", user.uid);
      await setDoc(usersRef, {
        nombreCompleto: nombre,
        email: email,
        role: "users",
      });

      navigate("/login"); // O a donde quieras redirigir después de registrar
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensajeError("Error al registrar. Probá con otro correo o intentá más tarde.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="formulario-basico">
      <h2>Registrate</h2>
      <form onSubmit={handleRegistro}>
        <input
          className="campo-entrada"
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          className="campo-entrada"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="campo-entrada"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="campo-entrada"
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          required
        />
        <button className="boton-primario" type="submit" disabled={cargando}>
          {cargando ? "Creando cuenta..." : "Crear tu cuenta"}
        </button>
      </form>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        ¿Ya tenés cuenta? <Link to="/login">Ingresá aquí</Link>
      </p>
      {mensajeError && <p className="mensaje-error">⚠ {mensajeError}</p>}
    </div>
  );
};

export default Registro;
