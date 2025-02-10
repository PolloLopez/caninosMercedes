// src/components/TutorialCard/TutorialCard.jsx
import React from "react";
import "./TutorialCard.css"; 

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="tutorial-card">
      <img src={tutorial.imagen} alt={tutorial.titulo} className="tutorial-image" />
      <h2>{tutorial.titulo}</h2>
      <p>{tutorial.descripcion}</p>
      <button className="add-to-cart-btn" onClick={() => alert(`Ver tutorial: ${tutorial.titulo}`)}>Ver Tutorial</button>
    </div>
  );
};

export default TutorialCard;


