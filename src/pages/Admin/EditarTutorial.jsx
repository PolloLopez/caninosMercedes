/* src/pages/Admin/EditarTutorial.jsx */

// src/pages/Admin/EditarTutorial.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import "./EditarTutorial.css";

const EditarTutorial = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", descripcion: "", videoUrl: "" });

  useEffect(() => {
    const fetchTutorial = async () => {
      const docRef = doc(db, "tutoriales", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        alert("Tutorial no encontrado");
        navigate("/admin");
      }
    };
    fetchTutorial();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "tutoriales", id);
    await updateDoc(docRef, form);
    alert("✅ Tutorial actualizado");
    navigate("/admin");
  };

  return (
    <div className="editar-tutorial-container">
      <h1>Editar Tutorial</h1>
      <form className="editar-form" onSubmit={handleSubmit}>
        <label>Título</label>
        <input name="titulo" value={form.titulo} onChange={handleChange} required />
 
        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />

        <label>URL del video</label>
        <input name="videoUrl" value={form.videoUrl} onChange={handleChange} required />

        <button type="submit">💾 Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarTutorial;

