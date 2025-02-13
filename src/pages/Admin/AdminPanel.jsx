//src>pages>Admin>AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [tutoriales, setTutoriales] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login");
    } else {
      // Cargar productos desde Firestore
      const fetchProductos = async () => {
        const productosSnapshot = await getDocs(collection(db, "productos"));
        const productosData = productosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosData);
      };

       // Cargar tutoriales desde Firestore
        const fetchTutoriales = async () => {
        const tutorialesSnapshot = await getDocs(collection(db, "tutoriales"));
        const tutorialesData = tutorialesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTutoriales(tutorialesData);
      };

      fetchProductos();
      fetchTutoriales();
    }
  }, [navigate]);

  return (
    <div>
      <h1>Panel de Administración</h1>
      <button onClick={() => navigate("/admin/create-product")}>Agregar Producto</button>
      <h2>Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
          <img src={producto.imagen} alt={producto.nombre} width="100" />
          <div>{producto.nombre}</div>
          <div>{producto.descripcion}</div>
          <div>${producto.precio}</div>
          <div>{producto.categoria}</div>
          <button onClick={() => navigate(`/admin/producto/${producto.id}`)}>
            Editar
          </button>
        </li>
        ))}
      </ul>

      <h2>Tutoriales</h2>
      <ul>
        {tutoriales.map((tutorial) => (
          <li key={tutorial.id}>
            {tutorial.titulo}
            <button onClick={() => navigate(`/admin/tutorial/${tutorial.id}`)}>
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
