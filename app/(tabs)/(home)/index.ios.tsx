
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  const healthScore = 78;
  const healthScoreText = healthScore.toString();

  const handleScanPress = () => {
    console.log('User tapped scan button');
    router.push('/camera');
  };

  const handleNotificationPress = () => {
    console.log('User tapped notifications');
    // TODO: Navigate to notifications screen
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello!</Text>
            <Text style={styles.welcomeText}>How&apos;s your skin today?</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleNotificationPress}
          >
            <IconSymbol
              ios_icon_name="bell.fill"
              android_material_icon_name="notifications"
              size={24}
              color={colors.text}
            />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Skin Health Dashboard */}
          <View style={styles.dashboardCard}>
            <LinearGradient
              colors={[colors.primaryLight, colors.primary]}
              style={styles.dashboardGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.dashboardTitle}>Skin Health Score</Text>
              <View style={styles.scoreContainer}>
                <View style={styles.scoreCircle}>
                  <Text style={styles.scoreNumber}>{healthScoreText}</Text>
                  <Text style={styles.scoreLabel}>/ 100</Text>
                </View>
              </View>
              <Text style={styles.dashboardSubtitle}>
                Your skin is looking good! Keep up the routine.
              </Text>
            </LinearGradient>
          </View>

          {/* Analysis Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="drop.fill"
                android_material_icon_name="info"
                size={28}
                color={colors.primary}
              />
              <Text style={styles.statValue}>Normal</Text>
              <Text style={styles.statLabel}>Hydration</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="sun.max.fill"
                android_material_icon_name="warning"
                size={28}
                color={colors.secondary}
              />
              <Text style={styles.statValue}>Good</Text>
              <Text style={styles.statLabel}>UV Protection</Text>
            </View>
            <View style={styles.statCard}>
              <IconSymbol
                ios_icon_name="sparkles"
                android_material_icon_name="check-circle"
                size={28}
                color={colors.accent}
              />
              <Text style={styles.statValue}>Clear</Text>
              <Text style={styles.statLabel}>Skin Clarity</Text>
            </View>
          </View>

          {/* Recent Scans */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Analysis</Text>
            <View style={styles.recentCard}>
              <View style={styles.recentIconContainer}>
                <IconSymbol
                  ios_icon_name="camera.fill"
                  android_material_icon_name="camera"
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentTitle}>Last Scan</Text>
                <Text style={styles.recentDate}>2 days ago</Text>
              </View>
              <IconSymbol
                ios_icon_name="chevron.right"
                android_material_icon_name="arrow-forward"
                size={20}
                color={colors.textLight}
              />
            </View>
          </View>

          {/* Tips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Tips</Text>
            <View style={styles.tipCard}>
              <Text style={styles.tipEmoji}>💧</Text>
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>Stay Hydrated</Text>
                <Text style={styles.tipText}>
                  Drink at least 8 glasses of water daily for healthy skin
                </Text>
              </View>
            </View>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Floating Scan Button */}
        <View style={styles.scanButtonContainer}>
          <TouchableOpacity style={styles.scanButton} onPress={handleScanPress}>
            <LinearGradient
              colors={[colors.secondary, colors.secondaryDark]}
              style={styles.scanButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <IconSymbol
                ios_icon_name="camera.fill"
                android_material_icon_name="camera"
                size={32}
                color={colors.card}
              />
              <Text style={styles.scanButtonText}>Scan Skin</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  welcomeText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.error,
    borderWidth: 2,
    borderColor: colors.card,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  dashboardCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  dashboardGradient: {
    padding: 24,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.card,
    marginBottom: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primary,
  },
  scoreLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  dashboardSubtitle: {
    fontSize: 14,
    color: colors.card,
    textAlign: 'center',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  recentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  recentContent: {
    flex: 1,
  },
  recentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  recentDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tipCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  tipEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  scanButtonContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  scanButton: {
    borderRadius: 28,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  scanButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 28,
    gap: 12,
  },
  scanButtonText: {
    color: colors.card,
    fontSize: 18,
    fontWeight: '700',
  },
});
