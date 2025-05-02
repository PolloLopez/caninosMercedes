// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "@/layout/MainLayout/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

import Inicio from "./pages/Inicio/Inicio";

import Carrito from "./pages/Carrito/Carrito";
import Nosotros from "./pages/Nosotros/Nosotros";
import Tutoriales from "./pages/Tutoriales/Tutoriales";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
import SeguimientoOrden from "@/pages/SeguimientoOrden/SeguimientoOrden";

import AdminPanel from "./pages/Admin/AdminPanel/AdminPanel";
import CreateProduct from "./pages/Admin/CreateProduct/CreateProduct";
import Ordenes from "./pages/Admin/Ordenes/Ordenes";
import ListaProductos from "./pages/Admin/ListaProductos/ListaProductos";
import OrdersList from "./pages/Admin/OrderList/OrdersList";
import DetallePedido from './pages/Usuario/DetallePedido';

import Login from "./pages/Admin/Login/Login";
import NotFound from "./pages/NotFound";
import Tienda from './pages/Tienda/Tienda';


const App = () => {
  const { loading } = useAuth();

  if (loading) return <p>🌀 Cargando usuario...</p>;

  return (
    <Routes>
      {/* 🧭 Rutas con Navbar y Footer (layout envolvente) */}
      <Route path="/" element={<MainLayout />}>
        {/* 🏠 Rutas públicas */}
        <Route index element={<Inicio />} />
        <Route path="tienda" element={<Tienda/>} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="tutoriales" element={<Tutoriales />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orden-confirmada/:id" element={<OrderConfirmation />} />
        <Route path="seguimiento" element={<SeguimientoOrden />} />
        <Route path="login" element={<Login />} />

        {/* 🔐 Rutas protegidas */}
        <Route path="admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="admin/productos" element={<ProtectedRoute><ListaProductos /></ProtectedRoute>} />
        <Route path="admin/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
        <Route path="admin/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
        <Route path="admin/pedidos" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />
        <Route path="usuario/detalle-pedido/:orderId" element={<DetallePedido />} />


        {/* 🚫 Página no encontrada */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
