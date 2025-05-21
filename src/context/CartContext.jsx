// src/context/CartContext.jsx
 
import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id);
    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const aumentarCantidad = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const disminuirCantidad = (id) => {
    setCarrito(
      carrito.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  };

  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        aumentarCantidad,
        disminuirCantidad,
        totalProductos,
        totalPrecio: calcularTotal,
        clearCart: vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export {CartContext};