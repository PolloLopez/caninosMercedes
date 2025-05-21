// src/pages/Checkout.jsx

import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { CartContext } from "@/context/CartContext";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";

import "@/assets/global.css";

const Checkout = () => {
  const { carrito, totalPrecio, vaciarCarrito } = useContext(CartContext);
  const total = totalPrecio();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [usuarioGoogleLogueado, setUsuarioGoogleLogueado] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioGoogleLogueado(true);
        if (user.displayName && !user.displayName.includes("@")) {
          setNombreCompleto(user.displayName);
        } else if (user.email) {
          setNombreCompleto(user.email.split("@")[0]);
        }
        if (user.email) setEmail(user.email);
      } else {
        setUsuarioGoogleLogueado(false);
        setNombreCompleto("");
        setEmail("");
      }
    });

    return () => unsubscribe();
  }, []);

  const obtenerNombreParaGuardar = (user, nombreFormulario) => {
    if (user?.displayName && !user.displayName.includes("@")) {
      return user.displayName;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    if (nombreFormulario && !nombreFormulario.includes("@")) {
      return nombreFormulario;
    }
    return "Cliente sin nombre";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    if (carrito.length === 0) {
      setError("El carrito está vacío. Agregá productos antes de continuar.");
      setCargando(false);
      return;
    }

    try {
      const user = auth.currentUser;
      const nombreParaGuardar = obtenerNombreParaGuardar(user, nombreCompleto);

      const nuevaOrden = {
        cliente: {
          nombreCompleto: nombreParaGuardar,
          email: email || (user ? user.email : ""),
          direccion,
          uid: user ? user.uid : null,
          role: "users",
        },
        items: carrito.map(({ id, nombre, precio, cantidad }) => ({
          id,
          nombre: nombre || "Sin nombre",
          precio: precio || 0,
          cantidad: cantidad || 1,
          subtotal: (precio || 0) * (cantidad || 1),
        })),
        total,
        estado: "pendiente",
        fecha: new Date().toISOString(),
        metodoPago: "Acuerdo con el vendedor",
      };

      const docRef = await addDoc(collection(db, "ordenes"), nuevaOrden);

      vaciarCarrito();
      setNombreCompleto("");
      setEmail("");
      setDireccion("");

      if (!user) {
        navigate("/registro-post-compra", {
          state: {
            pedidoId: docRef.id,
            Cliente: { nombreCompleto: nombreParaGuardar, email, direccion },
          },
        });
      } else {
        navigate("/seguimientoorden");
      }
    } catch (err) {
      console.error("Error al finalizar la compra:", err);
      setError("Ocurrió un error al procesar la orden. Intentá nuevamente.");
    } finally {
      setCargando(false);
    }
  };

  const handleGoogleLoginSuccess = (user) => {
    setUsuarioGoogleLogueado(true);
    if (user.displayName && !user.displayName.includes("@")) {
      setNombreCompleto(user.displayName);
    } else if (user.email) {
      setNombreCompleto(user.email.split("@")[0]);
    }
    if (user.email) setEmail(user.email);
  };

  const handleCerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="formulario-basico">
      <h2>Finalizar compra</h2>

      {!auth.currentUser && (
        <p className="mensaje-info">
          ✨ Podés registrarte o hacer la compra sin cuenta. Si ya tenés cuenta,
          iniciá sesión para guardar tu pedido en tu perfil.
        </p>
      )}

      {usuarioGoogleLogueado && (
        <div className="mensaje-info">
          <p>✅ Ya iniciaste sesión con Google 😊. Ahora completá la dirección y tocá “Confirmar compra”.</p>
          <button className="boton-secundario" onClick={handleCerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          className="campo-entrada"
          type="text"
          placeholder="Nombre completo"
          value={nombreCompleto}
          onChange={(e) => setNombreCompleto(e.target.value)}
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
          type="text"
          placeholder="Dirección de entrega"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <button className="boton-primario" type="submit" disabled={cargando}>
          {cargando ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>

      <p style={{ textAlign: "center", margin: "1rem 0" }}>O registrate con:</p>

      {!usuarioGoogleLogueado && <GoogleLoginButton onSuccess={handleGoogleLoginSuccess} />}

      {error && <p className="mensaje-error">⚠ {error}</p>}
    </div>
  );
};

export default Checkout;
