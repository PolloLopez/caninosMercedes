import React, { createContext, useContext, useState } from "react";

// Creación del contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto al carrito o incrementar cantidad si ya existe
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Aumentar cantidad de un producto
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

// Disminuir cantidad de un producto o eliminar si la cantidad es 1
const decreaseQuantity = (id) => {
  const updatedCart = cart.map((item) =>
    item.id === id
      ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
      : item
  );

  // Filtrar productos con cantidad mayor a 0
  const filteredCart = updatedCart.filter(item => item.quantity > 0);

  setCart(filteredCart);
};

  // Eliminar producto del carrito
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el contexto del carrito
export const useCart = () => useContext(CartContext);
