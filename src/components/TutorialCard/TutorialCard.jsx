// src/components/TutorialCard/TutorialCard.jsx
import React from "react";
import "./TutorialCard.css"; // Estilos para la tarjeta del tutorial

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="tutorial-card">
      <img src={tutorial.image} alt={tutorial.title} className="tutorial-image" />
      <h2>{tutorial.title}</h2>
      <p>{tutorial.description}</p>
      <button onClick={() => alert(`Ver tutorial: ${tutorial.title}`)}>Ver Tutorial</button>
    </div>
  );
};

export default TutorialCard;
