// src/layout/LayoutPrincipal/LayoutPrincipal.jsx

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { Outlet } from "react-router-dom";
import "./LayoutPrincipal.css";


const LayoutPrincipal = () => {
  return (
    <div className="layout-principal">
      <Navbar />
      <main className="contenido-principal">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default LayoutPrincipal;
