// src/pages/SeguimientoOrden.jsx
//solo para los User

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import "./SeguimientoOrden.css";

const SeguimientoOrden = () => {
  const { user, userData, loading } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [expandida, setExpandida] = useState({});
  const [confirmando, setConfirmando] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const q = query(collection(db, "ordenes"), orderBy("fecha", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordenesFiltradas = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (orden) =>
            orden.datosCliente?.email?.toLowerCase() ===
            user.email?.toLowerCase()
        );

      setOrdenes(ordenesFiltradas);
    });

    return () => unsubscribe();
  }, [user]);

  const alternarExpandida = (id) => {
    setExpandida((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const confirmarRecepcion = async (ordenId) => {
    try {
      setConfirmando(ordenId);
      const ordenRef = doc(db, "ordenes", ordenId);
      await updateDoc(ordenRef, { estado: "Entregado" });
    } catch (error) {
      console.error("Error al confirmar la recepción:", error);
    } finally {
      setConfirmando(null);
    }
  };

  const ordenesFiltradas = ordenes.filter(
    (orden) =>
      orden.id.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
      orden.estado?.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  if (loading) return <p>Cargando...</p>;
  if (!user || userData?.role === "admin")
    return <p>Acceso denegado 🚫</p>;

  return (
    <div className="seguimiento-container">
      <h2>📦 Mis Pedidos </h2>

      <div className="buscador">
        {terminoBusqueda && (
          <button onClick={() => setTerminoBusqueda("")}>Limpiar</button>
        )}
      </div>

      {ordenes.length === 0 ? (
        <p>No tenés pedidos realizados aún 😢</p>
      ) : ordenesFiltradas.length === 0 ? (
        <p>No se encontraron pdos 🧐</p>
      ) : (
        ordenesFiltradas.map((orden) => (
          <div key={orden.id} className="tarjeta-orden">
            <div className="encabezado-orden">
              <p><strong>ID:</strong> {orden.id}</p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(orden.fecha.seconds * 1000).toLocaleString()}
              </p>
              <div
                className={`estado-label ${orden.estado?.toLowerCase() || "pendiente"}`}
              >
                {orden.estado === "Pendiente" && "🕓 Pendiente"}
                {orden.estado === "Preparado" && "📦 Preparado"}
                {orden.estado === "Despachado" && "🚚 Despachado"}
                {orden.estado === "Entregado" && "✅ Entregado"}
              </div>
            </div>

            <button onClick={() => alternarExpandida(orden.id)}>
              {expandida[orden.id] ? "Ocultar detalles" : "Ver detalles"}
            </button>

            {expandida[orden.id] && (
              <div className="detalles-orden">
                <pre>{JSON.stringify(orden, null, 2)}</pre>
                {orden.estado === "Despachado" && (
                  <button
                    className="btn-recibido"
                    onClick={() => confirmarRecepcion(orden.id)}
                    disabled={confirmando === orden.id}
                  >
                    {confirmando === orden.id
                      ? "Confirmando..."
                      : "Confirmar recepción"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SeguimientoOrden;
