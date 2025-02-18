// src/pages/Checkout/Checkout.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {  useCart } from "../../context/CartContext";
import "./Checkout.css"; // Importamos los estilos

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart, totalPrice } = useCart(); // Obtener el carrito
  const total = totalPrice(); // Llamar la función para obtener el total real
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);

  // Datos del usuario
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
      const db = getFirestore();
      const orderRef = collection(db, "ordenes");

      const newOrder = {
        email: cliente.email,
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        ciudad: cliente.ciudad,
        direccion: cliente.direccion,
        estado: "pendiente",
        fecha: new Date(),
        productos: cart.map((item) => ({
        nombre: item.nombre,
        cantidad: item.quantity ?? 1, // Si cantidad es undefined, asigna 1 por defecto
        precio: item.precio,
        })),
        paymentMethod: "Acuerdo con el vendedor",
        total,
      };
      
      // 🔍 Verificar qué datos se están enviando
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