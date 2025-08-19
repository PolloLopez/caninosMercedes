// src/pages/Checkout/Checkout.jsx
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { CartContext } from "@/context/CartContext";
import GoogleLoginButton from "@/components/Auth/GoogleLoginButton";
import "@/assets/global.css";

const Checkout = () => {
  const { carrito, totalPrecio, vaciarCarrito } = useContext(CartContext);
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");             // ✅ NUEVO (mejor búsqueda/etiquetado)
  const [telefono, setTelefono] = useState("");         // ✅ NUEVO (contacto/seguimiento)
  const [metodoPago, setMetodoPago] = useState("efectivo"); // ✅ NUEVO
  const [refTransferencia, setRefTransferencia] = useState(""); // ✅ NUEVO (opcional)

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [usuarioGoogleLogueado, setUsuarioGoogleLogueado] = useState(false);
  const navigate = useNavigate();

  // Autocompleta datos si está logueado
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

  // Mantengo tu helper
  const obtenerNombreParaGuardar = (user, nombreFormulario) => {
    if (user?.displayName && !user.displayName.includes("@")) return user.displayName;
    if (user?.email) return user.email.split("@")[0];
    if (nombreFormulario && !nombreFormulario.includes("@")) return nombreFormulario;
    return "Cliente sin nombre";
  };

  // ✅ Normaliza ítems con descuentos (si existen en el carrito)
  const mapearItemsConDescuentos = (items) => {
    return items.map((it) => {
      const precio = Number(it.precio) || 0;
      const cantidad = Number(it.cantidad) || 1;

      const descPct = Number(it.descuentoPct) || 0;       // ej. 10 = 10%
      const descMonto = Number(it.descuentoMonto) || 0;   // ej. $500

      const subtotalBruto = precio * cantidad;
      const descuentoPorPct = (subtotalBruto * descPct) / 100;
      const descuentoAplicado = Math.min(subtotalBruto, descuentoPorPct + descMonto);
      const subtotalFinal = Math.max(0, subtotalBruto - descuentoAplicado);

      return {
        id: it.id,
        nombre: it.nombre || "Sin nombre",
        tipo: it.tipo || "producto", // o "servicio" si lo enviás así en el carrito
        precio,
        cantidad,
        descuentoPct: descPct,
        descuentoMonto: descMonto,
        subtotalBruto,
        descuentoAplicado,
        subtotal: subtotalFinal,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError("");

    if (carrito.length === 0) {
      setError("El carrito está vacío. Agregá productos/servicios para continuar.");
      setCargando(false);
      return;
    }

    try {
      const user = auth.currentUser;
      const nombreParaGuardar = obtenerNombreParaGuardar(user, nombreCompleto);

      // ✅ Ítems normalizados con descuentos
      const items = mapearItemsConDescuentos(carrito);
      const total = items.reduce((acc, it) => acc + it.subtotal, 0);
      const descuentosTotales = items.reduce((acc, it) => acc + it.descuentoAplicado, 0);

      // ✅ Orden unificada/escalable
      const nuevaOrden = {
        cliente: {
          nombreCompleto: nombreParaGuardar,
          email: email || (user ? user.email : ""),
          telefono: telefono || "",
          direccion,
          ciudad,
          uid: user ? user.uid : null,
          role: "users",
        },
        items,
        total,
        descuentosTotales,   // ✅ útil para reportes
        metodoPago,          // "efectivo" | "transferencia" | "mercadopago"(futuro)
        pagoManual: metodoPago === "transferencia" ? { referencia: refTransferencia || "" } : null, // ✅ guardo dato opcional
        estado: "pendiente", // pendiente | en camino | entregado | finalizado
        fecha: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "ordenes"), nuevaOrden);

      // limpio
      vaciarCarrito();
      setNombreCompleto("");
      setEmail("");
      setTelefono("");
      setDireccion("");
      setCiudad("");
      setMetodoPago("efectivo");
      setRefTransferencia("");

      // ✅ Navegación
      if (!user) {
        // Tu flujo original: pedir registro post-compra
        navigate("/registro-post-compra", {
          state: {
            pedidoId: docRef.id,
            Cliente: { nombreCompleto: nombreParaGuardar, email, direccion, ciudad, telefono },
          },
        });
      } else {
        // Si ya está logueado, muestro la confirmación con el ID
        navigate(`/order-confirmation/${docRef.id}`);
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
          <p>✅ Ya iniciaste sesión con Google 😊. Completá los datos y “Confirmar compra”.</p>
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
          type="tel"
          placeholder="Teléfono (opcional)"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
        <input
          className="campo-entrada"
          type="text"
          placeholder="Dirección de entrega"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />
        <input
          className="campo-entrada"
          type="text"
          placeholder="Ciudad"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
        />

        {/* ✅ Método de pago */}
        <label style={{ marginTop: ".75rem", display: "block" }}>Método de pago</label>
        <select
          className="campo-entrada"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="efectivo">Efectivo</option>
          <option value="transferencia">Transferencia</option>
          <option value="mercadopago" disabled>MercadoPago (próximamente)</option>
        </select>

        {/* ✅ Dato adicional si es transferencia */}
        {metodoPago === "transferencia" && (
          <input
            className="campo-entrada"
            type="text"
            placeholder="Referencia de transferencia (opcional)"
            value={refTransferencia}
            onChange={(e) => setRefTransferencia(e.target.value)}
          />
        )}

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
