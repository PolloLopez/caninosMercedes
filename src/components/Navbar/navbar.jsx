import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import "./navbar.css";

const Navbar = () => {
    const { cart } = useCart(); // Obtener el carrito
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/store">Tienda</Link></li>
                <li><Link to="/cart">Carrito</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
                <li><Link to="/tutorials">Tutoriales</Link></li>
                {cart.length > 0 && ( // Mostramos el carrito solo si hay productos
                <li><Link to="/cart" className="cart-icon">
            🛒 <span className="cart-count">{cart.length}</span>
                </Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;