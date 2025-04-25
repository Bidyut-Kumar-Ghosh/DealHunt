import { Stack, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { VideoView } from 'expo-video';
import { VideoProvider, useVideo } from '@/hooks/useVideoContext';

// Wrapper component that uses the video context
function AuthScreensWithVideo() {
    const pathname = usePathname();
    const { videoPlayer, showVideo, playVideo } = useVideo();

    // Play video on navigation between auth screens
    useEffect(() => {
        playVideo();
    }, [pathname]);

    return (
        <View style={styles.container}>
            {showVideo && (
                <View style={styles.videoOverlay}>
                    <VideoView
                        player={videoPlayer}
                        style={styles.video}
                        contentFit="contain"
                        nativeControls={false}
                    />
                </View>
            )}
            <Stack screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: 'white' }
            }}>
                <Stack.Screen name="login" />
                <Stack.Screen name="signup" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="index" />
            </Stack>
            <StatusBar style="dark" />
        </View>
    );
}

// Main layout that provides the video context
export default function AuthLayout() {
    return (
        <VideoProvider>
            <AuthScreensWithVideo />
        </VideoProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: 'white',
    },
    video: {
        width: '100%',
        height: '100%',
    }
}); 