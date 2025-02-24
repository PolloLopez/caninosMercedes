// functions/index.js
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import cors from 'cors';

admin.initializeApp();

const corsHandler = cors({ origin: true });

export const addAdminClaim = functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
        if (req.method !== "POST") {
            return res.status(400).send({ message: "Método no permitido" });
        }

        const { uid } = req.body;
        if (!uid) {
            return res.status(400).send({ message: "Falta UID del usuario" });
        }

        try {
            // Asigna el rol de admin en Firebase Authentication
            await admin.auth().setCustomUserClaims(uid, { admin: true });

            // También guarda el rol en Firestore para tenerlo registrado
            await admin.firestore().collection("users").doc(uid).set(
                { admin: true },
                { merge: true }
            );

            return res.status(200).send({ message: "Administrador asignado exitosamente" });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    });
});
