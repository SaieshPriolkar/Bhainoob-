import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Additional setup if needed
      });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    // Add scopes if needed
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return signInWithPopup(auth, provider);
  }

  function googleSignInRedirect() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return signInWithRedirect(auth, provider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Check for redirect result when the component mounts
    getRedirectResult(auth)
      .then((result) => {
        // This gives you a Google Access Token
        if (result) {
          // The signed-in user info
          setCurrentUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Redirect sign-in error:", error);
      });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    googleSignIn,
    googleSignInRedirect,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}