"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInAnonymously, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User exists (anonymous or real) — store and unblock UI
        setUser(currentUser);
        try {
          const token = await currentUser.getIdToken();
          localStorage.setItem('userToken', token);
        } catch {
          // Non-critical — token caching failure doesn't block reads/writes
        }
        setLoading(false);
      } else {
        // No session — silently sign in anonymously so writes are allowed
        try {
          await signInAnonymously(auth);
          // onAuthStateChanged will fire again with the new anonymous user
        } catch {
          // If anonymous auth fails (e.g. offline), still unblock the UI
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Convenience export so components can call signOut directly if ever needed
export { signOut };
