//  netlify>functions>getOrders.js
import { readFile } from "fs/promises";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// Determinar __dirname en ESM
const __dirname = dirname(fileURLToPath(import.meta.url));
// Construir la ruta absoluta al archivo de credenciales
import serviceAccount from "@/serviceAccountKey.json" assert { type: "json" };

// Leer el contenido del archivo de credenciales (usando top-level await)
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

// Inicializar Firebase Admin solo si aún no se ha inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

export default async function handler(event, context) {
  try {
    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.get();

    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return {
      statusCode: 200,
      body: JSON.stringify(orders)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al obtener órdenes: " + error.message })
    };
  }
}
