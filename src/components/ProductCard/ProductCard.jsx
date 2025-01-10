import React from "react";
import "./ProductCard.css"; // Asegúrate de que la hoja de estilos esté bien importada

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.image} // Asegúrate de que los productos tengan la propiedad 'image'
        alt={product.name}
        className="product-image"
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
