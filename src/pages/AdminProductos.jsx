// src>pages>AdminProducts.jsx
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./AdminProductos.css";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosArray);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProductos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="panel-admin">
      <h1 className="titulo-admin">📦 Productos en la tienda</h1>

      <div className="barra-superior">
        <input
          type="text"
          placeholder="🔎 Buscar producto por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador-productos"
        />
        <button className="btn-agregar" onClick={() => navigate("/admin/productos/crear")}>
          ➕ Agregar Producto
        </button>
      </div>

      <ul className="lista-productos">
        {productosFiltrados.map((p) => (
          <li key={p.id} className="tarjeta-producto">
            <img src={p.imagen} alt={p.nombre} className="imagen-producto" />
            <div className="info-producto">
              <h3>{p.nombre}</h3>
              <p><strong>💲Precio:</strong> ${p.precio}</p>
              <p><strong>📦 Stock:</strong> {p.stock}</p>
              <p><strong>📁 Categoría:</strong> {p.categoria}</p>
              <p>{p.descripcion}</p>
            </div>
            <div className="acciones-producto">
              <button className="btn-editar" onClick={() => navigate(`/admin/productos/editar/${p.id}`)}>✏️ Editar</button>
              <button className="btn-eliminar" onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProductos;
