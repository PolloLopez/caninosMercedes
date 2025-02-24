//src>pages>Admin>Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase"


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      setError("");
      try {
        await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } catch (err) {
        setError("Credenciales incorrectas");
      }
    };
  
    const handleGoogleLogin = async () => {
      try {
        await signInWithPopup(auth, provider);
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } catch (err) {
        setError("Error al iniciar sesión con Google");
      }
    };
  
    return (
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <button onClick={handleGoogleLogin} className="google-btn">Iniciar con Google</button>
      </div>
    );
  };
  
  export default Login;
  