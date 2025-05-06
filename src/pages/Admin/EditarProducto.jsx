// src/pages/Admin/EditarProducto.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import "./EditarProducto.css";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "" });

  useEffect(() => {
    const fetchProducto = async () => {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setForm(docSnap.data());
      } else {
        alert("Producto no encontrado");
        navigate("/admin/productos");
      }
    };
    fetchProducto();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "productos", id);
    await updateDoc(docRef, {
      ...form,
      precio: parseFloat(form.precio),
    });
    alert("✅ Producto actualizado");
    navigate("/admin/productos");
  };

  return (
    <div className="editar-producto-container">
      <h1>Editar Producto</h1>
      <form className="editar-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} required />

        <label>Descripción</label>
        <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required />

        <label>Precio</label>
        <input type="number" name="precio" value={form.precio} onChange={handleChange} required />

        <button type="submit">💾 Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarProducto;
