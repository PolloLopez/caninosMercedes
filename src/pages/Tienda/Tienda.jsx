// src/pages/Tienda/Tienda.jsx
import React from "react";
import useFetchProductos from "../../hooks/useFetchProductos";
import { useCart } from "../../context/CartContext"; // Asegúrate de importar useCart para acceder a las funciones del carrito
import TarjetaProducto from "../../components/TarjetaProducto/TarjetaProducto";
import "./Tienda.css";

const Tienda = () => {
  const { productos, cargando, error } = useFetchProductos(); // Renombramos variables a español

  const { agregarAlCarrito } = useCart(); // Función para añadir productos al carrito

  if (cargando) return <p>🌀 Cargando productos...</p>;
  if (error) return <p>🚨 Error al cargar productos</p>;

  if (productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <div className="tienda">
      <h1>🛍️ Nuestros Productos</h1>
      <div className="lista-productos">
        {productos.map((producto) => (
          <TarjetaProducto
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito} // Pasamos la función de agregar al carrito
          />
        ))}
      </div>
    </div>
  );
};

export default Tienda;
