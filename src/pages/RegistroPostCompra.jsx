// src/pages/RegistroPostCompra.jsx

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import "./RegistroPostCompra.css";

const RegistroPostCompra = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pedidoId = location.state?.pedidoId || null;
  const datosCliente = location.state?.Cliente ?? {
    nombreCompleto: "",
    email: "",
    direccion: "",
  };

  const [nombre, setNombre] = useState(datosCliente.nombreCompleto);
  const [email, setEmail] = useState(datosCliente.email);
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setCargando(true);
        const result = await getRedirectResult(auth);
        if (result) {
          const user = result.user;
          if (pedidoId) {
            const ordenRef = doc(db, "ordenes", pedidoId);
            const nombreParaGuardar = user.displayName
              ? user.displayName
              : (datosCliente.nombreCompleto &&
                !datosCliente.nombreCompleto.includes("@")
                ? datosCliente.nombreCompleto
                : "Cliente sin nombre");

            await updateDoc(ordenRef, {
              cliente: {
                ...datosCliente,
                nombreCompleto: nombreParaGuardar,
                email: user.email,
                uid: user.uid,
              },
            });
          }
          navigate("/seguimientoorden");
        }
      } catch (error) {
        console.error("Error en el resultado de redirección:", error);
        setMensajeError(
          "Error al iniciar sesión con Google después de redirección."
        );
      } finally {
        setCargando(false);
      }
    };

    checkRedirectResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (password !== confirmarPassword) {
      setMensajeError("Las contraseñas no coinciden");
      return;
    }

    try {
      setCargando(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: nombre });

      if (pedidoId) {
        const ordenRef = doc(db, "ordenes", pedidoId);

        const nombreParaGuardar =
          nombre && !nombre.includes("@") ? nombre : "Cliente sin nombre";

        await updateDoc(ordenRef, {
          cliente: {
            ...datosCliente,
            nombreCompleto: nombreParaGuardar,
            uid: user.uid,
          },
        });
      }

      navigate("/seguimientoorden");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      setMensajeError(
        "Error al registrar. Probá con otro correo o intentá más tarde."
      );
    } finally {
      setCargando(false);
    }
  };

  const handleGoogleSignup = async () => {
    setMensajeError("");
    try {
      setCargando(true);
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
      // La respuesta se maneja en useEffect
    } catch (error) {
      console.error("Error con Google:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        const methods = await fetchSignInMethodsForEmail(auth, error.customData.email);
        setMensajeError(
          `Ya existe una cuenta con este correo registrada con: ${methods.join(
            ", "
          )}.`
        );
      } else {
        setMensajeError("No se pudo registrar con Google. Intentá más tarde.");
      }
      setCargando(false);
    }
  };

  return (
    <div className="formulario-basico">
      <h2>Crear cuenta</h2>
      {pedidoId && (
        <p className="registro-info-text">
          Falta registrarte para confirmar tu pedido!
          🐾 ¡Gracias por tu compra!
        </p>
      )}

      <button
        className="boton-google"
        onClick={handleGoogleSignup}
        disabled={cargando}
      >
        {cargando ? "Procesando..." : "Registrarse con Google"}
      </button>

      <div className="separador">o registrate con tu correo</div>

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
          {cargando ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>

      {mensajeError && <p className="mensaje-error">⚠ {mensajeError}</p>}
    </div>
  );
};

export default RegistroPostCompra;

