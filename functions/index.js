// functions/index.js
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const corsHandler = cors({ origin: true });

// Función que asigna el rol de admin a un usuario usando HTTP
export const addAdminClaim = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send({ message: "Método no permitido" });
    }

    const { uid } = req.body;

    if (!uid) {
      return res.status(400).send({ message: "Falta UID del usuario" });
    }

    try {
      // Establecer el rol de "admin" en los custom claims de Firebase Auth
      await admin.auth().setCustomusersClaims(uid, { admin: true });
      
      // Guardar el rol en Firestore
      await admin.firestore().collection("userss").doc(uid).set(
        { admin: true },
        { merge: true }
      );

      return res.status(200).send({ message: "Administrador asignado exitosamente" });
    } catch (error) {
      console.error("Error asignando admin:", error);
      return res.status(500).send({ message: error.message });
    }
  });
});

// Función que asigna el rol de admin usando Cloud Functions (onCall)
export const setAdminRole = functions.https.onCall(async (data, context) => {
  // Verificar si el usuario autenticado tiene el rol de "admin"
  if (context.auth.token.role !== 'admin') {
    throw new functions.https.HttpsError('permission-denied', 'No tiene permisos para asignar roles.');
  }

  const { uid } = data;

  // Asegurarse de que se proporciona el UID
  if (!uid) {
    throw new functions.https.HttpsError('invalid-argument', 'UID del usuario es obligatorio.');
  }

  try {
    // Establecer el rol como "admin" en los custom claims de Firebase Auth
    await admin.auth().setCustomusersClaims(uid, { role: 'admin' });

    return { message: `El usuario ${uid} ahora es admin.` };
  } catch (error) {
    console.error("Error asignando admin:", error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});
