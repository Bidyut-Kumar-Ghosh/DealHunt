import { View, StyleSheet } from 'react-native';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor: '#ffffff' }]} />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
