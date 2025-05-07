// src/pages/Admin/AdminPanel/Admin.jsx
 
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const accesos = [
    { label: "🛒 Cargar Pedido", route: "/tienda", color: "card-uno" },
    { label: "📦 Admin Pedidos", route: "/admin/ordenes", color: "card-dos" },
    { label: "🛍️ Admin Productos", route: "/admin/editarproducto", color: "card-tres" },
    // deberia redirigir a src>pages>Admin>EditarProducto.jsx
    // o//src>pages>Admin>ListaProductos>ListaProductos.jsx con el boton editar agregar
    { label: "🔙 Volver al Inicio", route: "/", color: "card-cuatro" },
  ];

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>
      <div className="admin-grid">
        {accesos.map(({ label, route, color }) => (
          <div key={route} className={`admin-card ${color}`} onClick={() => navigate(route)}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
