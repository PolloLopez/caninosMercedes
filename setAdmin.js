// setAdmin.js
import admin from "firebase-admin";
import { readFile } from "fs/promises";

// Leer el archivo de clave de servicio (debe estar en la misma carpeta)
const serviceAccount = JSON.parse(
  await readFile(new URL("./serviceAccountKey.json", import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = "ioxlArMqCZc4yh1JRL17hqZKii83"; // Reemplaza con el UID real

admin.auth().setCustomusersClaims(uid, { admin: true })
  .then(() => {
    console.log("✅ Administrador asignado correctamente");
    process.exit();
  })
  .catch((error) => {
    console.error("❌ Error asignando admin:", error);
    process.exit(1);
  });
