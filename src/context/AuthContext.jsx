// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        // Buscar el rol en Firestore
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.name || "🐾");
          setRole(data.role || "user");
        } else {
          setUserName("🐾");
          setRole("user");
        }
      } else {
        setCurrentUser(null);
        setRole(null);
        setUserName("");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setRole(null);
    setUserName("");
  };

  const user = currentUser ? { ...currentUser, role, name: userName } : null;

  return (
    <AuthContext.Provider value={{ user, currentUser, role, userName, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
