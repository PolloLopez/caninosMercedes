//setAdmin
import admin from "firebase-admin";
import { readFile } from "fs/promises";

// Cargar la clave de servicio
const serviceAccount = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url))
);

// Inicializar Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// UID del usuario que quieres hacer admin
const uid = "ioxlArMqCZc4yh1JRL17hqZKii83";

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log("✅ Administrador asignado correctamente");
    process.exit();
  })
  .catch(error => {
    console.error("❌ Error asignando admin:", error);
    process.exit(1);
  });
