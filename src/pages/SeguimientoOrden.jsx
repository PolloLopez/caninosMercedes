// src/pages/SeguimientoOrden.jsx
import React, { useState } from 'react';

const SeguimientoOrden = () => {
  const [orderId, setOrderId] = useState('');
  const [orderStatus, setOrderStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí deberías hacer una llamada para obtener el estado del pedido, como desde una base de datos.
    // Por ejemplo:
    const response = await fetch(`/api/ordenes/${orderId}`);
    const data = await response.json();
    setOrderStatus(data.status);
  };

  return (
    <div>
      <h2>Seguimiento de Orden</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="orderId">ID de Orden:</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button type="submit">Consultar</button>
      </form>

      {orderStatus && <p>Estado de la Orden: {orderStatus}</p>}
    </div>
  );
};

export default SeguimientoOrden;
