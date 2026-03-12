
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Href } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export interface TabBarItem {
  name: string;
  route: Href;
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  title?: string;
  ios_icon_name?: string;
  android_material_icon_name?: string;
  special?: boolean;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
}

export default function FloatingTabBar({ tabs }: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeTabIndex = React.useMemo(() => {
    let bestMatch = -1;
    let bestMatchScore = 0;

    tabs.forEach((tab, index) => {
      if (tab.special) return;
      let score = 0;

      if (pathname === tab.route) {
        score = 100;
      } else if (pathname.startsWith(tab.route as string)) {
        score = 80;
      } else if (pathname.includes(tab.name.toLowerCase())) {
        score = 60;
      } else if (
        typeof tab.route === 'string' &&
        tab.route.includes('/(tabs)/') &&
        pathname.includes((tab.route as string).split('/(tabs)/')[1])
      ) {
        score = 40;
      }

      if (score > bestMatchScore) {
        bestMatchScore = score;
        bestMatch = index;
      }
    });

    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  const handleTabPress = (route: Href) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.tabBar}>
        {tabs.map((tab, index) => {
          if (tab.special) {
            return (
              <TouchableOpacity
                key={index}
                style={styles.specialTabItem}
                onPress={() => handleTabPress(tab.route)}
                activeOpacity={0.85}
              >
                <View style={styles.specialButton}>
                  <MaterialIcons name={tab.icon} size={26} color="#FFFFFF" />
                  <Text style={styles.specialButtonLabel}>{tab.label}</Text>
                </View>
              </TouchableOpacity>
            );
          }

          const isActive = activeTabIndex === index;
          const iconName = (
            tab.android_material_icon_name || tab.icon
          ) as keyof typeof MaterialIcons.glyphMap;

          return (
            <TouchableOpacity
              key={index}
              style={styles.tabItem}
              onPress={() => handleTabPress(tab.route)}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={iconName}
                size={24}
                color={isActive ? '#1A56B0' : '#94A3B8'}
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5EAF0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'visible',
  },
  tabBar: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    overflow: 'visible',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 1,
  },
  tabLabelActive: {
    color: '#1A56B0',
    fontWeight: '600',
  },
  specialTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginTop: -20,
  },
  specialButton: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#E53E3E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E53E3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
    gap: 2,
  },
  specialButtonLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});
