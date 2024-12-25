import { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "@/components/Provider/firebase.config";

export const UserContext = createContext();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState(null);

  const registerNewAccount = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  //   update
  const updateDetails = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    }).finally(() => {
      setLoading(false);
    });
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };
  // Sign Out
  const signOutUser = () => {
    setLoading(true);
    setUser(null)
    return signOut(auth);
  };

  // Sign In Google
  const provider = new GoogleAuthProvider();
  const loginGoogle = () => {
    console.log("i am here");
    return signInWithPopup(auth, provider);
  };

  const userInfo = {
    user,
    setUser,
    registerNewAccount,
    updateDetails,
    loginUser,
    signOutUser,
    loginGoogle,
    loading,
    setLoading,
    setEmail,
    email,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
