import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';
import { User, onAuthStateChanged } from 'firebase/auth';

// Define the context types
type AuthContextType = {
    user: User | null;
    loading: boolean;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set up the auth state listener
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext); 