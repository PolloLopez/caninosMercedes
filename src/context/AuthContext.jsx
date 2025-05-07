// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [users, setusers] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseusers) => {
      if (firebaseusers) {
        const usersRef = doc(db, 'usuarios', firebaseusers.uid);
        const docSnap = await getDoc(usersRef);

        if (docSnap.exists()) {
          const usersData = docSnap.data();
          setusers({
            uid: firebaseusers.uid,
            email: firebaseusers.email,
            nombreCompleto: usersData.nombreCompleto || firebaseusers.email,
            role: usersData.role || 'users',
          });
          console.log("📄 Documento Firestore:", usersData);

        } else {
          await setDoc(usersRef, {
            nombreCompleto: firebaseusers.email,
            role: 'users',
          });

          setusers({
            uid: firebaseusers.uid,
            email: firebaseusers.email,
            nombreCompleto: firebaseusers.email,
            role: 'users',
          });
          
        }


      } else {
        setusers(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ users, login, logout, loginWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
