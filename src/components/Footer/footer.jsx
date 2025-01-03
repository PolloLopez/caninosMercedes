import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2025 Caninos Mercedes - Todos los derechos reservados</p>
            <ul>
                <li><a href="/contacto"></a>Contacto</li>
                <li><a href="/terminos"></a>Terminos de servicio</li>
                <li><a href="/privacidad"></a>Politicas de privacidad</li>
            </ul>
        </footer>
    );
};

export default Footer;