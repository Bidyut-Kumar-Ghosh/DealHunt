import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet, Text, Image } from 'react-native';

import { AuthProvider } from './context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Customize DefaultTheme to ensure white background
const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    card: '#ffffff',
    border: '#e0e0e0',
  },
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (loaded) {
      // Hide the splash screen after fonts are loaded
      SplashScreen.hideAsync();

      // Show our custom splash for 2 seconds
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }
  }, [loaded]);

  if (!loaded) {
    // Show a blank screen while loading
    return null;
  }

  if (showSplash) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/zar.com.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.splashText}>Kifayati Bazar</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider value={CustomDefaultTheme}>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#ffffff' }
        }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="profile" />
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
              // Handle modality for auth screens
              presentation: 'containedModal',
              animation: 'fade',
              contentStyle: { backgroundColor: '#ffffff' }
            }}
          />
        </Stack>
        <StatusBar style="dark" />
      </ThemeProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  splashText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32'
  }
});
