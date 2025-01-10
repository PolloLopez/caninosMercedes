//Este archivo contiene el custom hook que utilizamos para obtener los productos desde el archivo JSON

import { useState, useEffect } from "react";

const useFetchProducts = (url) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading, error };
};

export default useFetchProducts;
