import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

type AuthGuardProps = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            // User is not authenticated, redirect to login
            router.replace('/auth/login');
        }
    }, [user, loading, router]);

    if (loading) {
        // Show loading indicator while checking authentication state
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    // If user is authenticated, render children
    if (user) {
        return <>{children}</>;
    }

    // This should not be visible, as we redirect in the useEffect,
    // but returning null as a fallback
    return null;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
}); 