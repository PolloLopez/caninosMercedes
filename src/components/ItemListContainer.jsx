// (Componente principal que muestra los productos)
import React from "react";
import useFetchProducts from "../hooks/useFetchProducts"; // Importamos el hook 
import ProductCard from "../components/ProductCard/ProductCard"; // Importamos ProductCard
import { useCart } from "../context/CartContext"; // Importamos el hook useCart
import "./ItemListContainer.css";
 
const ItemListContainer = () => {
  const { products, loading, error } = useFetchProducts("/productos.json"); // Ruta correcta a productos.json
  const { addToCart } = useCart(); // Obtenemos la función addToCart desde el contexto

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

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
