//src>pages>Admin>ProductList.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Obtener los productos desde el archivo JSON en la carpeta public
        fetch("/productos.json")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error al cargar los productos:", error));
    }, []);

    const handleDelete = (id) => {
        // Aquí agregarías la lógica para eliminar un producto
        const filteredProducts = products.filter((product) => product.id !== id);
        setProducts(filteredProducts);
        alert("Producto eliminado");
    };

    return (
        <div>
            <h1>Lista de Productos</h1>
            <Link to="/admin/producto/nuevo">
                <button>Agregar Producto</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>${product.price}</td>
                            <td>
                                <Link to={`/admin/producto/${product.id}`}>
                                    <button>Editar</button>
                                </Link>
                                <button onClick={() => handleDelete(product.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
