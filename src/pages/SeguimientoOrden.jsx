import React, { useState, useEffect } from 'react';
import { getFirestore, doc, get } from 'firebase/firestore';

const SeguimientoOrden = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
    const db = getFirestore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!orderId && !email) {
            setError('Por favor ingresa un ID de orden o un email.');
            return;
        }

        try {
            const orderRef = orderId
            ? doc(db, 'orders', orderId)
            : doc(db, 'orders', email);

            const orderSnap = await get(orderRef);
            if (orderSnap.exists()) {
            setOrderData(orderSnap.data());
            } else {
            setError('Orden no encontrada.');
            }
        } catch (err) {
            setError('Error al buscar la orden.');
        }
        };

    return (
    <div>
        <h2>Seguimiento de Orden</h2>
        <form onSubmit={handleSubmit}>
        <div>
            <input
            type="text"
            placeholder="ID de la orden"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            />
        </div>
        <div>
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button type="submit">Buscar Orden</button>
        </form>

        {error && <p>{error}</p>}
        {orderData && (
        <div>
            <h3>Detalles de la Orden:</h3>
            <p><strong>Estado:</strong> {orderData.status}</p>
            <p><strong>Productos:</strong></p>
            <ul>
            {orderData.products.map((product, index) => (
                <li key={index}>{product.name} - {product.quantity}</li>
            ))}
            </ul>
        </div>
        )}
    </div>
    );
};

export default SeguimientoOrden;
