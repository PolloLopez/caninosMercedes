// src/pages/SeguimientoOrden/SeguimientoOrden.jsx 

import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SeguimientoOrden.css";

const SeguimientoOrden = () => {
  const { user } = useAuth();
  const [orderDetails, setOrderDetails] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSearch = async () => {
    if (!busqueda) {
      setError("Por favor ingresa tu nombre o correo.");
      return;
    }

    try {
      const q = query(
        collection(db, "ordenes"),
        where("userId", "==", user?.uid)
      );

      const querySnapshot = await getDocs(q);
      const coincidencias = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(pedido =>
          pedido.email?.toLowerCase() === busqueda.toLowerCase() ||
          pedido.nombre?.toLowerCase().includes(busqueda.toLowerCase())
        );

      if (coincidencias.length > 0) {
        setOrderDetails(coincidencias[0]);
        setError(null);
      } else {
        setOrderDetails(null);
        setError("No se encontró un pedido con ese nombre o correo.");
      }
    } catch (error) {
      setError("Hubo un error al recuperar el pedido.");
    }
  };

  const handleEditarPedido = () => {
    navigate("/tienda");
  };

  return (
    <div className="seguimiento-container">
      <h2>Seguimiento de Pedido</h2>

      <div className="search-container">
        <input
          type="text"
          placeholder="Ingresa tu nombre o correo"
          value={busqueda}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Buscar Pedido</button>
      </div>

      {error && <p className="error">{error}</p>}

      {orderDetails ? (
        <div className="order-details">
          <p><strong>Pedido ID:</strong> {orderDetails.id}</p>
          <p><strong>Nombre:</strong> {orderDetails.nombre}</p>
          <p><strong>Correo:</strong> {orderDetails.email}</p>
          <p><strong>Estado:</strong> {orderDetails.estado}</p>
          <p><strong>Productos:</strong></p>
          <ul>
            {orderDetails.productos.map((item, index) => (
              <li key={index}>{item.nombre} - {item.cantidad} x ${item.precio}</li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${orderDetails.total}</p>
          <button className="editar-btn" onClick={handleEditarPedido}>
            Editar Pedido
          </button>
        </div>
      ) : (
        !error && <p>Busca un pedido ingresando nombre o correo 😊</p>
      )}
    </div>
  );
};

export default SeguimientoOrden;
