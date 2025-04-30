import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { auth, googleProvider } from '../firebase/config';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithCredential,
    GoogleAuthProvider
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Make sure WebBrowser can complete auth session
WebBrowser.maybeCompleteAuthSession();

// iOS OAuth Client ID (without the reversed scheme)
const IOS_CLIENT_ID = '177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com';
const WEB_CLIENT_ID = '177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com';
const EXPO_REDIRECT_URI = 'https://auth.expo.io/@kifayatibazar/kifayati-bazar';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [googleError, setGoogleError] = useState('');

    // Set up Google Auth Request with expo-auth-session
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: WEB_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        androidClientId: ANDROID_CLIENT_ID,
        scopes: ['profile', 'email'],
        redirectUri: Platform.select({
            native: 'com.kifayatibazar.app:/oauth2redirect',
            default: EXPO_REDIRECT_URI
        }),
        // Important: For iOS, this ensures the user can choose which Google account to use
        selectAccount: true,
        // For iOS standalone apps, ensure the scheme matches what's configured in app.config.js
        // This helps avoid redirect_uri_mismatch errors
        ...(Platform.OS === 'ios' ? {
            preferEphemeralSession: true
        } : {})
    });

    // Log the request details for debugging
    useEffect(() => {
        if (request) {
            console.log("Google Auth Request configured:", {
                redirectUri: request.redirectUri,
                scopes: request.scopes,
                clientId: request.clientId ? 'Set' : 'Not set',
                iosClientId: request.iosClientId ? 'Set' : 'Not set',
                androidClientId: request.androidClientId ? 'Set' : 'Not set'
            });
        }
    }, [request]);

    // Handle the auth session response
    useEffect(() => {
        console.log("Auth response type:", response?.type);

        if (response?.type === 'success') {
            setGoogleLoading(true);
            setGoogleError('');

            // Extract auth tokens
            const { id_token, access_token } = response.params;

            console.log("Auth successful, tokens received:", {
                hasIdToken: !!id_token,
                hasAccessToken: !!access_token
            });

            if (!id_token) {
                console.error('No ID token received from Google');
                Alert.alert('Authentication Error', 'Failed to get authentication token from Google');
                setGoogleLoading(false);
                return;
            }

            // Create credential with both tokens when available
            const credential = access_token
                ? GoogleAuthProvider.credential(id_token, access_token)
                : GoogleAuthProvider.credential(id_token);

            signInWithCredential(auth, credential)
                .then((result) => {
                    console.log('Google auth successful!', result.user.displayName);
                    router.replace('/tabs');
                })
                .catch((error) => {
                    console.error('Google auth error:', error);
                    setGoogleError(error.message);
                    Alert.alert('Authentication Error', 'Failed to authenticate with Google: ' + error.message);
                })
                .finally(() => {
                    setGoogleLoading(false);
                });
        } else if (response?.type === 'error') {
            console.error('Google auth response error:', response.error);
            setGoogleError(response.error?.message || 'Unknown error');
            Alert.alert('Authentication Error', `Error connecting to Google: ${response.error?.message || 'Unknown error'}`);
            setGoogleLoading(false);
        } else if (response?.type === 'dismiss') {
            console.log('Auth flow dismissed by user');
            setGoogleLoading(false);
        }
    }, [response, router]);

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/tabs');
        } catch (error: unknown) {
            console.error('Login error:', error);
            const firebaseError = error as FirebaseError;
            alert('Login failed: ' + (firebaseError.message || 'Please check your credentials'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setGoogleError('');

        try {
            if (Platform.OS === 'web') {
                // Web implementation using Firebase popup
                await signInWithPopup(auth, googleProvider);
                router.replace('/tabs');
            } else {
                // Mobile implementation using Expo AuthSession
                if (!request) {
                    Alert.alert('Google Sign In', 'Unable to start Google authentication process.');
                    setGoogleLoading(false);
                    return;
                }

                console.log('Starting Google auth flow...');

                // On iOS, make sure the redirect URI matches what's configured in Google Cloud Console
                // Log the redirect URI before opening the browser
                console.log('Redirect URI:', request.redirectUri);

                const result = await promptAsync();
                console.log('Prompt result:', result);
                // The actual sign-in happens in the useEffect when the response comes back
            }
        } catch (error: unknown) {
            console.error('Google login error:', error);
            const firebaseError = error as FirebaseError;
            const errorMessage = firebaseError.message || 'An error occurred';
            setGoogleError(errorMessage);
            alert('Google login failed: ' + errorMessage);
            setGoogleLoading(false);
        }
    };

    const goToSignup = () => {
        router.push('/auth/signup');
    };

    const goToForgotPassword = () => {
        router.push('/auth/forgot-password');
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <StatusBar style="dark" />

                <View style={styles.header}>
                    <Image
                        source={require('@/assets/images/zar.com.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.subtitle}>Log in to access your account</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.forgotPasswordContainer}
                        onPress={goToForgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonLoading]}
                        onPress={handleLogin}
                        disabled={isLoading || googleLoading}
                    >
                        {isLoading ? (
                            <Text style={styles.buttonText}>Logging in...</Text>
                        ) : (
                            <Text style={styles.buttonText}>Log In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={handleGoogleLogin}
                        disabled={isLoading || googleLoading}
                    >
                        <FontAwesome name="google" size={20} color="#DD4B39" style={styles.googleIcon} />
                        {googleLoading ? (
                            <Text style={styles.googleButtonText}>Connecting...</Text>
                        ) : (
                            <Text style={styles.googleButtonText}>Continue with Google</Text>
                        )}
                    </TouchableOpacity>

                    {googleError ? (
                        <Text style={styles.errorText}>Error: {googleError}</Text>
                    ) : null}

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={goToSignup}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoImage: {
        width: 200,
        height: 80,
        marginBottom: 16,
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        height: 50,
        backgroundColor: '#f9f9f9',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%',
        color: '#333',
    },
    eyeIcon: {
        padding: 8,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#2E7D32',
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonLoading: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    signupText: {
        color: '#666',
    },
    signupLink: {
        color: '#2E7D32',
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        color: '#666',
        paddingHorizontal: 10,
        fontSize: 14,
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    googleIcon: {
        marginRight: 10,
    },
    googleButtonText: {
        color: '#333',
        fontWeight: '600',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 15,
        textAlign: 'center',
    }
}); 