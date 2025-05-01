// components/ProductList/ProductList.jsx
import "./ProductList.css";
import React from "react";
import TarjetaProducto from "../../components/TarjetaProducto/TarjetaProducto";


const ProductList = ({ products, addToCart }) => {
  if (products.length === 0) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <TarjetaProducto
          key={product.id}
          product={product}
          addToCart={addToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
