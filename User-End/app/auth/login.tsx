import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { auth, googleProvider } from '../firebase/config';
import { signInWithEmailAndPassword, signInWithPopup, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

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
        try {
            if (Platform.OS === 'web') {
                // Web implementation
                await signInWithPopup(auth, googleProvider);
                router.replace('/tabs');
            } else {
                // For mobile, we need a different approach
                // This is a simplified placeholder - actual implementation would require
                // using the Google Identity SDK or Expo Google Sign In
                alert('Google Sign In on mobile requires additional setup');
                // In a complete implementation, you would:
                // 1. Get ID token from Google Sign In SDK
                // 2. Create a credential with the token
                // 3. Sign in with the credential
                // Example:
                // const credential = GoogleAuthProvider.credential(idToken);
                // await signInWithCredential(auth, credential);
            }
        } catch (error: unknown) {
            console.error('Google login error:', error);
            const firebaseError = error as FirebaseError;
            alert('Google login failed: ' + (firebaseError.message || 'An error occurred'));
        } finally {
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
}); 