// src/pages/Admin/Ordenes.jsx
// (ESTO ES PARA ADMIN)

import "./Ordenes.css";
import { useState, useEffect } from "react";
import { db } from "../../../firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../../context/AuthContext";

const Ordenes = () => {
  // Lista de órdenes traídas desde Firestore
  const [ordenes, setOrdenes] = useState([]);

  // Valor del buscador
  const [searchTerm, setSearchTerm] = useState("");

  // Control de qué orden está expandida para ver detalles
  const [ordenesExpandida, setOrdenesExpandida] = useState({});

  // Usuario autenticado
  const { user } = useAuth();

  // 🔁 Efecto para escuchar cambios en Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ordenes"), (snapshot) => {
      const ordenesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      ordenesData.sort((a, b) => a.nombre?.localeCompare(b.nombre));
      setOrdenes(ordenesData);
    });

    return () => unsubscribe(); // 🔁 Limpieza al desmontar
  }, []);

  // Actualiza el estado de una orden en Firestore
  const handleEstadoChange = async (ordenId, nuevoEstado) => {
    const confirmacion = window.confirm("¿Cambiar el estado de esta orden?");
    if (confirmacion) {
      const ordenRef = doc(db, "ordenes", ordenId);
      await updateDoc(ordenRef, { estado: nuevoEstado });
      console.log(`Estado de orden ${ordenId} actualizado a: ${nuevoEstado}`);
    }
  };

  // Alterna entre mostrar y ocultar detalles de una orden
  const toggleExpandir = (id) => {
    setOrdenesExpandida((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Si no es admin, se bloquea el acceso
  if (!user || user.role !== "admin") {
    return <p>Acceso denegado 🚫</p>;
  }

  // Filtra las órdenes según el término de búsqueda
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

      {filteredOrdenes.map((orden) => {
        console.log("Estado de orden:", orden.id, "-", orden.estado); // 🐞 Debug
        return (
          <div key={orden.id} className="orden-card">
            <div className="orden-header">
              <div className="orden-info">
                <p><strong>ID:</strong> {orden.id}</p>
                <p><strong>Cliente:</strong> {orden.nombre} ({orden.email})</p>
              </div>

              <div className={`estado-label ${orden.estado?.toLowerCase() || "pendiente"}`}>
                {orden.estado === "Pendiente" && "🕓 Pendiente"}
                {orden.estado === "Preparado" && "📦 Preparado"}
                {orden.estado === "Despachado" && "🚚 Despachado"}
                {orden.estado === "Entregado" && "✅ Entregado"}
              </div>
            </div>

            <div className="estado-control">
              <label>Cambiar estado:</label>
              <select
                value={orden.estado?.trim()}
                onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Preparado">Preparado</option>
                <option value="Despachado">Despachado</option>
                <option value="Entregado">Entregado</option>
              </select>
            </div>

            <button className="ver-detalles-btn" onClick={() => toggleExpandir(orden.id)}>
              {ordenesExpandida[orden.id] ? "Ocultar detalles" : "Ver detalles"}
            </button>

            {ordenesExpandida[orden.id] && (
              <div className="productos-lista">
                <h4>🛒 Productos:</h4>
                <ul>
                  {orden.productos.map((item, idx) => (
                    <li key={idx}>
                      {item.nombre} - {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
                    </li>
                  ))}
                </ul>
                <p><strong>Total:</strong> ${orden.total}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Ordenes;
