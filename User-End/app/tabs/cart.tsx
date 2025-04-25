import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// Sample cart data
const initialCartItems = [
    {
        id: '1',
        name: 'Men\'s Casual Shirt',
        price: 1299,
        image: require('@/assets/images/zar.com.png'),
        quantity: 1,
        discount: 25,
    },
    {
        id: '2',
        name: 'Women\'s Summer Dress',
        price: 1599,
        image: require('@/assets/images/zar.com.png'),
        quantity: 2,
        discount: 15,
    },
];

type CartItem = typeof initialCartItems[0];

export default function CartScreen() {
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

    // Format price with currency symbol
    const formatPrice = (price: number) => {
        return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // Calculate discounted price
    const getDiscountedPrice = (item: CartItem) => {
        return item.price - (item.price * item.discount / 100);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (getDiscountedPrice(item) * item.quantity);
        }, 0);
    };

    // Update item quantity
    const updateQuantity = (id: string, increment: boolean) => {
        setCartItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    // Remove item from cart
    const removeItem = (id: string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const renderCartItem = ({ item }: { item: CartItem }) => {
        const discountedPrice = getDiscountedPrice(item);

        return (
            <View style={styles.cartItem}>
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

                    <View style={styles.actionRow}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={() => updateQuantity(item.id, false)}
                            >
                                <Ionicons name="remove" size={16} color="#2E7D32" />
                            </TouchableOpacity>

                            <Text style={styles.quantityText}>{item.quantity}</Text>

                            <TouchableOpacity
                                style={styles.quantityBtn}
                                onPress={() => updateQuantity(item.id, true)}
                            >
                                <Ionicons name="add" size={16} color="#2E7D32" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => removeItem(item.id)}>
                            <Ionicons name="trash-outline" size={20} color="#FF3D00" />
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
                <Text style={styles.title}>Shopping Cart</Text>
                <Text style={styles.itemCount}>{cartItems.length} items</Text>
            </View>

            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.listContainer}
                    />

                    <View style={styles.orderSummary}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Items Total</Text>
                            <Text style={styles.summaryValue}>{formatPrice(calculateTotal())}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Delivery Fee</Text>
                            <Text style={styles.summaryValue}>₹40</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.summaryRow}>
                            <Text style={styles.totalLabel}>Total Amount</Text>
                            <Text style={styles.totalValue}>{formatPrice(calculateTotal() + 40)}</Text>
                        </View>

                        <TouchableOpacity style={styles.checkoutButton}>
                            <Text style={styles.checkoutButtonText}>PROCEED TO CHECKOUT</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <View style={styles.emptyCartContainer}>
                    <Ionicons name="cart-outline" size={80} color="#ccc" />
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <TouchableOpacity style={styles.shopNowButton}>
                        <Text style={styles.shopNowButtonText}>SHOP NOW</Text>
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
    cartItem: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 12,
        padding: 12,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
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
        marginBottom: 8,
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
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
    },
    quantityBtn: {
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        paddingHorizontal: 8,
        fontSize: 14,
    },
    orderSummary: {
        backgroundColor: 'white',
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        color: '#333',
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
    },
    checkoutButton: {
        backgroundColor: '#2E7D32',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    checkoutButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    emptyCartText: {
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