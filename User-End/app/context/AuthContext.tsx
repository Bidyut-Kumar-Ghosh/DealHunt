import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../firebase/config';
import { User, onAuthStateChanged, signOut, Auth } from 'firebase/auth';
import { Platform } from 'react-native';

// Define the context types
type AuthContextType = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
};

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
});

// Create a provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Set up the auth state listener
        const unsubscribe = onAuthStateChanged(auth as Auth, (authUser) => {
            setUser(authUser);
            setLoading(false);
        });

        // No longer trying to get redirect result since it's causing errors
        // Firebase will handle this automatically through onAuthStateChanged

        // Clean up the listener on unmount
        return () => unsubscribe();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            // This will trigger the onAuthStateChanged listener
            // which will set user to null and the AuthGuard will redirect
            return await signOut(auth as Auth);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error; // Rethrow the error so it can be caught by the component
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Default export
export default AuthProvider; 