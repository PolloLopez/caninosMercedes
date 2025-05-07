// src/pages/Admin/CrearTutorial.jsx

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";
import { useNavigate } from "react-router-dom";
import "./CrearTutorial.css";

const CrearTutorial = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    videoUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tutoriales"), formulario);
      alert("Tutorial creado 🎉");
      navigate("/admin/tutoriales");
    } catch (error) {
      console.error(error);
      alert("Error al crear tutorial ❌");
    }
  };

  return (
    <div className="crear-tutorial-container">
      <h1>Crear Tutorial</h1>
      <form className="crear-formulario" onSubmit={handleSubmit}>
        <label>Título</label>
        <input name="titulo" value={formulario.titulo} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} required />

        <label>URL del Video</label>
        <input name="videoUrl" value={formulario.videoUrl} onChange={handleChange} required />

        <button type="submit">Crear Tutorial</button>
      </form>
    </div>
  );
};

export default CrearTutorial;
