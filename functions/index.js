//src>index.js
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import React from 'react';

export const MercadoPagoButton = ({ orderId, total }) => {
  const handlePayment = async () => {
    try {
      const response = await fetch('https://us-central1-tu-proyecto.cloudfunctions.net/createMercadoPagoPreference', {
        method: 'POST',
        body: JSON.stringify({ orderId, total }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      const preferenceId = data.preferenceId;

      const mp = new window.MercadoPago('YOUR_PUBLIC_KEY'); // Agrega tu clave pública de Mercado Pago aquí
      mp.checkout({
        preference: {
          id: preferenceId,
        },
      });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    }
  };

  return <button onClick={handlePayment}>Pagar con Mercado Pago</button>;
};

