import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

export default function Auth() {
    const router = useRouter();

    // Redirect to login screen
    useEffect(() => {
        // Using a short timeout to ensure the component mounts properly before redirecting
        const timer = setTimeout(() => {
            router.replace('login' as any);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

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
        marginTop: 16,
        fontSize: 16,
        color: '#2E7D32',
    }
}); 