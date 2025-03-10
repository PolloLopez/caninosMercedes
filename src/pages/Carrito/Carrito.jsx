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
    <div>
      <h1>Carrito</h1>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div> 
          <h2>Productos agregados:</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className="cart-item">
                <img src={product.imagen} alt={product.nombre} width={50} />
                <span>{product.nombre}</span>  ${product.precio} - Cant.: 
                <button className="btn-carrito" onClick={() => decreaseQuantity(product.id)}>-</button>
                {product.quantity}
                <button className="btn-carrito" onClick={() => increaseQuantity(product.id)}>+</button>
                <span>$ { (product.precio * product.quantity).toFixed(0) }</span>
                <button className="btn-carrito" onClick={() => removeFromCart(product.id)}>❌ Eliminar</button>
              </li>
            ))}
          </ul>
          <div className="total-compra">
            <span>Total de la compra: ${totalCompra.toFixed(0)}</span>
          </div>

          <button onClick={() => navigate(`/checkout`, { state: { total: totalCompra } })} disabled={cart.length === 0}>
            Finalizar Compra
          </button>
          <button onClick={clearCart} className="vaciar-carrito">
            Vaciar carrito
          </button> 
        </div>
      )}
    </div>
  );
};

export default Carrito;
