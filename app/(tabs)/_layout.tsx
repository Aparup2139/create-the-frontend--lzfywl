
import React from 'react';
import { View } from 'react-native';
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
      name: 'Progress',
      title: 'Progress',
      route: '/(tabs)/progress',
      icon: 'show-chart',
      label: 'Progress',
    },
    {
      name: 'Profile',
      title: 'Profile',
      route: '/(tabs)/profile',
      icon: 'person',
      label: 'Profile',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FloatingTabBar tabs={tabs} />
    </View>
  );
}
