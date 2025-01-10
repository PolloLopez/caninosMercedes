import React from "react";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import "./MainLayout.css";

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout">
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
