//src>components>ProductCard>ProductCard.jsx 
import React from "react";
import "./ProductCard.css"; 

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card">
      <img
        src={product.imagen} // Asegúrate de que los productos tengan la propiedad 'image'
        alt={product.nombre} 
        className="product-image"
      />
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <div className="price">
  ${((product.precio)).toFixed(2)}
</div>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
