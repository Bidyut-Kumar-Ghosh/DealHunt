import { Stack } from 'expo-router';
import { View, StyleSheet, Platform, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';

export default function AuthLayout() {
    return (
        <View style={styles.container}>
            {/* Background image */}
            <ImageBackground
                source={require('../../assets/images/Kifa_page-t.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                {/* Stack navigator for auth screens */}
                <Stack screenOptions={{
                    headerShown: false,
                    contentStyle: {
                        backgroundColor: 'transparent'
                    }
                }}>
                    <Stack.Screen name="login" />
                    <Stack.Screen name="signup" />
                    <Stack.Screen name="forgot-password" />
                    <Stack.Screen name="index" />
                </Stack>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        opacity: 0.9,
    }
}); 