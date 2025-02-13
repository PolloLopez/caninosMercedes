import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';

const PanelOrdenes = () => {
    const [orders, setOrders] = useState([]);
    const db = getFirestore();

    useEffect(() => {    const fetchOrders = async () => {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(ordersList);
    };

    fetchOrders();
    }, [db]);

    const updateOrderStatus = async (orderId, status) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
    };

    return (
    <div>
        <h2>Gestión de Órdenes</h2>
        <table>
        <thead>
            <tr>
            <th>ID de la Orden</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order) => (
            <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.email}</td>
                <td>{order.status}</td>
                <td>
                <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                >
                    <option value="pendiente">Pendiente</option>
                    <option value="procesando">Procesando</option>
                    <option value="enviado">Enviado</option>
                </select>
                </td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
    );
};

export default PanelOrdenes;
