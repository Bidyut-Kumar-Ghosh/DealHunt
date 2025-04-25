import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        setIsLoading(true);
                        try {
                            await signOut(auth);
                            // The AuthGuard will automatically redirect to login
                        } catch (error) {
                            console.error('Logout error:', error);
                            Alert.alert('Error', 'Failed to logout. Please try again.');
                        } finally {
                            setIsLoading(false);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Text style={styles.title}>My Profile</Text>
                <TouchableOpacity style={styles.settingsButton}>
                    <Ionicons name="settings-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        {user?.photoURL ? (
                            <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.defaultAvatar]}>
                                <Text style={styles.avatarText}>
                                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || '?'}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Text style={styles.name}>{user?.displayName || 'User'}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.option}>
                        <Ionicons name="person-outline" size={24} color="#555" />
                        <Text style={styles.optionText}>Edit Profile</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Ionicons name="location-outline" size={24} color="#555" />
                        <Text style={styles.optionText}>Shipping Addresses</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Ionicons name="card-outline" size={24} color="#555" />
                        <Text style={styles.optionText}>Payment Methods</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Ionicons name="list-outline" size={24} color="#555" />
                        <Text style={styles.optionText}>Order History</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Ionicons name="settings-outline" size={24} color="#555" />
                        <Text style={styles.optionText}>Settings</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <Ionicons name="help-circle-outline" size={24} color="#555" />
                        <Text style={styles.optionText}>Help & Support</Text>
                        <Ionicons name="chevron-forward" size={20} color="#ccc" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.logoutButton, isLoading && styles.logoutButtonDisabled]}
                    onPress={handleLogout}
                    disabled={isLoading}
                >
                    <Ionicons name="log-out-outline" size={20} color="white" style={styles.logoutIcon} />
                    <Text style={styles.logoutText}>{isLoading ? 'Logging out...' : 'Logout'}</Text>
                </TouchableOpacity>

                <Text style={styles.versionText}>Kifayati Bazar v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    settingsButton: {
        padding: 6,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 16,
    },
    avatarContainer: {
        marginBottom: 10,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    defaultAvatar: {
        backgroundColor: '#2E7D32',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    optionsContainer: {
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#d9534f',
        marginHorizontal: 20,
        marginVertical: 30,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonDisabled: {
        backgroundColor: '#e57373',
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    versionText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#999',
        marginBottom: 24,
    },
}); 