// src/pages/Tutorials/Tutorials.jsx
import React, { useState, useEffect } from "react";
import tutorialesData from "../../../public/tutoriales.json"; 
import TutorialCard from "../../components/TutorialCard/TutorialCard";

import "./Tutorials.css"; // Importa los estilos específicos para los tutoriales

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    setTutorials(tutorialesData);
  }, []);

  return (
    <div className="tienda"> {/* Usamos la misma clase tienda para mantener el diseño coherente */}
      <h1>Tutoriales</h1>
      <div className="tutorial-list">
        {tutorials.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

export default Tutorials;
