// src/pages/Admin/Ordenes.jsx
//solo para los admin 

import "./Ordenes.css";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, doc, updateDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [ordenesExpandida, setOrdenesExpandida] = useState({});

  const { users, usersData, loading } = useAuth();

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

  // ⏳ Mientras carga el usuario
  if (loading) return <p>Cargando...</p>;

  // ❌ Bloquear acceso si no es admin
  const esAdmin = usersData?.role === "admin"; 
  if (!users || !esAdmin) return <p>Acceso denegado 🚫</p>;

  const filteredOrdenes = ordenes.filter((orden) =>
    orden.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orden.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <button onClick={() => setSearchTerm("")}>Limpiar</button>
      </div>

      {filteredOrdenes.map((orden) => (
        <div key={orden.id} className="orden-card">
          <div className="orden-header">
            <div className="orden-info">
              <p><strong>ID:</strong> {orden.id}</p>
              <p><strong>Cliente:</strong> {orden.nombre} ({orden.email})</p>
              <p><strong>Fecha:</strong> {new Date(orden.fecha.seconds * 1000).toLocaleString()}</p>
            </div>

            <div className={`estado-label ${orden.estado?.toLowerCase() || "pendiente"}`}>
              {orden.estado === "Pendiente" && "🕓 Pendiente"}
              {orden.estado === "Preparado" && "📦 Preparado"}
              {orden.estado === "Despachado" && "🚚 Despachado"}
              {orden.estado === "Entregado" && "✅ Entregado"}
            </div>
          </div>

          <div className="orden-body">
            <div className="orden-actions">
              <button
                onClick={() => handleEstadoChange(orden.id, "Preparado")}
                disabled={orden.estado === "Preparado"}
              >
                Preparar
              </button>
              <button
                onClick={() => handleEstadoChange(orden.id, "Despachado")}
                disabled={orden.estado === "Despachado"}
              >
                Despachar
              </button>
              <button
                onClick={() => handleEstadoChange(orden.id, "Entregado")}
                disabled={orden.estado === "Entregado"}
              >
                Entregar
              </button>
            </div>

            <button onClick={() => toggleExpandir(orden.id)}>
              {ordenesExpandida[orden.id] ? "Ver menos" : "Ver más"}
            </button>

            {ordenesExpandida[orden.id] && (
              <div className="orden-details">
                <pre>{JSON.stringify(orden, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ordenes;
