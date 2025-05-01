//src>pages>Admin>ListaProductos.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import "./ListaProductos.css"

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Obtener los productos desde Firestore
        const obtenerProductos = async () => {
            const db = getFirestore();
            const productosRef = collection(db, "productos");
            try {
                const querySnapshot = await getDocs(productosRef);
                const listaProductos = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProductos(listaProductos);
            } catch (error) {
                console.error("Error al cargar los productos:", error);
            }
        };
        
        obtenerProductos();
    }, []);

    const manejarEliminar = (id) => {
        // Aquí agregarías la lógica para eliminar un producto
        const productosFiltrados = productos.filter((producto) => producto.id !== id);
        setProductos(productosFiltrados);
        alert("Producto eliminado");
    };

    return (
        <div className="contenedor-lista-productos">
            <h1>Lista de Productos</h1>

            {/* Botón para agregar un nuevo producto */}
            <Link to="/admin/crear-producto"> 
                <button className="boton-agregar-producto">Agregar Producto</button>
            </Link>

            <table className="tabla-productos">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            <td>{producto.categoria}</td>
                            <td>${producto.precio}</td>
                            <td>
                                <Link to={`/admin/editar-producto/${producto.id}`}>
                                    <button className="boton-editar">Editar</button>
                                </Link>
                                <button
                                    className="boton-eliminar"
                                    onClick={() => manejarEliminar(producto.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaProductos;
