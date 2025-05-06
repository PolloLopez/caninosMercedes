// src/pages/Carrito/Carrito.jsx

import React from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

const Carrito = () => {
  const {
    carrito,
    vaciarCarrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarDelCarrito,
  } = useCart();
  const navigate = useNavigate();

  const totalCompra = carrito.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  return (
    <div className="carrito-container">
      <h1>Tu Carrito </h1>
      {carrito.length === 0 ? (
        <p className="carrito-vacio">No hay productos en el carrito.</p>
      ) : (
        <div className="carrito-content">
          {carrito.map((producto) => (
            <div key={producto.id} className="carrito-producto">
              <img src={producto.imagen} alt={producto.nombre} />
              <div className="carrito-info">
                <h3>{producto.nombre}</h3>
                <p>Precio: ${producto.precio}</p>
                <div className="carrito-controles">
                  <button onClick={() => disminuirCantidad(producto.id)}>-</button>
                  <span>{producto.cantidad}</span>
                  <button onClick={() => aumentarCantidad(producto.id)}>+</button>
                </div>
                <p className="subtotal">
                  Subtotal: ${(producto.precio * producto.cantidad).toFixed(0)}
                </p>
              </div>
              <button
                className="btn-eliminar"
                onClick={() => eliminarDelCarrito(producto.id)}
              >
                Eliminar ❌
              </button>
            </div>
          ))}

          <div className="carrito-resumen">
            <h2>Total: ${totalCompra.toFixed(0)}</h2>
            <div className="carrito-acciones">
              <button
                className="btn-finalizar"
                onClick={() =>
                  navigate(`/checkout`, { state: { total: totalCompra } })
                }
              >
                Finalizar Compra
              </button>
              <button className="btn-vaciar" onClick={vaciarCarrito}>
                Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;

