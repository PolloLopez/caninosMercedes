import React from "react";
import Navbar from "./Navbar/navbar";
import Footer from "./Footer/footer";
import "./MainLayout.css";

const MainLayout = ({ children}) => {
    return (
        <div className="main-layout">
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;