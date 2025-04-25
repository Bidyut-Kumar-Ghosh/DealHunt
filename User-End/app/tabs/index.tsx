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

export default function Dashboard() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);

  // Function to format the price with commas
  const formatPrice = (price: number): string => {
    return '₹' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const discountedPrice = item.price - (item.price * item.discount / 100);

    return (
      <TouchableOpacity style={styles.productCard}>
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
        </View>
        <Image
          source={item.image}
          style={styles.productImage}
          resizeMode="contain"
        />
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>{formatPrice(discountedPrice)}</Text>
          <Text style={styles.originalPrice}>{formatPrice(item.price)}</Text>
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Ionicons name="cart-outline" size={16} color="white" />
          <Text style={styles.addToCartText}>ADD</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderBanner = () => {
    return (
      <View style={styles.bannerContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / width + 0.5);
            setActiveSlide(slideIndex);
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
        <View style={styles.pagination}>
          {bannerImages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === activeSlide ? styles.paginationDotActive : {}
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('@/assets/images/zar.com.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        {renderBanner()}

        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={styles.categoryIconContainer}>
                  <Ionicons name={category.icon} size={24} color="#2E7D32" />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={featuredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsContainer}
          />
        </View>

        {/* Flash Sale */}
        <View style={styles.sectionContainer}>
          <View style={styles.flashSaleHeader}>
            <View style={styles.flashSaleTitleContainer}>
              <Ionicons name="flash-outline" size={24} color="#FF3D00" />
              <Text style={styles.flashSaleTitle}>Flash Sale</Text>
            </View>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>Ends in: </Text>
              <View style={styles.timerBlock}>
                <Text style={styles.timerDigit}>08</Text>
              </View>
              <Text style={styles.timerSeparator}>:</Text>
              <View style={styles.timerBlock}>
                <Text style={styles.timerDigit}>45</Text>
              </View>
              <Text style={styles.timerSeparator}>:</Text>
              <View style={styles.timerBlock}>
                <Text style={styles.timerDigit}>30</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={featuredProducts.slice(0, 3)}
            renderItem={renderProduct}
            keyExtractor={(item) => `flash-${item.id}`}
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 20,
  },
  bannerContainer: {
    height: 180,
    marginBottom: 16,
  },
  bannerImage: {
    width: width,
    height: 180,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  categoriesContainer: {
    paddingBottom: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 70,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  productsContainer: {
    paddingRight: 8,
  },
  productCard: {
    width: ITEM_WIDTH,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 16,
    padding: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#eee',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF3D00',
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    height: 40,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  },
  addToCartButton: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 4,
  },
  addToCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 6,
  },
  flashSaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  flashSaleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashSaleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF3D00',
    marginLeft: 8,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  timerBlock: {
    backgroundColor: '#333',
    borderRadius: 4,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerDigit: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timerSeparator: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 4,
  },
});
