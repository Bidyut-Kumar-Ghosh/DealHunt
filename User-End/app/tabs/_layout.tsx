import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import AuthGuard from '../components/AuthGuard';

export default function TabLayout() {
  const pathname = usePathname();
  const router = useRouter();

  // Handle direct access to profile page
  useEffect(() => {
    if (pathname === '/tabs/profile' || pathname === '/profile') {
      // Make sure "profile" tab is selected
      console.log('Direct access to profile detected');
    }
  }, [pathname]);

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#2E7D32',
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              backgroundColor: '#ffffff',
            },
            default: {
              backgroundColor: '#ffffff',
            },
          }),
          tabBarInactiveTintColor: '#666666',
          tabBarLabelStyle: { fontSize: 12 },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: 'Categories',
            tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <Ionicons name="cart" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: 'Wishlist',
            tabBarIcon: ({ color }) => <Ionicons name="heart" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
