import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./navbar.css";

const Navbar = () => {
    const { cart } = useCart(); // Obtener el carrito
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/tienda">Tienda</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/tutoriales">Tutoriales</Link></li>
                {/* Verifica que cart esté definido y sea un array antes de acceder a su longitud */}
                {Array.isArray(cart) && cart.length > 0 && (
                    <li><Link to="/carrito" className="cart-icon">
                        🛒 <span className="cart-count">{cart.length}</span>
                    </Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
