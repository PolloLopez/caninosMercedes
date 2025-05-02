// src/hooks/useFetchProductos.js
import { useState, useEffect } from "react";
import { db } from "@/config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore"; 

const useFetchProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para obtener productos desde Firestore
    const fetchProductos = async () => {
      try {
        const productosRef = collection(db, "productos"); 
        const productosSnapshot = await getDocs(productosRef);
        const productosList = productosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(productosList);
        setCargando(false);
      } catch (err) {
        setError("No se pudieron cargar los productos.");
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  return { productos, cargando, error };
};

export default useFetchProductos;
