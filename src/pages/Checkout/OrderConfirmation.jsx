// src/pages/Checkout/OrderConfirmation.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";


const OrderConfirmation = () => {
    const { id } = useParams();

    return (
    <div className="order-confirmation">
        <h2>¡Gracias por tu compra! 🎉</h2>
        <p>Tu pedido ha sido registrado con el ID: <strong>{id}</strong></p>
        <p>Te notificaremos cuando esté en proceso de envío.</p>
        <Link to="/">Volver al inicio</Link>
    </div>
    );
};

export default OrderConfirmation;
