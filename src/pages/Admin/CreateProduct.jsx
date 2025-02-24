//src>pages>Admin>CreateProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const CreateProduct = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");
    const [categoria, setCategoria] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generar el ID único para el producto
        const newProduct = {
            id: uuidv4(), // Usamos uuidv4 para generar un ID único
            nombre,
            descripcion,
            precio: parseFloat(precio),
            imagen,
            categoria,
        };

        try {
            await addDoc(collection(db, "productos"), newProduct);
            console.log("Producto agregado:", newProduct);
            navigate("/admin");
        } catch (error) {
            console.error("Error al agregar producto:", error);
        }
    };

    return (
        <div>
            <h1>Crear nuevo producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        value={precio} 
                        onChange={(e) => setPrecio(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text" 
                        value={imagen} 
                        onChange={(e) => setImagen(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input 
                        type="text" 
                        value={categoria} 
                        onChange={(e) => setCategoria(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CreateProduct;