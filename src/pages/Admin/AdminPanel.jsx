// src/pages/Admin/AdminPanel.jsx
import { Link } from "react-router-dom";
import "./adminpanel.css";

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
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
