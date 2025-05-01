// src/pages/Tutorials/Tutoriales.jsx

import React from "react";
import TarjetaTutorial from "../../components/TarjetaTutorial/TarjetaTutorial";
import useFetchTutoriales from "../../hooks/useFetchTutoriales";

const Tutoriales = () => {
  const { tutorials, loading, error } = useFetchTutoriales();

  if (loading) return <p>🌀 Cargando tutoriales...</p>;
  if (error) return <p>🚨 Error al cargar tutoriales</p>;

  if (!tutorials || tutorials.length === 0) {
    return <p>No hay tutoriales disponibles.</p>;
  }

  return (
    <div>
      {tutorials.map(tutorial => (
        <TarjetaTutorial key={tutorial.id} tutorial={tutorial} />
      ))}
    </div>
  );
};


export default Tutoriales;
