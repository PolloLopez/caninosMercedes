// src/pages/Admin/OrdersList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
//import "./OrdersList.css";

const OrdersList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
    const fetchOrders = async () => {
        const querySnapshot = await getDocs(collection(db, "ordenes"));
        const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        }));
        setOrders(ordersData);
    };

    fetchOrders();
    }, []);

    return (
    <div className="orders-list">
        <h2>📦 Pedidos Recibidos</h2>
        {orders.length === 0 ? <p>No hay pedidos aún.</p> : 
        orders.map((order) => (
            <div key={order.id} className="order-card">
            <h3>Orden ID: {order.id}</h3>
            <p>Cliente: {order.cliente.nombre}</p>
            <p>Email: {order.cliente.email}</p>
            <p>Total: ${order.total}</p>
            <p>Estado: {order.estado}</p>
            </div>
        ))
        }
    </div>
    );
};

export default OrdersList;
