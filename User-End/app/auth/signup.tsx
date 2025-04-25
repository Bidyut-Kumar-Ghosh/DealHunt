import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { auth, googleProvider } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithCredential, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

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
                // For mobile, we need a different approach
                // This is a simplified placeholder - actual implementation would require
                // using the Google Identity SDK or Expo Google Sign In
                Alert.alert('Information', 'Google Sign In on mobile requires additional setup');
                // In a complete implementation, you would:
                // 1. Get ID token from Google Sign In SDK
                // 2. Create a credential with the token
                // 3. Sign in with the credential
                // Example:
                // const credential = GoogleAuthProvider.credential(idToken);
                // await signInWithCredential(auth, credential);
            }
        } catch (error: unknown) {
            console.error('Google signup error:', error);
            const firebaseError = error as FirebaseError;
            Alert.alert('Google Signup Failed', firebaseError.message || 'An error occurred');
        } finally {
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