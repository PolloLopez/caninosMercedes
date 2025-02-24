// src/pages/Admin/Ordenes.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import './Ordenes.css';  

const Ordenes = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOrdenes = async () => {
            const ordenesSnapshot = await getDocs(collection(db, "ordenes"));
            const ordenesData = ordenesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrdenes(ordenesData);
        };

        fetchOrdenes();
    }, []);

    const handleEstadoChange = async (ordenId, nuevoEstado) => {
        try {
            const ordenRef = doc(db, "ordenes", ordenId);
            await updateDoc(ordenRef, {
                estado: nuevoEstado,
            });
        } catch (error) {
            console.error("Error actualizando el estado de la orden: ", error);
        }

        setOrdenes((prevOrdenes) =>
            prevOrdenes.map((orden) =>
                orden.id === ordenId ? { ...orden, estado: nuevoEstado } : orden
            )
        );
    };

    const filteredOrdenes = ordenes.filter((orden) => {
        return (
            (orden.clienteNombre && orden.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (orden.clienteEmail && orden.clienteEmail.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();  // Evitar la recarga de la página
    };

    return (
        <div>
            <h1>Órdenes</h1>
            <form onSubmit={handleSearchSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Buscar por cliente"
                />
                <button type="submit">Buscar</button>
            </form>
            <ul>
                {filteredOrdenes.map((orden) => (
                    <li key={orden.id}>
                        <p><strong>ID:</strong> {orden.id}</p>
                        <p><strong>Cliente:</strong> {orden.clienteNombre} ({orden.clienteEmail})</p>
                        <p><strong>Estado:</strong>
                            <select
                                value={orden.estado}
                                onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
                            >
                                <option value="pendiente">Pendiente</option>
                                <option value="preparado">Preparado</option>
                                <option value="despachado">Despachado</option>
                                <option value="entregado">Entregado</option>
                            </select>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ordenes;
