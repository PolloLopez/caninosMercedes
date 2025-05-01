// src/components/TarjetaProducto/TarjetaProducto.jsx
import React from "react";
import "./TarjetaProducto.css";

const TarjetaProducto = ({ producto, agregarAlCarrito }) => {
  if (!producto) {
    return <div>Producto no disponible.</div>; // Fallback en caso de que el producto no esté definido
  }

  return (
    <div className="tarjeta-producto">
      <img
        className="imagen-producto"
        src={producto.imagen || "default-image.jpg"} // Imagen predeterminada en caso de que no haya imagen
        alt={producto.nombre || "Producto sin nombre"}
      />
      <h3>{producto.nombre}</h3>
      <p>{producto.descripcion}</p>
      <p>${producto.precio}</p>
      <button
        className="boton-agregar-carrito"
        onClick={() => agregarAlCarrito(producto)} // Agrega el producto al carrito
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default TarjetaProducto;
