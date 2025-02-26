// src/pages/Admin/AdminPanel.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";

const AdminPanel = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const verificarAdmin = async () => {
            const user = auth.currentUser;
            if (!user) {
                navigate("/login"); // 🔹 Redirige si no está logueado
                return;
            }

            try {
                const userRef = doc(db, "usuarios", user.uid); // 📌 Asume que guardaste usuarios en Firestore
                const userSnap = await getDoc(userRef);

                if (userSnap.exists() && userSnap.data().rol === "admin") {
                    setLoading(false);
                } else {
                    setError("No tienes permisos para acceder.");
                    setTimeout(() => navigate("/"), 3000); // 🔹 Redirige en 3s
                }
            } catch (error) {
                console.error("Error verificando admin:", error);
                setError("Hubo un error al verificar permisos.");
            }
        };

        verificarAdmin();
    }, [navigate]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <h1>Panel de Administración</h1>
            <p>Bienvenido, administrador.</p>
        </div>
    );
};

export default AdminPanel;
