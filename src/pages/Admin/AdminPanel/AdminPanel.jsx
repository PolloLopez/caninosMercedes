// src/pages/Admin/AdminPanel.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getFunctions, httpsCallable } from "firebase/functions";
import "./adminpanel.css";

const AdminPanel = () => {
  const [uid, setUid] = useState("");
  const [message, setMessage] = useState("");

  const functions = getFunctions();
  const setAdminRole = httpsCallable(functions, "setAdminRole");

  const handleAssignAdmin = async () => {
    try {
      const result = await setAdminRole({ uid });
      setMessage(result.data.message); // Mostrar el mensaje de éxito
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      <div className="admin-assign-role">
        <input
          type="text"
          placeholder="Ingrese UID del usuario"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <button onClick={handleAssignAdmin}>Asignar rol de Admin</button>
        {message && <p>{message}</p>}
      </div>

      <nav>
        <ul>
          <li>
            <Link to="/admin/ordenes" className="admin-button">
              Gestionar Pedidos
            </Link>
          </li>
          <li>
            <Link to="/admin/productos" className="admin-button">
              Gestionar Productos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPanel;
