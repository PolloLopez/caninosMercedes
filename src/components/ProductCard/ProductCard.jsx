//src>components>ProductCard>ProductCard.jsx 
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="tarjeta-producto">
      <img
        src={product.imagen}
        alt={product.nombre}
        className="tarjeta-producto__imagen"
      />
      <h3 className="tarjeta-producto__titulo">{product.nombre}</h3>
      <p className="tarjeta-producto__descripcion">{product.descripcion}</p>
      <div className="tarjeta-producto__precio">
        ${product.precio.toFixed(0)}
      </div>
      <button
        className="tarjeta-producto__boton"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
