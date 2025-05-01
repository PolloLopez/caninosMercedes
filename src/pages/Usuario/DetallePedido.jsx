// src/pages/Usuario/DetallePedido.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const DetallePedido = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      const db = getFirestore();
      const orderRef = doc(db, 'orders', orderId);

      try {
        const orderSnap = await getDoc(orderRef);
        if (orderSnap.exists()) {
          setOrderData(orderSnap.data());
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <div className="main-content">
      <h2>🧾 Detalle del Pedido</h2>

      {loading && <p>🔄 Cargando datos del pedido...</p>}

      {!loading && notFound && (
        <p style={{ color: 'red' }}>❌ No se encontró la orden con ID: {orderId}</p>
      )}

      {!loading && orderData && (
        <div>
          <h3>📦 Estado del pedido:</h3>
          <p><strong>Estado:</strong> {orderData.status}</p>
          <p><strong>Total:</strong> ${orderData.total}</p>
        </div>
      )}
    </div>
  );
};

export default DetallePedido;