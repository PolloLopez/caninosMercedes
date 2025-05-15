// src/pages/Admin/Ordenes.jsx
//solo para los admin

import "./Ordenes.css";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroEstado, setFiltroEstado] = useState(""); // Nuevo estado para filtrar por estado
  const [ordenesExpandida, setOrdenesExpandida] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "ordenes"), orderBy("fecha", "desc")),
      (snapshot) => {
        const ordenesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        ordenesData.sort((a, b) => a.nombre?.localeCompare(b.nombre));
        setOrdenes(ordenesData);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleEstadoChange = async (ordenId, nuevoEstado) => {
    const confirmacion = window.confirm("¿Cambiar el estado de esta orden?");
    if (!confirmacion) return;
    const ordenRef = doc(db, "ordenes", ordenId);
    await updateDoc(ordenRef, { estado: nuevoEstado });
    console.log(`Estado de orden ${ordenId} actualizado a: ${nuevoEstado}`);
  };

  const toggleExpandir = (id) => {
    setOrdenesExpandida((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 🔍 Filtrado por texto + estado
  const filteredOrdenes = ordenes.filter((orden) => {
    const coincideBusqueda =
      orden.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      orden.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const coincideEstado = filtroEstado === "" || orden.estado === filtroEstado;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="ordenes-container">
      <h2>📦 Gestión de Órdenes</h2>

      <div className="buscador">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por cliente o email"
        />
        <select value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="Pendiente">🕓 Pendiente</option>
          <option value="Preparado">📦 Preparado</option>
          <option value="Despachado">🚚 Despachado</option>
          <option value="Entregado">✅ Entregado</option>
        </select>
        <button onClick={() => { setSearchTerm(""); setFiltroEstado(""); }}>Limpiar</button>
      </div>

      {filteredOrdenes.map((orden) => (
        <div key={orden.id} className="orden-card">
          <div className="orden-header">
            <div className="orden-info">
              <p><strong>ID:</strong> {orden.id}</p>
              <p><strong>Cliente:</strong> {orden.nombre} ({orden.email})</p>
              <p>
                <strong>Fecha:</strong>{" "}
                {new Date(orden.fecha.seconds * 1000).toLocaleString()}
              </p>
            </div>

            <div
              className={`estado-label ${
                orden.estado?.toLowerCase() || "pendiente"
              }`}
            >
              {orden.estado === "Pendiente" && "🕓 Pendiente"}
              {orden.estado === "Preparado" && "📦 Preparado"}
              {orden.estado === "Despachado" && "🚚 Despachado"}
              {orden.estado === "Entregado" && "✅ Entregado"}
            </div>
          </div>

          <div className="orden-body">
            <div className="estado-control">
              <select
                value={orden.estado}
                onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
              >
                <option value="Pendiente">🕓 Pendiente</option>
                <option value="Preparado">📦 Preparado</option>
                <option value="Despachado">🚚 Despachado</option>
                <option value="Entregado">✅ Entregado</option>
              </select>
            </div>

            <button
              className="ver-detalles-btn"
              onClick={() => toggleExpandir(orden.id)}
            >
              {ordenesExpandida[orden.id] ? "Ver menos" : "Ver más"}
            </button>

            {ordenesExpandida[orden.id] && (
              <div className="orden-details productos-lista">
                <h4>🛒 Productos:</h4>
                <ul>
                  {orden.items?.map((item, index) => (
                    <li key={index}>
                      <strong>{item.nombre}</strong> — {item.cantidad} x $
                      {item.precio} ={" "}
                      <strong>${item.precio * item.cantidad}</strong>
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ${orden.total}</p>
                <p><strong>Dirección:</strong> {orden.direccion}</p>
                <p><strong>Teléfono:</strong> {orden.telefono}</p>
                <p><strong>Método de pago:</strong> {orden.metodoPago || "N/A"}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ordenes;
