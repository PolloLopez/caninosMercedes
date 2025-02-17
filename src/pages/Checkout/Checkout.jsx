// src/pages/Checkout/Checkout.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import "./Checkout.css"; // Importamos los estilos

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const total = location.state?.total || 0;
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  // Datos del usuario
  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
  });

  const handleInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    if (!cliente.nombre || !cliente.email || !cliente.telefono) {
      setError("Por favor, completa todos los datos.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const db = getFirestore();
      const orderRef = collection(db, "ordenes");

      const newOrder = {
        cliente, // Guardamos los datos ingresados
        total,
        status: "pendiente",
        paymentMethod: "Acuerdo con el vendedor",
        timestamp: new Date(),
      };

      const docRef = await addDoc(orderRef, newOrder);
      setOrderId(docRef.id);
      alert(`¡Pedido registrado con éxito! ID: ${docRef.id}`);

      navigate("/confirmacion", { state: { orderId: docRef.id } });
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      setError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar pedido</h2>

      <div className="checkout-resumen">
        <p><strong>Total a pagar:</strong> ${total}</p>
      </div>

      <div className="checkout-form">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={cliente.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={cliente.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={handleInputChange}
          required
        />
        
        <button onClick={handlePayment} disabled={isProcessing}>
          {isProcessing ? "Procesando..." : "Confirmar pedido"}
        </button>
      </div>

      {orderId && <p className="order-confirmation">✔ Pedido generado: <strong>{orderId}</strong></p>}
      {error && <p className="checkout-error">⚠ {error}</p>}

      <p className="checkout-note">Acuerdo de pago con el vendedor</p>
    </div>
  );
};

export default Checkout;