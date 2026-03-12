
import React from 'react';
import { View } from 'react-native';
import { Slot } from 'expo-router';
import FloatingTabBar from '@/components/FloatingTabBar';
import { colors } from '@/styles/commonStyles';

export default function TabLayout() {
  const tabs = [
    {
      name: 'Home',
      title: 'Home',
      route: '/(tabs)/(home)',
      icon: 'home',
      label: 'Home',
    },
    {
      name: 'Profile',
      title: 'Profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Profile',
    },
    {
      name: 'Scan',
      title: 'Scan',
      route: '/camera',
      icon: 'camera-alt',
      label: 'Scan',
      special: true,
    },
    {
      name: 'History',
      title: 'History',
      route: '/(tabs)/history',
      icon: 'history',
      label: 'History',
    },
    {
      name: 'More',
      title: 'More',
      route: '/(tabs)/more',
      icon: 'menu',
      label: 'More',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Slot />
      <FloatingTabBar tabs={tabs} />
    </View>
  );
}
