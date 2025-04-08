// src/pages/Admin/Ordenes.jsx
import "./Ordenes.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "ordenes"), (snapshot) => {
      const ordenesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrdenes(ordenesData);
    });

    return () => unsubscribe();
  }, []);

  const handleEstadoChange = async (ordenId, nuevoEstado) => {
    const confirmacion = window.confirm("¿Estás seguro de cambiar el estado de la orden?");
    if (confirmacion) {
      const ordenRef = doc(db, "ordenes", ordenId);
      await updateDoc(ordenRef, { estado: nuevoEstado });
    }
  };

  const filteredOrdenes = ordenes.filter((orden) =>
    orden.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    orden.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Órdenes</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar por cliente o email"
      />
      <button onClick={() => setSearchTerm("")}>Limpiar</button>

      <ul>
        {filteredOrdenes.map((orden) => (
          <li key={orden.id}>
            <p><strong>ID:</strong> {orden.id}</p>
            <p><strong>Cliente:</strong> {orden.nombre} ({orden.email})</p>
            <p><strong>Estado:</strong>
              <select
                value={orden.estado}
                onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Preparado">Preparado</option>
                <option value="Despachado">Despachado</option>
                <option value="Entregado">Entregado</option>
              </select>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ordenes;
