import React from "react";
import { useCart } from "../../context/CartContext";
import "./Carrito.css";

const Carrito = () => {
  const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  // Calcular el total de la compra
  const totalCompra = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

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
                <img src={product.image} alt={product.name} width={50} />
                <span>{product.name}</span> / ${product.price} - Cantidad: 
                <button
                  className="btn-carrito"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  -
                </button>
                {product.quantity}
                <button
                  className="btn-carrito"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
                <span>$ {product.price * product.quantity}</span>
                <button
                  className="btn-carrito"
                  onClick={() => removeFromCart(product.id)}
                >
                  ❌ Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div className="total-compra">
            <span>Total de la compra: ${totalCompra}</span>
          </div>
          <button onClick={clearCart} className="vaciar-carrito">
            Vaciar carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrito;
