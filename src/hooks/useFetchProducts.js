// src/hooks/useFetchProducts.js
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "productos"));
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("Productos obtenidos:", productList); // 📌 LOG IMPORTANTE
                setProducts(productList);
            } catch (err) {
                console.error("Error obteniendo productos:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
};

export default useFetchProducts;