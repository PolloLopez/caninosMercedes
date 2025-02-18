import React, { useState } from 'react';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

const SeguimientoOrden = () => {
  const [searchValue, setSearchValue] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setOrderData(null);

    try {
      const db = getFirestore();
      
      if (searchValue.includes("@")) {
        // 🔍 Buscar por email (requiere índice en Firestore)
        const ordersRef = collection(db, "ordenes");
        const q = query(ordersRef, where("email", "==", searchValue));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          throw new Error("No se encontraron órdenes con este email.");
        }

        // Tomamos la primera orden encontrada
        const order = querySnapshot.docs[0].data();
        setOrderData(order);

      } else {
        // 🔍 Buscar por ID de orden
        const docRef = doc(db, "ordenes", searchValue);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error("Orden no encontrada");
        }

        setOrderData(docSnap.data());
      }

    } catch (error) {
      console.error("Error al obtener la orden:", error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Seguimiento de Orden</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchValue">ID de Orden o Email:</label>
        <input
          type="text"
          id="searchValue"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit">Consultar</button>
      </form>

      {orderData && (
        <div>
          <h3>Detalles de la Orden</h3>
          <p><strong>Nombre:</strong> {orderData.nombre}</p>
          <p><strong>Email:</strong> {orderData.email}</p>
          <p><strong>Teléfono:</strong> {orderData.telefono}</p>
          <p><strong>Dirección:</strong> {orderData.direccion}, {orderData.ciudad}</p>
          <p><strong>Estado:</strong> {orderData.estado}</p>
          <p><strong>Total:</strong> ${orderData.total}</p>
          <p><strong>Método de Pago:</strong> {orderData.paymentMethod}</p>

          <h3>Productos comprados</h3>
    <ul>
      {orderData.productos && orderData.productos.map((producto, index) => (
        <li key={index}>
          {producto.nombre} - {producto.cantidad} x ${producto.precio}
        </li>
      ))}
    </ul>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SeguimientoOrden;
