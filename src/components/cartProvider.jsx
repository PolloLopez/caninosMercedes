import React from "react";
import { useCart } from "../../context/cartContext"; // Usar el hook de contexto
import CartModal from "../../components/CartModal/CartModal";
import Toast from "../../components/Toast/Toast";
import "./Cart.css";

const Cart = () => {
  const {
    cart,
    clearCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getTotal,
  } = useCart();
  const [toastMessage, setToastMessage] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage("Producto agregado al carrito");
  };
  
  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setToastMessage("Producto eliminado del carrito");
  };

  const sortedCart = [...cart].sort((a, b) => a.name.localeCompare(b.name)); // Ordenar por nombre
  // O para ordenar por precio
  const sortedCartByPrice = [...cart].sort((a, b) => a.price - b.price);
  
  
  return (
    <div className="cart-container">
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
                <span>{product.name}</span> / ${product.price}
                <div className="quantity-controls">
                  <button onClick={() => decreaseQuantity(product.id)}>
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button onClick={() => increaseQuantity(product.id)}>
                    +
                  </button>
                </div>
                <span>${product.price * product.quantity}</span>
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <p>
            <strong>Total: ${getTotal()}</strong>
          </p>
          <button onClick={clearCart} className="vaciar-carrito">
  Vaciar carrito
</button>
        </div>
      )}

      {/* Muestra el Toast */}
      <Toast message={toastMessage} />

      {/* Muestra el CartModal */}
      <CartModal
        cart={cart}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
};

export { CartProvider, useCart };
