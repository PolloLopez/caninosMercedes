// components/ProductList/ProductList.jsx
import React from "react";
import ProductCard from "../ProductCard/ProductCard";


const ProductList = ({ products, addToCart }) => {
  if (products.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
