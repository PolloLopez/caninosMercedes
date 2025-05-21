// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LayoutPrincipal from "@/layout/LayoutPrincipal/LayoutPrincipal";

// Páginas públicas
import Inicio from "@/pages/Inicio/Inicio";
import Nosotros from "@/pages/Nosotros/Nosotros";
import Tienda from "@/pages/Tienda/Tienda";
import Tutoriales from "@/pages/Tutoriales/Tutoriales";
import Carrito from "@/pages/Carrito/Carrito";
import Checkout from "@/pages/Checkout/Checkout";
import SeguimientoOrden from "@/pages/SeguimientoOrden/SeguimientoOrden";
import ConfirmacionPedido from "@/pages/ConfirmacionPedido";
import RegistroPostCompra from "@/pages/RegistroPostCompra";

// Admin
import Login from "@/pages/Admin/Login/Login";
import Admin from "./pages/Admin/AdminPanel/Admin";
import AdminProductos from "@/pages/AdminProductos.jsx";

import Ordenes from "@/pages/Admin/Ordenes/Ordenes";
import FormularioProducto from "./pages/Admin/FormularioProducto";


import CrearTutorial from "@/pages/Admin/CrearTutorial";
import EditarTutorial from "@/pages/Admin/EditarTutorial";

import AdminTutoriales from "@/pages/Admin/AdminTutoriales";


// Rutas protegidas 
import ProtectedRoute from "@/routes/ProtectedRoute";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPrincipal />}>
        {/* Públicas */}
        <Route index element={<Inicio />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="tienda" element={<Tienda />} />
        <Route path="tutoriales" element={<Tutoriales />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="seguimientoorden" element={<SeguimientoOrden />} />
        <Route path="confirmacion" element={<ConfirmacionPedido />} />
        <Route path="confirmacion/:id" element={<ConfirmacionPedido />} />
        <Route path="registro-post-compra" element={<RegistroPostCompra />} />

        {/* Admin */}
        <Route path="login" element={<Login />} />
        <Route path="admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="admin/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
        <Route path="admin/productos" element={<ProtectedRoute><AdminProductos /></ProtectedRoute>} />
        <Route path="admin/productos/listar" element={<ProtectedRoute><AdminProductos /></ProtectedRoute>} />
        <Route path="admin/productos/crear" element={<ProtectedRoute><FormularioProducto /></ProtectedRoute>} />
        <Route path="admin/productos/editar" element={<ProtectedRoute><AdminProductos /></ProtectedRoute>} />
        <Route path="admin/productos/editar/:id" element={<ProtectedRoute><FormularioProducto /></ProtectedRoute>} />
        <Route path="admin/tutoriales" element={<ProtectedRoute><AdminTutoriales /></ProtectedRoute>} />
        <Route path="admin/crear-tutorial" element={<ProtectedRoute><CrearTutorial /></ProtectedRoute>} />
        <Route path="admin/editar-tutorial" element={<ProtectedRoute><EditarTutorial /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
};

export default App;
