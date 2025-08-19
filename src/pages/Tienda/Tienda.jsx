// src/pages/Tienda/Tienda.jsx

import React, { useState } from "react";
import useFetchProductos from "@/hooks/useFetchProductos";
import { useCart } from "@/context/CartContext";
import Tarjeta from "@/components/Tarjeta/Tarjeta";
import "./Tienda.css";

const Tienda = () => {
  const { productos, cargando, error } = useFetchProductos();
  const { agregarAlCarrito } = useCart();
  const [searchTerm, setSearchTerm] = useState("");

  if (cargando) return <p>🌀 Cargando productos...</p>;
  if (error) return <p>🚨 Error al cargar productos</p>;
  if (!productos.length) return <p>No hay productos disponibles.</p>;

  // Filtrar productos según el término de búsqueda
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="tienda">
      <h1>🛍️ Nuestros Productos</h1>

      {/* 🔍 Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar producto..."
        className="input-busqueda"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="lista-productos">
        {productosFiltrados.map((producto) => (
          <Tarjeta
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </div>
    </div>
  );
};

export default Tienda;
