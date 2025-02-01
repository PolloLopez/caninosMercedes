// src/components/TutorialCard/TutorialCard.jsx
import React from "react";
import "./TutorialCard.css"; // Importamos los estilos

const TutorialCard = ({ tutorial }) => {
  return (
    <div className="tutorial-card">
      <img
        src={tutorial.image}
        alt={tutorial.title}
        className="tutorial-image"
      />
      <h2>{tutorial.title}</h2>
      <p>{tutorial.description}</p>
      <a href={tutorial.url} target="_blank" rel="noopener noreferrer">
        <button className="view-more-btn">Ver más</button>
      </a>
    </div>
  );
};

export default TutorialCard;
