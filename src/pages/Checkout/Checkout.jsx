// src/pages/Checkout/Checkout.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, clearCart, totalPrice } = useCart();
  const total = totalPrice();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  const [cliente, setCliente] = useState({
    nombre: "", 
    email: "",
    telefono: "",
    ciudad: "",
    direccion: "",
  });

  const handleInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const orderRef = collection(db, "ordenes");

      const newOrder = {
        customerEmail: cliente.email,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        ciudad: cliente.ciudad,
        direccion: cliente.direccion,
        estado: "pendiente",
        fecha: new Date(),
        productos: cart.map((item) => ({
          nombre: item.nombre,
          cantidad: item.quantity ?? 1,
          precio: item.precio,
        })),
        paymentMethod: "Acuerdo con el vendedor",
        total,
      };

      console.log("Orden a guardar:", newOrder);

      const docRef = await addDoc(orderRef, newOrder);
      setOrderId(docRef.id);
      alert(`¡Pedido registrado con éxito! ID: ${docRef.id}`);

      clearCart();
      navigate("/checkout/OrdenConfirmation", { state: { orderId: docRef.id } });
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
        <input type="text" name="nombre" placeholder="Nombre completo" value={cliente.nombre} onChange={handleInputChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" value={cliente.email} onChange={handleInputChange} required />
        <input type="tel" name="telefono" placeholder="Teléfono" value={cliente.telefono} onChange={handleInputChange} required />
        <input type="text" name="ciudad" placeholder="Ciudad" value={cliente.ciudad} onChange={handleInputChange} required />
        <input type="text" name="direccion" placeholder="Dirección" value={cliente.direccion} onChange={handleInputChange} required />
        <button onClick={handlePayment} disabled={isProcessing}>{isProcessing ? "Procesando..." : "Confirmar pedido"}</button>
      </div>

      {orderId && <p className="order-confirmation">✔ Pedido generado: <strong>{orderId}</strong></p>}
      {error && <p className="checkout-error">⚠ {error}</p>}

      <p className="checkout-note">Acuerdo de pago con el vendedor</p>
    </div>
  );
};

export default Checkout;
