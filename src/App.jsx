import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Inicio from "./pages/Inicio/Inicio";
import ItemListContainer from "./components/ItemListContainer"; 
import Carrito from "./pages/Carrito/Carrito";
import Nosotros from "./pages/Nosotros/Nosotros";
import Tutorials from "./pages/Tutoriales/Tutorials";
import { CartProvider } from "./context/cartContext";
import AdminPanel from "./pages/Admin/AdminPanel";
import Login from "./pages/Admin/Login";

import './App.css';


function App() {
  return (
    <CartProvider>
      <Router> 
        <MainLayout>
          <Routes>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="admin/login" element={<Login />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<ItemListContainer />} /> {/* Usamos ItemListContainer aquí */}
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
