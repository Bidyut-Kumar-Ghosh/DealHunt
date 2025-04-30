import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.44;

// Mock data types
interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  discount: number;
}

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
}

// Mock data for featured products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Men\'s Casual Shirt',
    price: 1299,
    image: require('@/assets/images/zar.com.png'),
    discount: 25,
  },
  {
    id: '2',
    name: 'Women\'s Summer Dress',
    price: 1599,
    image: require('@/assets/images/zar.com.png'),
    discount: 15,
  },
  {
    id: '3',
    name: 'Kids Smart Watch',
    price: 799,
    image: require('@/assets/images/zar.com.png'),
    discount: 30,
  },
  {
    id: '4',
    name: 'Wireless Earbuds',
    price: 2499,
    image: require('@/assets/images/zar.com.png'),
    discount: 10,
  },
];

// Mock data for categories
const categories: Category[] = [
  { id: '1', name: 'Fashion', icon: 'shirt-outline' },
  { id: '2', name: 'Electronics', icon: 'laptop-outline' },
  { id: '3', name: 'Home', icon: 'home-outline' },
  { id: '4', name: 'Beauty', icon: 'color-palette-outline' },
  { id: '5', name: 'Sports', icon: 'football-outline' },
  { id: '6', name: 'Toys', icon: 'game-controller-outline' },
];

// Mock data for banner images
const bannerImages = [
  require('@/assets/images/zar.com.png'),
  require('@/assets/images/zar.com.png'),
];

export default function TabsIndexScreen() {
  const router = useRouter();
  const [currentBanner, setCurrentBanner] = useState(0);

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{item.discount}% OFF</Text>
      </View>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.originalPrice}>
          ₹{Math.round(item.price / (1 - item.discount / 100))}
        </Text>
      </View>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => router.push(`/category/${item.id}`)}
    >
      <View style={styles.categoryIcon}>
        <Ionicons name={item.icon} size={24} color="#2E7D32" />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner Carousel */}
        <View style={styles.bannerContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const newIndex = Math.floor(
                Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(width)
              );
              setCurrentBanner(newIndex);
            }}
          >
            {bannerImages.map((image, index) => (
              <Image
                key={index}
                source={image}
                style={styles.bannerImage}
                resizeMode="contain"
              />
            ))}
          </ScrollView>
          <View style={styles.paginationContainer}>
            {bannerImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentBanner === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={() => router.push('/tabs/categories')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderProductItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
        </View>

        {/* New Arrivals */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts.slice().reverse()}
            renderItem={renderProductItem}
            keyExtractor={(item) => `new-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 180,
    marginTop: 10,
  },
  bannerImage: {
    width,
    height: 150,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#2E7D32',
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAll: {
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingVertical: 5,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
    width: 70,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f8f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  productsContainer: {
    paddingVertical: 10,
  },
  productCard: {
    width: ITEM_WIDTH,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#F44336',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    zIndex: 1,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productImage: {
    width: '100%',
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addToCartButton: {
    backgroundColor: '#2E7D32',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  }
});
