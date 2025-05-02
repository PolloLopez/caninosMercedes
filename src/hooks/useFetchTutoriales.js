// src>hooks>useFetchTutoriales.js

import { db } from "@/firebase";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";


const useFetchTutoriales = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tutoriales"));
        const tutorialsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTutorials(tutorialsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorials();
  }, []);

  return { tutorials, loading, error };
};

export default useFetchTutoriales;