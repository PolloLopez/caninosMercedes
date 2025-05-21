// src/pages/SeguimientoOrden.jsx
//solo para los users
import { useEffect, useState } from "react";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";
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

      const snapshot = await getDocs(collection(db, "ordenes"));
      const filtradas = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((orden) => orden.cliente?.uid === users.uid);

      setOrdenes(filtradas);
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
              <p><strong>Fecha:</strong> {orden.fecha}</p>
              <p><strong>Estado:</strong> {orden.estado}</p>
              <p><strong>Total:</strong> ${orden.total}</p>
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
