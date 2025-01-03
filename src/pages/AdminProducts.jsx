import React, { useState} from "react";
import ".adminProducts.css";


const AdminProducts = () => {
    const [product, setProduct] = useState({ name: "", price: "", image: "", description: "" });
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    const newProducts = [...products, product];
    setProduct(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    setProduct({name: "", price: "", image: "", description: ""});
};

return (
    <div className="admin-container">
        <h1>Cargar nuevo producto</h1>
        <form onSubmit={handleSubmit} className="product-form">
            <input 
            type="text"
            name="name"
            value={producto.name}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
            />
            <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Precio"
            required
        />
        <textarea
        name="description"
        value={product.description}
        onChange={handleChange}
        placeholder="URL de la imagen"
        />
        <button type="submit">Agregar producto</button>
        </form>
    </div>
);
};
