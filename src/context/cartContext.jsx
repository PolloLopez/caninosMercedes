import React, { createContext, useState, useContext } from "react";

// Crear el contexto para el carrito
const CartContext = createContext();

// Hook para utilizar el contexto
export const useCart = () => {
  return useContext(CartContext);
};

// Proveedor del carrito
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Función para agregar productos al carrito con cantidad personalizada
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // Si el producto ya existe, incrementa la cantidad
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Si el producto no existe, lo agrega con la cantidad inicial
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función para aumentar la cantidad de un producto
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Función para disminuir la cantidad de un producto
const decreaseQuantity = (productId) => {
  setCart((prevCart) => {
    const product = prevCart.find((item) => item.id === productId);
    
    if (product && product.quantity === 1) {
      // Si la cantidad es 1, eliminar el producto
      removeFromCart(productId);
      return prevCart;
    }

    // Si la cantidad es mayor que 1, disminuirla
    return prevCart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  });
};
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
