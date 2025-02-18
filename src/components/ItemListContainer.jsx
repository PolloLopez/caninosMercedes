// src>components>ItemListContainer.jsx
import React from "react";
import useFetchProducts from "../hooks/useFetchProducts.js"; 
import ProductCard from "../components/ProductCard/ProductCard"; 
import { useCart } from "../context/CartContext";
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { products, loading, error } = useFetchProducts(); 
  const { addToCart } = useCart(); 

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error.message || "Ocurrió un error desconocido"}</p>;

  return (
    <div>
      <h1>Productos</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product} 
            addToCart={addToCart} // Pasamos addToCart como prop
          />
        ))}
      </div>
    </div>
  );
};

export default ItemListContainer;
