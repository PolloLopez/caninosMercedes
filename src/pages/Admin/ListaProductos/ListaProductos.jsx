//src>pages>Admin>ListaProductos>ListaProductos.jsx
 
import React, { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./ListaProductos.css";
import { useNavigate } from "react-router-dom";

const ListaProductos = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // Obtener productos desde Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productos"));
                const productosArray = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productosArray);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        fetchProducts();
    }, []);

    // Eliminar producto de Firestore
    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "productos", id));
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Error al eliminar producto:", error);
        }
    };

    return (
        <div className="admin-container">
            <h1>Productos en la tienda</h1>
            <button onClick={() => navigate("/admin/create-product")}>➕ Agregar Producto</button>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <h3>{p.nombre}</h3>
                        <p>Precio: ${p.precio}</p>
                        <p>{p.descripcion}</p>
                        <img src={p.imagen} alt={p.nombre} width="100" />
                        <div>
                            <button onClick={() => navigate(`/admin/edit-product/${p.id}`)}>✏️ Editar</button>
                            <button onClick={() => handleDelete(p.id)}>🗑️ Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaProductos;
