// src/pages/SeguimientoOrden.jsx
// solo para los users

import { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SeguimientoOrden.css";

const SeguimientoOrden = () => {
  const { users } = useAuth();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    if (users?.role === "admin") {
      navigate("/admin/ordenes");
    }
  }, [users, navigate]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      if (!users?.uid) return;

      const ordenesQuery = query(
        collection(db, "ordenes"),
        where("cliente.uid", "==", users.uid)
      );

      const snapshot = await getDocs(ordenesQuery);
      const ordenesFiltradas = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setOrdenes(ordenesFiltradas);
    };

    fetchOrdenes();
  }, [users]);

  if (!users) return <p>Cargando usuario...</p>;

  if (users?.role !== "users") {
    return <p>Acceso restringido, solo usuarios pueden ver sus órdenes.</p>;
  }

  return (
    <div className="seguimiento-container">
      <h2>Mis órdenes</h2>
      {ordenes.length === 0 ? (
        <p>No hay órdenes para mostrar.</p>
      ) : (
        <ul className="ordenes-lista">
          {ordenes.map((orden) => (
            <li key={orden.id} className="orden-item">
              <p>
                <strong>Fecha:</strong>{" "}
                {orden.fecha?.seconds
                  ? new Date(orden.fecha.seconds * 1000).toLocaleDateString()
                  : "Sin fecha"}
              </p>

              <p>
                <strong>Estado:</strong>{" "}
                <span className={`estado-label ${orden.estado?.toLowerCase()}`}>
                  {orden.estado}
                </span>
              </p>

              {orden.estado === "Despachado" && (
                <button
                  className="boton-recibido"
                  onClick={async () => {
                    const confirmacion = window.confirm(
                      "¿Confirmás que recibiste el pedido?"
                    );
                    if (!confirmacion) return;
                    const ordenRef = doc(db, "ordenes", orden.id);
                    await updateDoc(ordenRef, { estado: "Entregado" });
                    setOrdenes((prev) =>
                      prev.map((o) =>
                        o.id === orden.id ? { ...o, estado: "Entregado" } : o
                      )
                    );
                  }}
                >
                  ✅ Marcar como recibido
                </button>
              )}

              <p>
                <strong>Total:</strong> ${orden.total}
              </p>
              <details>
                <summary>Ver productos</summary>
                <ul>
                  {orden.items.map((item, idx) => (
                    <li key={idx}>
                      {item.nombre} x{item.cantidad} = ${item.subtotal}
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SeguimientoOrden;
