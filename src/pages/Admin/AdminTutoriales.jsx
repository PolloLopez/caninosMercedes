// src/pages/Admin/AdminTutoriales.jsx

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { Link } from "react-router-dom";
import "./AdminTutoriales.css";

const AdminTutoriales = () => {
  const [tutoriales, setTutoriales] = useState([]);

  useEffect(() => {
    const fetchTutoriales = async () => {
      const querySnapshot = await getDocs(collection(db, "tutoriales"));
      const tutorialesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTutoriales(tutorialesData);
    };

    fetchTutoriales();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tutoriales", id));
      setTutoriales(tutoriales.filter((tutorial) => tutorial.id !== id));
      alert("Tutorial eliminado ✅");
    } catch (error) {
      console.error("Error al eliminar tutorial:", error);
      alert("Error al eliminar tutorial ❌");
    }
  };

  return (
    <div className="admin-tutoriales-container">
      <h1>Gestión de Tutoriales</h1>
      <Link to="/admin/crear-tutorial" className="crear-tutorial-btn">
        Crear nuevo tutorial
      </Link>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tutoriales.map((tutorial) => (
            <tr key={tutorial.id}>
              <td>{tutorial.titulo}</td>
              <td>{tutorial.descripcion}</td>
              <td>
                <Link to={`/admin/editar-tutorial/${tutorial.id}`} className="editar-btn">
                  Editar
                </Link>
                <button onClick={() => handleDelete(tutorial.id)} className="eliminar-btn">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTutoriales;
