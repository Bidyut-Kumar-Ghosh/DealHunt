import { Stack } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState } from 'react';

export default function AuthLayout() {
    const [videoReady, setVideoReady] = useState(false);

    return (
        <View style={styles.container}>
            {/* Background video */}
            <Video
                source={require('@/assets/images/Kifa.mp4')}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
                onLoad={() => setVideoReady(true)}
            />

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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.6, // Make video semi-transparent
    },
}); 