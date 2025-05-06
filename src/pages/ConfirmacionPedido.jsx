// src/pages/ConfirmacionPedido.jsx

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ConfirmacionPedido.css";

const ConfirmacionPedido = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/tienda");
    }, 5000); // Redirige a la tienda después de 5 segundos

    return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
  }, [navigate]);

  return (
    <div className="confirmacion-container">
      <h2>¡Gracias por tu compra!</h2>
      <p>Tu pedido se ha recibido correctamente. Serás redirigido a la tienda en breve.</p>
      <a href="/tienda">Volver a la tienda</a>
    </div>
  );
};

export default ConfirmacionPedido;
