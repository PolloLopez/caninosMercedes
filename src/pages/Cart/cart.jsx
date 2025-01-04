import React from "react";
import { useCart } from "../../context/cartContext";

const Cart = () => {
    const { cart, clearCart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

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
                                <span>{product.name}</span> - ${product.price} - Cantidad: {product.quantity}
                                <button onClick={() => increaseQuantity(product.id)}>+</button>
                                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                <button onClick={() => removeFromCart(product.id)}>Eliminar</button>
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
