// src/pages/Admin/EditProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditProduct = () => {
    const { id } = useParams();// Obtenemos el ID del producto desde la URL
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        imagen: "",
        categoria: "",
    });

      // 🔥 Obtener datos del producto cuando el componente se monta

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, "productos", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct(docSnap.data());
                } else {
                    console.error("¡El producto no existe!");
                }
                } catch (error) {
                console.error("Error obteniendo el producto:", error);
                }
            };
        
        fetchProduct();
    }, [id]);

      // 🚀 Función para actualizar el producto en Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productRef = doc(db, "productos", id);
            await updateDoc(productRef, {
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: parseFloat(product.precio),
                imagen: product.imagen,
                categoria: product.categoria,
            });
            navigate("/admin");
        } catch (error) {
            console.error("Error actualizando producto:", error);
        }
    };

    if (!product) {
        return <div>Cargando productos...</div>;
    }

    return (
        <div>
            <h1>Editar Producto</h1>
            <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Nombre" value={product.nombre} onChange={(e) => setProduct({ ...product, nombre: e.target.value })} required />
            <textarea placeholder="Descripcion" value={product.descripcion} onChange={(e) => setProduct({ ...product, descripcion: e.target.value })} required />
            <input type="number" placeholder="Precio" value={product.precio} onChange={(e) => setProduct({ ...product, precio: e.target.value })} required />
            <input type="text" placeholder="Imagen" value={product.imagen} onChange={(e) => setProduct({ ...product, imagen: e.target.value })} required />
            <input type="text" placeholder="Categoria" value={product.categoria} onChange={(e) => setProduct({ ...product, categoria: e.target.value })} required />
            <button type="submit">Guardar Cambios</button> 
            </form>
        </div>
    );
};

export default EditProduct;