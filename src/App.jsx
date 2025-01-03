import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/store";
import Cart from "./pages/Cart/cart";
import Checkout from "./pages/Checkout/checkout";
import Tutorials from "./pages/Tutorials/tutorials";
import { CartProvider } from "./context/cartContext";
import './App.css';


function App () {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout><Home /></MainLayout>} />
          <Route path="/store" element={<MainLayout><Store /></MainLayout>} />
          <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
          <Route path="/checkout" element={<MainLayout><Checkout /></MainLayout>} />
          <Route path="/tutorials" element={<MainLayout><Tutorials /></MainLayout>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;