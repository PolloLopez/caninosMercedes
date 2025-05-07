// src/pages/Checkout/Checkout.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { carrito, vaciarCarrito, totalPrecio } = useCart();
  const { currentusers } = useAuth();
  const total = totalPrecio();
  const [procesando, setProcesando] = useState(false);
  const [idOrden, setIdOrden] = useState(null);
  const [error, setError] = useState(null);

  const [cliente, setCliente] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
    ciudad: "",
    direccion: "",
  });

  useEffect(() => {
    if (currentusers) {
      setCliente((prev) => ({
        ...prev,
        email: currentusers.email,
        nombreCompleto: currentusers.displayName || "",
      }));
    }
  }, [currentusers]);

  const handleInputChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handlePago = async () => {
    setProcesando(true);
    setError(null);

    try {
      const refOrdenes = collection(db, "ordenes");

      const nuevaOrden = {
        usersId: currentusers?.uid || null,
        datosCliente: { ...cliente },
        estado: "Pendiente",
        fecha: new Date(),
        productos: carrito.map((item) => ({
          nombre: item.nombre,
          cantidad: item.cantidad ?? 1,
          precio: item.precio,
        })),
        metodoPago: "Acuerdo con el vendedor",
        total,
        historial: [
          {
            fecha: new Date().toISOString(),
            accion: "Orden creada",
            usuario: cliente.email,
          },
        ],
      };

      const docRef = await addDoc(refOrdenes, nuevaOrden);
      setIdOrden(docRef.id);
      alert(`¡Pedido registrado con éxito! ID: ${docRef.id}`);

      vaciarCarrito();
      navigate("/", { state: { orderId: docRef.id } });
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      setError(error.message);
    } finally {
      setProcesando(false);
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
          name="nombreCompleto"
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
        <input
          type="text"
          name="ciudad"
          placeholder="Ciudad"
          value={cliente.ciudad}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={cliente.direccion}
          onChange={handleInputChange}
          required
        />
        <button onClick={handlePago} disabled={procesando}>
          {procesando ? "Procesando..." : "Confirmar pedido"}
        </button>
      </div>

      {idOrden && (
        <p className="order-confirmation">
          ✔ Pedido generado: <strong>{idOrden}</strong>
        </p>
      )}
      {error && <p className="checkout-error">⚠ {error}</p>}

      <p className="checkout-note">Acuerdo de pago con el vendedor</p>
    </div>
  );
};

export default Checkout;
