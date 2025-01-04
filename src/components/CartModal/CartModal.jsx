import React from "react";
import "./CartModal.css";

const CartModal = ({ cart, isOpen, onClose, increaseQuantity, decreaseQuantity, removeFromCart }) => {
  return (
    isOpen && (
      <div className="cart-modal-overlay" onClick={onClose}>
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <h2>Tu Carrito</h2>
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <p>{item.name}</p>
                <p>{item.quantity} x ${item.price}</p>

                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>

                <span>${item.price * item.quantity}</span> {/* Total por producto */}
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))
          ) : (
            <p>El carrito está vacío</p>
          )}
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    )
  );
};

export default CartModal;
