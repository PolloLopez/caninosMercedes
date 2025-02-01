import React from "react";
//import { useCart } from "../../context/CartContext"; // Importamos el hook useCart
//import ProductList from "../../components/ProductList/ProductList"; // Importamos ProductList
import ProductCard from "../../components/ProductCard/ProductCard"; // Asegúrate de que este import esté correcto

import "./tienda.css";

const Tienda = () => {
  const { products, addToCart } = useCart(); // Obtener productos y la función para agregar al carrito

  if (products.length === 0) {
    return <p>No hay productos disponibles.</p>; // Si no hay productos disponibles, mostramos un mensaje
  }

  return (
    <div className="tienda">
      <h1>Productos disponibles</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Tienda;
