import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Index() {
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

    // Show nothing while checking login status
    if (isLoggedIn === null) {
        return null;
    }

    // Redirect based on login status
    return isLoggedIn ? <Redirect href="/tabs" /> : <Redirect href="/auth" />;
}

export default Index; 