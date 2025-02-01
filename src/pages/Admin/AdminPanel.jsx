import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [tutoriales, setTutoriales] = useState([]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) {
      navigate("/admin/login");
    } else {
      // Cargar los productos desde productos.json
      fetch("/productos.json")
        .then((res) => res.json())
        .then((data) => setProductos(data));

      // Cargar los tutoriales desde tutoriales.json
      fetch("/tutoriales.json")
        .then((res) => res.json())
        .then((data) => setTutoriales(data));
    }
  }, [navigate]);

  return (
    <div>
      <h1>Panel de Administración</h1>

      <h2>Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <img src={producto.image} alt={producto.name} width="100" />
            <div>{producto.name}</div>
            <div>{producto.description}</div>
            <div>${producto.price}</div>
            <div>{producto.category}</div>
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
