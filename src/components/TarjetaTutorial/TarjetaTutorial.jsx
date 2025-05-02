// src/components/TarjetaTutorial/TarjetaTutorial.jsx

import React from "react";
import "./TarjetaTutorial.css";

const TarjetaTutorial = ({ tutorial }) => {
  const { titulo, descripcion, imagen, enlace } = tutorial;

  return (
    <div className="tarjeta-tutorial">
      {imagen && (
        <img
          src={imagen}
          alt={`Imagen del tutorial: ${titulo}`}
          className="imagen-tutorial"
        />
      )}
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
      {enlace && (
        <a
          href={enlace}
          target="_blank"
          rel="noopener noreferrer"
          className="boton-ver-mas"
        >
          Ver más
        </a>
      )}
    </div>
  );
};

export default TarjetaTutorial;
