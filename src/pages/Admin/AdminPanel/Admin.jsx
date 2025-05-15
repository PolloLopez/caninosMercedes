// src/pages/Admin/AdminPanel/Admin.jsx

import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  console.log("✅ Entrando al Panel de Administración");

  const accesos = [
    { label: "🛒 Cargar Pedido", route: "/tienda", color: "card-uno" },
    { label: "📦 Ver Pedidos", route: "/admin/ordenes", color: "card-dos" },
    { label: "🛍️ Productos", route: "/admin/productos/editar", color: "card-tres" },
    { label: "🔙 Volver al Inicio", route: "/", color: "card-cuatro" },
  ];

  return (
    <div className="admin-panel">
      <h1>Panel Administración</h1>
      <div className="admin-grid">
        {accesos.map(({ label, route, color }) => (
          <Link key={route} to={route} className={`admin-card ${color}`}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Admin;
