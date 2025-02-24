// src>pages>Admin/>AdminOrdenes.jsx
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";

const AdminOrdenes = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user) return; // Verificamos que el usuario esté logueado

    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersData);
      } catch (error) {
        console.error("Error obteniendo órdenes:", error);
      }
    };

    fetchOrders();
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateDoc(doc(db, "orders", orderId), { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error actualizando el estado de la orden:", error);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      order.id.includes(search)
  );

  return (
    <div>
      <h2>Órdenes</h2>
      <input
        type="text"
        placeholder="Buscar por email o ID de orden"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <li key={order.id}>
              <p><strong>ID:</strong> {order.id}</p>
              <p><strong>Cliente:</strong> {order.customerEmail || "No disponible"}</p>
              <p><strong>Estado:</strong> {order.status}</p>
              <select
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                value={order.status}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En proceso</option>
                <option value="completado">Completado</option>
              </select>
            </li>
          ))
        ) : (
          <p>No se encontraron órdenes</p>
        )}
      </ul>
    </div>
  );
};

export default AdminOrdenes;
