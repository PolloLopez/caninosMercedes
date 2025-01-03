import React, { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext"; // Importar el hook useCart
import "./store.css";

const Store = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart(); // Desestructurar la función addToCart del contexto

  useEffect(() => {
    if (!localStorage.getItem("products")) {
      loadSampleProducts();
    }
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const loadSampleProducts = () => {
    const sampleProducts = [
      {
        id: 1,
        name: "Alimento Balanceado Canino",
        price: 1500,
        image: "https://via.placeholder.com/150",
        description: "Alimento premium para perros de todas las razas."
      },
      {
        id: 2,
        name: "Collar Antipulgas",
        price: 800,
        image: "https://via.placeholder.com/150",
        description: "Collar antipulgas de larga duración."
      },
      {
        id: 3,
        name: "Juguete para Mascotas",
        price: 500,
        image: "https://via.placeholder.com/150",
        description: "Juguete resistente para morder y jugar."
      }
    ];
    localStorage.setItem("products", JSON.stringify(sampleProducts));
  };

  return (
    <div className="store-container">
      <h1>Productos disponibles</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)} // Agregar al carrito
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
