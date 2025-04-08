// src/App.jsx
import React from "react";
import { Routes, Route} from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Inicio from "./pages/Inicio/Inicio";
import ItemListContainer from "./components/ItemListContainer"; 
import Carrito from "./pages/Carrito/Carrito";
import Nosotros from "./pages/Nosotros/Nosotros";
import Tutorials from "./pages/Tutoriales/Tutorials";
import AdminPanel from "./pages/Admin/AdminPanel";
import CreateProduct from "./pages/Admin/CreateProduct";
import ProductList from "./pages/Admin/ProductList";  
import Login from "./pages/Admin/Login";
import Checkout from "./pages/Checkout/Checkout"; 
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
import OrdersList from "./pages/Admin/OrdersList";
import SeguimientoOrden from "./pages/SeguimientoOrden";
import Ordenes from "./pages/Admin/Ordenes";
import NotFound from "./pages/NotFound"; 
import ProtectedRoute from "./routes/ProtectedRoute";

import './App.css';
import './assets/global.css';
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { loading } = useAuth();

  if ( loading ) return <p> 🌀 Cargando usuario...</p>
    return (
      <MainLayout>
        <Routes>
          {/* 🔐 Rutas protegidas para admins */}
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
          <Route path="/admin/productos" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
          <Route path="/admin/create-product" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
          <Route path="/admin/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
          <Route path="/admin/pedidos" element={<ProtectedRoute><OrdersList /></ProtectedRoute>} />

          {/* 🔑 Login de admin */}
          <Route path="/login" element={<Login />} />

          {/* 🏠 Rutas públicas */}
          <Route path="/" element={<Inicio />} />
          <Route path="/tienda" element={<ItemListContainer />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/tutoriales" element={<Tutorials />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orden-confirmada/:id" element={<OrderConfirmation />} />
          <Route path="/seguimiento" element={<SeguimientoOrden />} />

          {/* 🚫 404 */}
          <Route path="*" element={<NotFound />} /> {/* Ruta no encontrada */}
        </Routes>
        </MainLayout>
  );
};

export default App;
