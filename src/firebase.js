// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHQPG62nN0Hu9Qzqlst7JulBbOTssfZW4",
  authDomain: "mercedesk9.firebaseapp.com",
  projectId: "mercedesk9",
  storageBucket: "mercedesk9.firebasestorage.app",
  messagingSenderId: "191488187134",
  appId: "1:191488187134:web:94a8eae3847b538a1523af",
  measurementId: "G-1LZ86WHPXQ"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { app, auth, db };
