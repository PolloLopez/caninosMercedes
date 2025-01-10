import React, { createContext, useState, useContext, useEffect } from "react";
import productos from "../../public/productos.json"

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado para el carrito
  const [products, setProducts] = useState([]); // Estado para los productos

  // Cargar productos desde un archivo JSON o fuente externa
  useEffect(() => {
    console.log("Productos cargados:", productos); // Agregar un console.log para verificar los datos
    setProducts(productos); // Asigna los productos al estado
  }, []);


  const addToCart = (product) => {
    console.log("Producto agregado:", product);
    setCart((prevCart) => [...prevCart, product]); // Agregar producto al carrito
  };

  return (
    <CartContext.Provider value={{ products, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);