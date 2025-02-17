//src>components>Navbar>navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import logo from "../../assets/images/logo.png";
import "./navbar.css";

const Navbar = () => {
    const { cart } = useCart(); // Obtener el carrito
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo" />
                </Link>
            </div>
            <ul>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/tutoriales">Tutoriales</Link></li>
                <li><Link to="/tienda">Productos</Link></li>
                <li><Link to="/carrito">Carrito</Link></li>
                <li><Link to="/seguimiento">Seguimiento</Link></li>
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
