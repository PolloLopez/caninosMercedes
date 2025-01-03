import React from "react";
import { useCart } from "../../context/CartContext"; // Importar el hook useCart

const Cart = () => {
  const { cart, clearCart } = useCart(); // Obtener el carrito y la función para vaciarlo

return (
    <div>
    <h1>Carrito</h1>
    {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
    ) : (
        <div>
        <h2>Productos agregados:</h2>
        <ul>
            {cart.map((product) => (
            <li key={product.id}>
                <img src={product.image} alt={product.name} width={50} />
                <span>{product.name}</span> - ${product.price}
            </li>
            ))}
        </ul>
        <button onClick={clearCart}>Vaciar carrito</button>
        </div>
    )}
    </div>
);
};

export default Cart;
