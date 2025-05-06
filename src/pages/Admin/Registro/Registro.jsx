// src/pages/Admin/Registro/Registro.jsx

import "./Registro.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "@/config/firebaseConfig";
import { db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardamos datos básicos en Firestore
      await setDoc(doc(db, "user", user.uid), {
        email: user.email,
        role: "user", // Por defecto se registra como usuario común
        createdAt: new Date(),
      });

      navigate("/");
    } catch (error) {
      console.error("❌ Error al registrarse:", error.code, error.message);
      setError("No se pudo completar el registro. Probá con otro correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <h2>Registrarse</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>

      <p className="login-link">
        ¿Ya tenés cuenta? <Link to="/admin/login">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default Registro;
