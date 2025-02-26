import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import auth from "../Firebase";
import axios from "axios"; // Import axios for API calls

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Log out the current user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // On auth state change (handle user sign-in/out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Store user details in the database if it's their first login
        try {
          await axios.post(`${import.meta.env.VITE_URL}/storeUserDetails`, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
          });
        } catch (error) {
          console.error("Error storing user details:", error);
        }
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
