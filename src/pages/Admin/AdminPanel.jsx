import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");
        if (!isAdmin) {
        navigate("/admin/login");
        }
    }, [navigate]);

    return (
    <div>
        <h1>Panel de administración</h1>
        <p>Aqui podras gestionar tus productos, tutoriales y demás</p>
        <button onClick={() => {
        localStorage.removeItem("isAdmin");
        navigate("/admin/login");
    }}>
        Cerrar Sesión
    </button>
    </div>
    );
};

export default AdminPanel;