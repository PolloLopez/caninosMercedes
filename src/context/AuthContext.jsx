// src>context>AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [role, setRole] = useState(null);
    const [userName, setUserName] = useState("name");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          setCurrentUser(user);
          if (user) {
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setRole(data.role);
              setUserName(data.name || "🐾");
            } else {
              setRole(null);
              setUserName("🐾");
            }
          } else {
            setRole(null);
            setUserName("");
          }
          setLoading(false);
        });
    
        return () => unsubscribe();
      }, []);
    
      return (
        <AuthContext.Provider value={{ currentUser, role, userName }}>
          {!loading && children}
        </AuthContext.Provider>
      );
    };
    
    export const useAuth = () => useContext(AuthContext);