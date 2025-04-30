import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { auth, googleProvider } from '../firebase/config';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithCredential,
    GoogleAuthProvider,
    updateProfile
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Make sure WebBrowser can complete auth session
WebBrowser.maybeCompleteAuthSession();

// OAuth Client IDs
const IOS_CLIENT_ID = '177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com';
const ANDROID_CLIENT_ID = '177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com';
const WEB_CLIENT_ID = '177255088932-g9l2nbtvicsh6tiqskrl3r9h3gvk352g.apps.googleusercontent.com';
const EXPO_REDIRECT_URI = 'https://auth.expo.io/@kifayatibazar/kifayati-bazar';

export default function SignupScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

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
        selectAccount: true,
    });

    // Handle the auth session response
    useEffect(() => {
        if (response?.type === 'success') {
            setGoogleLoading(true);

            // Extract auth tokens
            const { id_token, access_token } = response.params;

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
                    Alert.alert('Authentication Error', 'Failed to authenticate with Google: ' + error.message);
                })
                .finally(() => {
                    setGoogleLoading(false);
                });
        } else if (response?.type === 'error') {
            console.error('Google auth response error:', response.error);
            Alert.alert('Authentication Error', `Error connecting to Google: ${response.error?.message || 'Unknown error'}`);
            setGoogleLoading(false);
        }
    }, [response, router]);

    const handleSignup = async () => {
        // Form validation
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile with display name
            await updateProfile(userCredential.user, {
                displayName: name
            });

            console.log('Account created successfully!');
            router.replace('/tabs');
        } catch (error: unknown) {
            console.error('Signup error:', error);
            const firebaseError = error as FirebaseError;
            Alert.alert('Signup Failed', firebaseError.message || 'An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setGoogleLoading(true);
        try {
            if (Platform.OS === 'web') {
                // Web implementation
                await signInWithPopup(auth, googleProvider);
                router.replace('/tabs');
            } else {
                // Mobile implementation using Expo AuthSession
                if (!request) {
                    Alert.alert('Google Sign In', 'Unable to start Google authentication process.');
                    setGoogleLoading(false);
                    return;
                }

                await promptAsync();
                // The actual sign-in happens in the useEffect when the response comes back
            }
        } catch (error: unknown) {
            console.error('Google signup error:', error);
            const firebaseError = error as FirebaseError;
            Alert.alert('Google Signup Failed', firebaseError.message || 'An error occurred');
            setGoogleLoading(false);
        }
    };

    const goToLogin = () => {
        router.push('/auth/login');
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
                    <Text style={styles.subtitle}>Create your account to shop with us</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                        />
                    </View>

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

                    <View style={styles.inputContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons
                                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                size={20}
                                color="#666"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isLoading && styles.buttonLoading]}
                        onPress={handleSignup}
                        disabled={isLoading || googleLoading}
                    >
                        {isLoading ? (
                            <Text style={styles.buttonText}>Creating Account...</Text>
                        ) : (
                            <Text style={styles.buttonText}>Create Account</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={handleGoogleSignup}
                        disabled={isLoading || googleLoading}
                    >
                        <FontAwesome name="google" size={20} color="#DD4B39" style={styles.googleIcon} />
                        {googleLoading ? (
                            <Text style={styles.googleButtonText}>Connecting...</Text>
                        ) : (
                            <Text style={styles.googleButtonText}>Sign up with Google</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={goToLogin}>
                            <Text style={styles.loginLink}>Log In</Text>
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
    button: {
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
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
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    loginText: {
        color: '#666',
    },
    loginLink: {
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
}); 