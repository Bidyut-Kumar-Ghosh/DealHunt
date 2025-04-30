import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

    useEffect(() => {
        const checkLoggedInStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setIsLoggedIn(!!token);
            } catch (error) {
                console.error('Failed to check login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoggedInStatus();
    }, []);

    // Show loading indicator while checking login status
    if (isLoggedIn === null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    // Redirect based on login status
    return isLoggedIn ? <Redirect href="/tabs" /> : <Redirect href="/auth/login" />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
}); 