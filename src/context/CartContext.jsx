// src/context/CartContext.jsx

import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // Agregar un producto al carrito o aumentar cantidad si ya existe
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const productoExistente = prev.find((item) => item.id === producto.id);
      if (productoExistente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (id) =>
    setCarrito((prev) => prev.filter((item) => item.id !== id));

  const vaciarCarrito = () => setCarrito([]);

  const aumentarCantidad = (id) =>
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );

  const disminuirCantidad = (id) =>
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );

  // Total de productos considerando cantidad de cada uno
  const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Total del carrito en precio
  const totalPrecio = () =>
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
        totalProductos, // para el contador en Navbar
        totalPrecio,
        clearCart: vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
