// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Inicio from "./pages/Inicio/Inicio";
import ItemListContainer from "./components/ItemListContainer"; 
import Carrito from "./pages/Carrito/Carrito";
import Nosotros from "./pages/Nosotros/Nosotros";
import Tutorials from "./pages/Tutoriales/Tutorials";
import { CartProvider } from "./context/cartContext";
import AdminPanel from "./pages/Admin/AdminPanel";
import CreateProduct from "./pages/Admin/CreateProduct";
import EditProduct from "./pages/Admin/EditProduct";
import ProductList from "./pages/Admin/ProductList";  
import Login from "./pages/Admin/Login";
import { useAuth } from "./context/AuthContext";
import './App.css';
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/Checkout/OrderConfirmation";
import OrdersList from "./pages/Admin/OrdersList";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* 🔐 Rutas protegidas para admins */}
            <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
            <Route path="/admin/productos" element={<ProtectedRoute element={<ProductList />} />} />
            <Route path="/admin/create-product" element={<ProtectedRoute element={<CreateProduct />} />} />
            <Route path="/admin/producto/:id" element={<ProtectedRoute element={<EditProduct />} />} />
            <Route path="/admin/pedidos" element={<ProtectedRoute element={<OrdersList />} />} />

            {/* 🔑 Login de admin */}
            <Route path="/admin/login" element={<Login />} />

            {/* 🏠 Rutas públicas */}
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<ItemListContainer />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/tutoriales" element={<Tutorials />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orden-confirmada/:id" element={<OrderConfirmation />} />
          </Routes>
        </MainLayout>
      </Router>
    </CartProvider>
  );
}

export default App;
