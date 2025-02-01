// src/pages/Admin/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productosData from "../../../public/productos.json";

const EditProduct = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Buscar el producto por su ID
        const foundProduct = productosData.find((prod) => prod.id === parseInt(id)); // Convertir el id de la URL a número
        if (foundProduct) {
            setProduct(foundProduct);
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes implementar la lógica para actualizar el producto
        alert("Producto actualizado!");
        navigate("/admin/productos");
    };

    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={product.name} 
                        onChange={(e) => setProduct({ ...product, name: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={product.description} 
                        onChange={(e) => setProduct({ ...product, description: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        value={product.price} 
                        onChange={(e) => setProduct({ ...product, price: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text" 
                        value={product.image} 
                        onChange={(e) => setProduct({ ...product, image: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input 
                        type="text" 
                        value={product.category} 
                        onChange={(e) => setProduct({ ...product, category: e.target.value })} 
                    />
                </div>
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditProduct;
