import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Categories data
const categories = [
    { id: '1', name: 'Fashion', icon: 'shirt-outline' as const },
    { id: '2', name: 'Electronics', icon: 'laptop-outline' as const },
    { id: '3', name: 'Home & Kitchen', icon: 'home-outline' as const },
    { id: '4', name: 'Beauty & Health', icon: 'color-palette-outline' as const },
    { id: '5', name: 'Sports & Fitness', icon: 'football-outline' as const },
    { id: '6', name: 'Toys & Baby', icon: 'game-controller-outline' as const },
    { id: '7', name: 'Books & Stationery', icon: 'book-outline' as const },
    { id: '8', name: 'Grocery', icon: 'nutrition-outline' as const },
    { id: '9', name: 'Automotive', icon: 'car-outline' as const },
    { id: '10', name: 'Mobiles & Accessories', icon: 'phone-portrait-outline' as const },
    { id: '11', name: 'Furniture', icon: 'bed-outline' as const },
    { id: '12', name: 'Appliances', icon: 'tv-outline' as const },
];

export default function CategoriesScreen() {
    const renderCategory = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity style={styles.categoryCard}>
            <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={28} color="#2E7D32" />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={categories}
                renderItem={renderCategory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContainer}
            />
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
    searchButton: {
        padding: 6,
    },
    listContainer: {
        padding: 12,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 16,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        elevation: 2,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    categoryName: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
}); 