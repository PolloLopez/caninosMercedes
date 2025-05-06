
// src/components/Tarjeta/Tarjeta.jsx
import React from "react";
import "./Tarjeta.css";

const Tarjeta = ({ producto, agregarAlCarrito }) => {
  const { nombre, descripcion, precio, imagen } = producto;

  return (
    <div className="tarjeta-producto">
      <img src={imagen} alt={`Imagen de ${nombre}`} className="imagen-producto" />
      <h3>{nombre}</h3>
      <p>{descripcion}</p>
      <p className="precio">💲{precio}</p>
      <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
    </div>
  );
};

export default Tarjeta;


