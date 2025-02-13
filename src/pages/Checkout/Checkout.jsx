//src>pages>Checkout>Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp  } from "firebase/firestore";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/AuthContext";
import "./Checkout.css";


const Checkout = () => {
    const { cart, clearCart, totalPrice } = useCart();
    const { user } = useAuth();// 📌 Obtenemos el usuario autenticado

    const [formData, setFormData] = useState({
        nombre: "", email: "", direccion: "", ciudad: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user) {
        alert("Debes iniciar sesión para completar la compra.");
        setLoading(false);
        return;
    }

    const order = {
        cliente: { ...formData, uid: user.uid },
        productos: cart,
        total: totalPrice(),
        fecha: Timestamp.fromDate(new Date()),
        estado: "pendiente"
    };

    try {
        const docRef = await addDoc(collection(db, "ordenes"), order);
        console.log("Orden creada:", docRef.id);

        clearCart();
        navigate(`/orden-confirmada/${docRef.id}`);
    } catch (error) {
        console.error("Error al crear la orden:", error);
        navigate("/error");
    } finally {
        setLoading(false);
    }
    };

    return (
        <div className="checkout-container">
            <h2>Finalizar Compra</h2>
            <div className="checkout-resumen">
                {cart.map((prod) => (
                    <div key={prod.id} className="checkout-item">
                        <img src={prod.imagen} alt={prod.nombre} />
                        <div>
                            <h3>{prod.nombre}</h3>
                            <p>Cantidad: {prod.quantity}</p>
                            <p>Precio: ${prod.precio}</p>
                            <p>Valor total: ${prod.precio * prod.quantity}</p>
                        </div>
                    </div>
                ))}
                <h3>Total a pagar: ${totalPrice()}</h3>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
                <input type="text" name="nombre" placeholder="Nombre" required onChange={handleChange} />
                <input type="email" name="email" placeholder="Correo" required onChange={handleChange} />
                <input type="number" name="telefono" placeholder="Teléfono" required onChange={handleChange} />
                <input type="text" name="direccion" placeholder="Dirección" required onChange={handleChange} />
                <input type="text" name="ciudad" placeholder="Ciudad" required onChange={handleChange} />
                <button type="submit" disabled={loading}>
                    {loading ? "Procesando..." : "Confirmar Compra"}
                </button>
            </form>
        </div>
    );
};

export default Checkout;