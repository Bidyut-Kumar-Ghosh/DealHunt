import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function Auth() {
    const router = useRouter();
    const { user, loading } = useAuth();

    // Redirect based on authentication state
    useEffect(() => {
        if (loading) return; // Wait until auth state is determined

        if (user) {
            // User is already logged in, redirect to tabs
            router.replace('/tabs');
        } else {
            // User not logged in, redirect to login screen
            router.replace('/auth/login');
        }
    }, [user, loading, router]);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#2E7D32" />
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        marginTop: 10,
        color: '#666',
        fontSize: 16,
    },
}); 