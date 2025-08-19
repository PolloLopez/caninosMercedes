// src/pages/SeguimientoOrden/SeguimientoOrden.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/config/firebaseConfig";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import "./SeguimientoOrden.css";

const SeguimientoOrden = () => {
  const { users } = useAuth();
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!users) return;

    const fetchOrdenes = async () => {
      try {
        const ordenesRef = collection(db, "ordenes");
        const q = query(
          ordenesRef,
          where("userId", "==", users.uid),
          //orderBy("fecha", "desc") // ordena de más nuevo a más viejo
        );

        const snapshot = await getDocs(q);
        const ordenesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrdenes(ordenesData);
      } catch (error) {
        console.error("Error al obtener órdenes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdenes();
  }, [users]);

  const marcarComoRecibida = async (id) => {
    try {
      const ordenRef = doc(db, "ordenes", id);
      await updateDoc(ordenRef, { estado: "Recibida" });

      setOrdenes((prev) =>
        prev.map((orden) =>
          orden.id === id ? { ...orden, estado: "Recibida" } : orden
        )
      );
    } catch (error) {
      console.error("Error al actualizar orden:", error);
    }
  };

  if (loading) return <p className="mensaje">Cargando pedidos...</p>;

  return (
    <div className="seguimiento-container">
      <h2>Mis Pedidos</h2>
      {ordenes.length === 0 ? (
        <p className="mensaje">No hay pedidos registrados para este usuario.</p>
      ) : (
        ordenes.map((orden) => (
          <div key={orden.id} className="orden-card">
            <h3>Pedido #{orden.id}</h3>
            <p>
              <strong>Fecha:</strong>{" "}
              {orden.fecha?.toDate
                ? orden.fecha.toDate().toLocaleString()
                : "Sin fecha"}
            </p>
            <p>
              <strong>Estado:</strong> {orden.estado}
            </p>
            <p>
              <strong>Total:</strong> ${orden.total}
            </p>
            <h4>Productos:</h4>
            <ul>
              {orden.items?.map((item, idx) => (
                <li key={idx}>
                  {item.nombre} x {item.cantidad} — ${item.precio}
                </li>
              ))}
            </ul>

            {orden.estado !== "Recibida" && (
              <button
                className="boton-recibido"
                onClick={() => marcarComoRecibida(orden.id)}
              >
                Marcar como Recibida
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default SeguimientoOrden;
