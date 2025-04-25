import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Sample wishlist data
const initialWishlistItems = [
    {
        id: '1',
        name: 'Men\'s Casual Shirt',
        price: 1299,
        image: require('@/assets/images/zar.com.png'),
        discount: 25,
        inStock: true,
    },
    {
        id: '2',
        name: 'Women\'s Summer Dress',
        price: 1599,
        image: require('@/assets/images/zar.com.png'),
        discount: 15,
        inStock: true,
    },
    {
        id: '3',
        name: 'Kids Smart Watch',
        price: 799,
        image: require('@/assets/images/zar.com.png'),
        discount: 30,
        inStock: false,
    },
];

type WishlistItem = typeof initialWishlistItems[0];

export default function WishlistScreen() {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems);

    // Format price with currency symbol
    const formatPrice = (price: number) => {
        return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Calculate discounted price
    const getDiscountedPrice = (item: WishlistItem) => {
        return item.price - (item.price * item.discount / 100);
    };

    // Remove item from wishlist
    const removeFromWishlist = (id: string) => {
        setWishlistItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const renderWishlistItem = ({ item }: { item: WishlistItem }) => {
        const discountedPrice = getDiscountedPrice(item);

        return (
            <View style={styles.wishlistItem}>
                <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                />

                <View style={styles.productDetails}>
                    <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>

                    <View style={styles.priceContainer}>
                        <Text style={styles.discountedPrice}>{formatPrice(discountedPrice)}</Text>
                        <Text style={styles.originalPrice}>{formatPrice(item.price)}</Text>
                        <Text style={styles.discountLabel}>{item.discount}% OFF</Text>
                    </View>

                    <View style={styles.stockContainer}>
                        <Text
                            style={[
                                styles.stockStatus,
                                item.inStock ? styles.inStock : styles.outOfStock
                            ]}
                        >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </Text>
                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                item.inStock ? styles.addToCartBtn : styles.disabledBtn
                            ]}
                            disabled={!item.inStock}
                        >
                            <Ionicons name="cart-outline" size={16} color={item.inStock ? "white" : "#999"} />
                            <Text style={[styles.actionBtnText, item.inStock ? {} : styles.disabledText]}>
                                ADD TO CART
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.removeBtn}
                            onPress={() => removeFromWishlist(item.id)}
                        >
                            <Ionicons name="close" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Text style={styles.title}>My Wishlist</Text>
                <Text style={styles.itemCount}>{wishlistItems.length} items</Text>
            </View>

            {wishlistItems.length > 0 ? (
                <FlatList
                    data={wishlistItems}
                    renderItem={renderWishlistItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Ionicons name="heart-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyText}>Your wishlist is empty</Text>
                    <TouchableOpacity style={styles.shopNowButton}>
                        <Text style={styles.shopNowButtonText}>CONTINUE SHOPPING</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    itemCount: {
        fontSize: 14,
        color: '#666',
    },
    listContainer: {
        padding: 12,
    },
    wishlistItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        elevation: 2,
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 12,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        color: '#333',
        marginBottom: 6,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    discountedPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'line-through',
        marginRight: 8,
    },
    discountLabel: {
        fontSize: 12,
        color: '#FF3D00',
    },
    stockContainer: {
        marginBottom: 12,
    },
    stockStatus: {
        fontSize: 14,
    },
    inStock: {
        color: '#2E7D32',
    },
    outOfStock: {
        color: '#FF3D00',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
        flex: 1,
        marginRight: 8,
    },
    addToCartBtn: {
        backgroundColor: '#2E7D32',
    },
    disabledBtn: {
        backgroundColor: '#f0f0f0',
    },
    actionBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 6,
    },
    disabledText: {
        color: '#999',
    },
    removeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#f0f0f0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
        marginBottom: 24,
    },
    shopNowButton: {
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    shopNowButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
}); 