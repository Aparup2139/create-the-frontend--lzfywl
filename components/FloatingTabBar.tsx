
import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { Href } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

const TEAL = '#7ECECE';
const TEAL_LIGHT = '#B5EAEA';
const INACTIVE = '#A0B8B8';

export default function FloatingTabBar({ tabs }: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const regularTabs = tabs.filter((t) => !t.special);
  const allTabsCount = tabs.length;

  const activeTabIndex = React.useMemo(() => {
    let bestMatch = -1;
    let bestScore = 0;
    tabs.forEach((tab, index) => {
      if (tab.special) return;
      let score = 0;
      if (pathname === tab.route) score = 100;
      else if (pathname.startsWith(tab.route as string)) score = 80;
      else if (pathname.includes(tab.name.toLowerCase())) score = 60;
      else if (
        typeof tab.route === 'string' &&
        (tab.route as string).includes('/(tabs)/') &&
        pathname.includes((tab.route as string).split('/(tabs)/')[1])
      )
        score = 40;
      if (score > bestScore) {
        bestScore = score;
        bestMatch = index;
      }
    });
    return bestMatch >= 0 ? bestMatch : 0;
  }, [pathname, tabs]);

  // Animated indicator for active tab
  const indicatorX = useSharedValue(0);
  const scanScale = useSharedValue(1);

  useEffect(() => {
    // Small bounce on mount for scan button
    scanScale.value = withTiming(1.05, { duration: 300, easing: Easing.out(Easing.quad) }, () => {
      scanScale.value = withSpring(1, { damping: 14, stiffness: 160 });
    });
  }, []);

  useEffect(() => {
    const tabWidth = SCREEN_WIDTH / allTabsCount;
    indicatorX.value = withSpring(activeTabIndex * tabWidth + tabWidth / 2 - 14, {
      damping: 22,
      stiffness: 200,
      mass: 0.8,
    });
  }, [activeTabIndex]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
  }));

  const scanAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scanScale.value }],
  }));

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {/* Soft top separator */}
      <View style={styles.separator} />

      <BlurView
        intensity={Platform.OS === 'ios' ? 60 : 0}
        style={styles.blurContainer}
      >
        <View
          style={[
            styles.tabBar,
            Platform.OS !== 'ios' && styles.tabBarAndroid,
          ]}
        >
          {/* Animated dot indicator */}
          <Animated.View style={[styles.indicator, indicatorStyle]} />

          {tabs.map((tab, index) => {
            if (tab.special) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.specialTabItem}
                  onPress={() => router.push(tab.route)}
                  activeOpacity={0.85}
                >
                  <Animated.View style={scanAnimStyle}>
                    <LinearGradient
                      colors={['#FFD4C4', '#FFB8A3']}
                      style={styles.specialBtn}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <MaterialIcons name={tab.icon} size={24} color="#FFFFFF" />
                      <Text style={styles.specialBtnLabel}>{tab.label}</Text>
                    </LinearGradient>
                  </Animated.View>
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
                onPress={() => router.push(tab.route)}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={iconName}
                  size={23}
                  color={isActive ? TEAL : INACTIVE}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'visible',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(126,206,206,0.18)',
  },
  blurContainer: {
    overflow: 'visible',
  },
  tabBar: {
    flexDirection: 'row',
    height: 58,
    alignItems: 'center',
    backgroundColor: 'rgba(244,254,254,0.92)',
    overflow: 'visible',
  },
  tabBarAndroid: {
    backgroundColor: 'rgba(244,254,254,0.97)',
  },
  // Tiny animated active dot indicator above the icon
  indicator: {
    position: 'absolute',
    top: 6,
    width: 28,
    height: 3,
    borderRadius: 2,
    backgroundColor: TEAL_LIGHT,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    gap: 2,
  },
  tabLabel: {
    fontSize: 10,
    color: INACTIVE,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: TEAL,
    fontWeight: '600',
  },
  // Special center Scan button
  specialTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    marginTop: -18,
  },
  specialBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    shadowColor: 'rgba(255,184,163,0.5)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  specialBtnLabel: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
