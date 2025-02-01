import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'; // Importamos la función para generar UUID
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generar el ID único para el producto
        const newProduct = {
            id: uuidv4(), // Usamos uuidv4 para generar un ID único
            name,
            description,
            price: parseFloat(price),
            image,
            category,
        };

        // Aquí deberías enviar `newProduct` al servidor o almacenarlo en el estado de tu aplicación
        console.log("Producto creado:", newProduct);

        // Redirigir al administrador al panel principal
        navigate("/admin");
    };

    return (
        <div>
            <h1>Crear nuevo producto</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                        type="text" 
                        value={image} 
                        onChange={(e) => setImage(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input 
                        type="text" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit">Crear Producto</button>
            </form>
        </div>
    );
};

export default CreateProduct;