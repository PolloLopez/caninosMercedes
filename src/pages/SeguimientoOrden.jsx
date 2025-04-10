// src/pages/SeguimientoOrden.jsx
import "./SeguimientoOrden.css";
import { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const SeguimientoOrden = () => {
    const [email, setEmail] = useState("");
    const [ordenes, setOrdenes] = useState([]);
    const [error, setError] = useState("");

    const buscarOrdenes = async () => {
        if (!email) {
            setError("Por favor, ingresa tu correo.");
            return;
        }

        try {
            setError(""); // Limpiar errores previos
            const q = query(collection(db, "ordenes"), where("email", "==", email)); 
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.log("No se encontraron órdenes con el email:", email);
                setOrdenes([]);  // 🔹 Limpia el estado si no hay órdenes
                setError("No se encontraron órdenes con este correo.");
                return;
            }

            const ordenesEncontradas = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Órdenes encontradas:", ordenesEncontradas);
            setOrdenes(ordenesEncontradas);
        } catch (error) {
            console.error("Error buscando la orden: ", error);
            setError("Hubo un problema buscando tu pedido.");
        }
    };

    return (
        <div className="seguimiento-container">
            <h1>Seguimiento de Orden</h1>

            <div className="search-container">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo"
                />
                <button onClick={buscarOrdenes}>Buscar</button>
            </div>

            {error && <p className="error">{error}</p>}

            {ordenes.length === 0 && !error && <p>No hay órdenes para mostrar.</p>}

            <ul>
                {ordenes.map((orden) => (
                    <li key={orden.id}>
                        <p><strong>ID:</strong> {orden.id}</p>
                        <p><strong>Estado:</strong> {orden.estado}</p>
                        <p><strong>Cliente:</strong> {orden.nombre} ({orden.email})</p>
                        <p><strong>Total:</strong> ${orden.total?.toLocaleString()}</p>
                        
                        <h3>Productos:</h3>
                        <ul>
                            {orden.productos?.map((prod, index) => (
                                <li key={index}>
                                    {prod.cantidad}x {prod.nombre} - ${prod.precio.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeguimientoOrden;
