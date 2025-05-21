// src/components/Auth/GoogleLoginButton.jsx

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/firebase";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton = ({ onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (onSuccess) onSuccess(result.user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      aria-label="Iniciar sesión con Google"
      className="boton-primario"
      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
    >
      <FcGoogle size={20} />
      {loading ? "Cargando..." : "Iniciar sesión con Google"}
    </button>
  );
};

export default GoogleLoginButton;
