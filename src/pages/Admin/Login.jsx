// src/pages/Admin/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // obtener el rol del usuario desde Firestore
      const userRef = doc(db, "user", user.uid); // Asegurate que la colección se llame "user"
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        const userRole = userData.role || "user";
        console.log("Datos del usuario en Firestore:", userData);

        // navegación según rol
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("No se encontraron datos de usuario.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
