// src/pages/Tutorials/Tutorials.jsx
import React, { useState, useEffect } from "react";
import TutorialCard from "../../components/TutorialCard/TutorialCard";
import "./Tutorials.css"; // Importa los estilos específicos para los tutoriales

const Tutorials = () => {
  const [tutorials, setTutorials] = useState([]);

  useEffect(() => {
    // Cargar el archivo tutoriales.json desde la carpeta public
    fetch("/tutoriales.json")
      .then((response) => response.json())
      .then((data) => {
        setTutorials(data); // Establece los datos de los tutoriales en el estado
        console.log(data);  // Log para verificar si los datos se cargan correctamente
      })
      .catch((error) => {
        console.error("Error al cargar los tutoriales:", error);
      });
  }, []);  // El array vacío asegura que solo se ejecute una vez al montar el componente

  return (
    <div className="tienda">
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
