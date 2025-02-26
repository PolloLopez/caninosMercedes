// src/pages/Admin/Ordenes.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./Ordenes.css";

const Ordenes = () => {
    const [ordenes, setOrdenes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [userClaims, setUserClaims] = useState(null);
    const [productosOrden, setProductosOrden] = useState(null);  // 🔹 Estado para el modal de productos

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdTokenResult();
                setUserClaims(token.claims);
            }
        });
    }, []);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "ordenes"), (snapshot) => {
            const ordenesData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setOrdenes(ordenesData);
        });

        return () => unsubscribe();
    }, []);

    const handleEstadoChange = async (ordenId, nuevoEstado) => {
        const confirmacion = window.confirm("¿Estás seguro de cambiar el estado de la orden?");
        if (!confirmacion) return;

        try {
            const ordenRef = doc(db, "ordenes", ordenId);
            await updateDoc(ordenRef, { estado: nuevoEstado });
        } catch (error) {
            console.error("Error actualizando el estado de la orden: ", error);
        }
    };

    const filteredOrdenes = ordenes.filter((orden) =>
        (orden.nombre && orden.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (orden.email && orden.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="ordenes-container">
            <h1>Órdenes</h1>

            {/* 🔹 Campo de búsqueda */}
            <div className="search-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por cliente o email"
                />
                <button onClick={() => setSearchTerm("")}>Limpiar</button>
            </div>

            <ul>
                {filteredOrdenes.map((orden) => (
                    <li key={orden.id}>
                        <p><strong>ID:</strong> {orden.id}</p>
                        <p><strong>Cliente:</strong> {orden.nombre} ({orden.email})</p>
                        <p><strong>Total:</strong> ${orden.total.toLocaleString()}</p>
                        <p><strong>Estado:</strong>
                            <select
                                value={orden.estado}
                                onChange={(e) => handleEstadoChange(orden.id, e.target.value)}
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Preparado">Preparado</option>
                                <option value="Despachado">Despachado</option>
                                <option value="Entregado">Entregado</option>
                            </select>
                        </p>
                        <button onClick={() => setProductosOrden(orden.productos)}>Ver productos</button>
                    </li>
                ))}
            </ul>

            {/* 🔹 Modal para mostrar productos */}
            {productosOrden && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Productos de la orden</h2>
                        <ul>
                            {productosOrden.map((prod, index) => (
                                <li key={index}>
                                    {prod.cantidad}x {prod.nombre} - ${prod.precio.toLocaleString()}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setProductosOrden(null)}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Ordenes;
