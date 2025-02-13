import React, { useState, useEffect } from 'react';
import { getFirestore, doc, get } from 'firebase/firestore';
import { MercadoPagoButton } from './MercadoPagoButton'; 

const ConfirmacionPedido = ({ orderId }) => {
    const [orderData, setOrderData] = useState(null);
    const db = getFirestore();

    useEffect(() => {
    const fetchOrder = async () => {
        const orderRef = doc(db, 'orders', orderId);
        const orderSnap = await get(orderRef);
        if (orderSnap.exists()) {
        setOrderData(orderSnap.data());
        }
    };

    fetchOrder();
    }, [orderId]);

    return (
    <div>
        <h2>Confirmación de Pedido</h2>
        {orderData && (
        <div>
            <h3>Detalles de la Orden:</h3>
            <p><strong>Estado:</strong> {orderData.status}</p>
            <p><strong>Total:</strong> ${orderData.total}</p>
            <MercadoPagoButton orderId={orderId} total={orderData.total} />
        </div>
        )}
    </div>
    );
};

export default ConfirmacionPedido;
