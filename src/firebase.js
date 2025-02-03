// src/firebase.js
import { getAuth } from "firebase/auth";
import app from "./config/firebaseConfig"; // Importa la instancia de Firebase

const auth = getAuth(app); // Obtén la autenticación
console.log("Firebase configurado correctamente", auth); // Verifica si todo se cargó bien

export { auth };
