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
import Login from "./pages/Admin/Login";
import CreateProduct from "./pages/Admin/CreateProduct";
import EditProduct from "./pages/Admin/EditProduct";
import ProductList from "./pages/Admin/ProductList";  
import { useAuth } from "./context/AuthContext";

import './App.css';

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
            <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
            <Route path="/admin/productos" element={<ProtectedRoute element={<ProductList />} />} />
            <Route path="/admin/producto/nuevo" element={<ProtectedRoute element={<CreateProduct />} />} />
            <Route path="/admin/producto/:id" element={<ProtectedRoute element={<EditProduct />} />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<ItemListContainer />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/tutoriales" element={<Tutorials />} />
          </Routes>
        </MainLayout>
      </Router>
    </CartProvider>
  );
}

export default App;
