// src/pages/Tutorials/Tutoriales.jsx
import React from "react";
import TarjetaTutorial from "@/components/TarjetaTutorial/TarjetaTutorial";
import useFetchTutoriales from "@/hooks/useFetchTutoriales";
import "./Tutoriales.css";

const Tutoriales = () => {
  const { tutorials, loading, error } = useFetchTutoriales();

  if (loading) return <p>🌀 Cargando tutoriales...</p>;
  if (error) return <p>🚨 Error al cargar tutoriales</p>;

  if (!tutorials || tutorials.length === 0) {
    return <p>😅 Aún no hay tutoriales disponibles. ¡Pronto subiremos más!</p>;
  }

  return (
    <div className="contenedor-tutoriales">
      <h2>📚 Tutoriales disponibles</h2>
      <div className="lista-tutoriales">
        {tutorials.map(tutorial => (
          <TarjetaTutorial key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

export default Tutoriales;
