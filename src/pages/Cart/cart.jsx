import React from "react";
import { useCart } from "../../context/cartContext";
import "./Cart.css"

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
                                <span>{product.name}</span> / ${product.price} - Cantidad: 
                                <button className="btn-carrito" onClick={() => decreaseQuantity(product.id)} >-</button>
                                {product.quantity}
                                <button className="btn-carrito" onClick={() => increaseQuantity(product.id)}>+</button>
                                <span>$ {product.price * product.quantity}</span>
                                <button className="btn-carrito" onClick={() => removeFromCart(product.id)}> ❌ Eliminar</button>
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