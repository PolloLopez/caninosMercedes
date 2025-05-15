// src/pages/Admin/FormularioProducto.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/firebase";
import "./FormularioProducto.css";

const FormularioProducto = () => {
  const { id } = useParams();
  const esEdicion = Boolean(id);
  const navigate = useNavigate();


  const categorias = ["Juguetes", "Alimentos", "Accesorios", "Higiene","Comederos", "Educación", "Servicios"];

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
    stock: "",
  });

  useEffect(() => {
    if (esEdicion) {
      const obtenerProducto = async () => {
        try {
          const docRef = doc(db, "productos", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const datos = docSnap.data();
            setProducto({
              nombre: datos.nombre || "",
              descripcion: datos.descripcion || "",
              precio: datos.precio || "",
              imagen: datos.imagen || "",
              categoria: datos.categoria || "",
              stock: datos.stock || "",
            });
          }
        } catch (error) {
          console.error("Error al obtener el producto:", error);
        }
      };
      obtenerProducto();
    }
  }, [id, esEdicion]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    // Validaciones
    if (
      !producto.nombre.trim() ||
      !producto.descripcion.trim() ||
      !producto.precio ||
      !producto.imagen.trim() ||
      !producto.categoria ||
      producto.stock === ""
    ) {
      alert("Por favor completá todos los campos.");
      return;
    }

    if (Number(producto.precio) <= 0) {
      alert("El precio debe ser mayor a 0.");
      return;
    }

    if (
      producto.stock !== "Servicio" &&
      (isNaN(Number(producto.stock)) || Number(producto.stock) < 0)
    ) {
      alert("El stock debe ser un número positivo o 'Servicio'.");
      return;
    }

    try {
      const data = {
        ...producto,
        precio: Number(producto.precio),
        stock: producto.stock === "Servicio" ? "Servicio" : Number(producto.stock),
      };

      if (esEdicion) {
        const docRef = doc(db, "productos", id);
        await updateDoc(docRef, { ...data, actualizado: serverTimestamp() });
      } else {
        await addDoc(collection(db, "productos"), { ...data, creado: serverTimestamp() });
      }

      navigate("/admin/productos");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <div className="contenedor-formulario-producto">
      <h1>{esEdicion ? "Editar Producto" : "Crear Producto"}</h1>
      <form className="formulario-producto" onSubmit={manejarEnvio}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={producto.nombre}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={producto.categoria}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label htmlFor="stock">Stock (o "Servicio")</label>
        <input
          type="text"
          id="stock"
          name="stock"
          value={producto.stock}
          onChange={manejarCambio}
          placeholder='Cantidad o "Servicio"'
          required
        />

        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={producto.descripcion}
          onChange={manejarCambio}
          required
        />

        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={producto.precio}
          onChange={manejarCambio}
          step="0.01"
          required
        />

        <label htmlFor="imagen">URL de Imagen</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={producto.imagen}
          onChange={manejarCambio}
          required
        />

        <button type="submit">{esEdicion ? "Actualizar" : "Crear"}</button>
      </form>
    </div>
  );
};

export default FormularioProducto;
