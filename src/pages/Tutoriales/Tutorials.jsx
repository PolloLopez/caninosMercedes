// src/pages/Tutorials/Tutorials.jsx
import React from "react";
import TutorialCard from "../../components/TutorialCard/TutorialCard";
import useFetchTutorials from "../../hooks/useFetchTutorials";
import ProductCard from "../../components/ProductCard/ProductCard";


const Tutorials = () => {
  const {tutorials, loading, error } = useFetchTutorials();

  if (loading) return <p>Cargando tutoriales...</p>
  if (error) return <p>Error al cargar los tutoriales: {error}</p>

  return (
    <div className="tienda">
      <h1>Tutoriales</h1>
      <div className="tutorial-list">
        {tutorials.map((tutorial) => {
          console.log("Renderizando tutorial:", tutorial);
          return <TutorialCard key ={tutorial.id} tutorial={tutorial} />
})}
      </div>
    </div>
  );
};

export default Tutorials;