// src/components/TarjetaTutorial/TarjetaTutorial.jsx
import React from "react";
import "./TarjetaTutorial.css"; 

const TarjetaTutorial = ({ tutorial }) => {
  return (
    <div className="tutorial-card">
      <img src={tutorial.imagen} alt={tutorial.titulo} className="tutorial-image" />
      <h2>{tutorial.titulo}</h2>
      <p>{tutorial.descripcion}</p>
      <button className="add-to-cart-btn" onClick={() => alert(`Ver tutorial: ${tutorial.titulo}`)}>Ver Tutorial</button>
    </div>
  );
};

export default TarjetaTutorial;


