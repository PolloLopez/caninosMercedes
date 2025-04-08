
// src/components/Carrito/Carrito.jsx
import React from "react";
import "./CartModal.css";

const Carrito = ({ cart, isOpen, onClose, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    isOpen && (
      <div className="carrito-fondo" onClick={onClose}>
        <div className="carrito" onClick={(e) => e.stopPropagation()}>
          <h2 className="carrito-titulo">Tu Carrito</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="carrito-item">
                <p className="carrito-item-nombre">{item.name}</p>
                <p className="carrito-item-precio">{item.quantity} x ${item.price}</p>

                <div className="carrito-controles-cantidad">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <span className="carrito-item-total">${item.price * item.quantity}</span>
                <button className="carrito-boton-eliminar" onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))
          ) : (
            <p className="carrito-vacio">El carrito está vacío</p>
          )}
          <button className="carrito-boton-cerrar" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
};

export default Carrito;
