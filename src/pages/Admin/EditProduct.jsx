// src/pages/Admin/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc,getDoc, updateDoc } from "firebase/firestore";

const EditProduct = () => {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar productos desde firebase
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No se encontró el producto");
                    navigate("/admin");
                }
            } catch (error) {
                console.error("Error al obtener producto:", error);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, "productos", id);
            await updateDoc(docRef, product);
            console.log("Producto actualizado:", product);
            navigate("/admin");
        } catch (error) {
            console.error("Error al actualizar producto:", error);
        }
    };

    if (!product) return <div>Producto no encontrado.</div>;


    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={product.nombre} 
                        onChange={(e) => setProduct({ ...product, nombre: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={product.descripcion} 
                        onChange={(e) => setProduct({ ...product, descripcion: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        value={product.precio} 
                        onChange={(e) => setProduct({ ...product, precio: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text" 
                        value={product.imagen} 
                        onChange={(e) => setProduct({ ...product, imagen: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input 
                        type="text" 
                        value={product.categoria} 
                        onChange={(e) => setProduct({ ...product, categoria: e.target.value })} 
                    />
                </div>
                <button type="submit">Actualizar Producto</button>
            </form>
        </div>
    );
};

export default EditProduct;