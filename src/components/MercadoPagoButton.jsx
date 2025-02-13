import React from 'react';

export const MercadoPagoButton = ({ orderId, total }) => {
    const handlePayment = async () => {
      // Aquí deberías hacer la solicitud al backend para crear un preferido de pago
      // A continuación, simulo la respuesta de Mercado Pago con un ID de preferencia
      const response = await fetch('/api/mercadoPago/create_preference', {
        method: 'POST',
        body: JSON.stringify({
          orderId,
          total,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      
      // Este es el `preference_id` generado por Mercado Pago
      const preferenceId = data.preferenceId;
      
      // Usar el SDK de Mercado Pago para redirigir al cliente
      const mp = new window.MercadoPago('YOUR_PUBLIC_KEY'); // Agrega tu clave pública de Mercado Pago aquí
      mp.checkout({
        preference: {
          id: preferenceId,
        },
      });
    };
  
    return (
      <button onClick={handlePayment}>Pagar con Mercado Pago</button>
    );
  };
