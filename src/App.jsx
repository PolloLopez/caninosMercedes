import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import Inicio from "./pages/Inicio/Inicio";
import ItemListContainer from "./components/ItemListContainer"; 
import Carrito from "./pages/Carrito/Carrito";
import Nosotros from "./pages/Nosotros/Nosotros";
import Tutoriales from "./pages/Tutoriales/Tutoriales";
import { CartProvider } from "./context/CartContext";
import './App.css';


function App() {
  return (
    <CartProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<ItemListContainer />} /> {/* Usamos ItemListContainer aquí */}
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/tutoriales" element={<Tutoriales />} />
          </Routes>
        </MainLayout>
      </Router>
    </CartProvider>
  );
}

export default App;
