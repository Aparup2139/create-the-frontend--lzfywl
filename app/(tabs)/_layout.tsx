
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
      ios_icon_name: 'house.fill',
      android_material_icon_name: 'home',
    },
    {
      name: 'Progress',
      title: 'Progress',
      route: '/(tabs)/progress',
      ios_icon_name: 'chart.bar.fill',
      android_material_icon_name: 'show-chart',
    },
    {
      name: 'Profile',
      title: 'Profile',
      route: '/(tabs)/profile',
      ios_icon_name: 'person.fill',
      android_material_icon_name: 'person',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FloatingTabBar tabs={tabs} />
    </View>
  );
}
