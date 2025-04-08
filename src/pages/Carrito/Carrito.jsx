// src/pages/Carrito/Carrito.jsx

import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

const Carrito = () => {
  const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalCompra = cart.reduce((acc, product) => acc + product.precio * product.quantity, 0);

  return (
    <div className="carrito-container">
      <h1>Tu Carrito 🛒</h1>
      {cart.length === 0 ? (
        <p className="carrito-vacio">No hay productos en el carrito.</p>
      ) : (
        <div className="carrito-content">
          {cart.map((product) => (
            <div key={product.id} className="carrito-producto">
              <img src={product.imagen} alt={product.nombre} />
              <div className="carrito-info">
                <h3>{product.nombre}</h3>
                <p>Precio: ${product.precio}</p>
                <div className="carrito-controles">
                  <button onClick={() => decreaseQuantity(product.id)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)}>+</button>
                </div>
                <p className="subtotal">Subtotal: ${ (product.precio * product.quantity).toFixed(0) }</p>
              </div>
              <button className="btn-eliminar" onClick={() => removeFromCart(product.id)}>Eliminar ❌</button>
            </div>
          ))}

          <div className="carrito-resumen">
            <h2>Total: ${totalCompra.toFixed(0)}</h2>
            <div className="carrito-acciones">
              <button className="btn-finalizar" onClick={() => navigate(`/checkout`, { state: { total: totalCompra } })}>
                Finalizar Compra
              </button>
              <button className="btn-vaciar" onClick={clearCart}>
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
