// src/components/Footer/Footer.jsx

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} CaninosMercedes 🐾 Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
