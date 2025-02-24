// src>pages>SeguimientoOrden.jsx
// src/pages/SeguimientoOrden.jsx
import { useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const SeguimientoOrden = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const foundOrders = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (order) =>
            order.customerEmail?.toLowerCase() === search.toLowerCase() ||
            order.id === search
        );

      setOrders(foundOrders);
    } catch (error) {
      console.error("Error buscando la orden:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Seguimiento de Orden</h2>
      <input
        type="text"
        placeholder="Ingrese su email o ID de orden"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Buscando..." : "Buscar"}
      </button>

      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>Email:</strong> {order.customerEmail || "No disponible"}</p>
              <p><strong>Estado:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontraron órdenes</p>
      )}
    </div>
  );
};

export default SeguimientoOrden;
