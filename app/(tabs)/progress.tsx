
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function ProgressScreen() {
  const improvementPercentage = 12;
  const improvementText = `+${improvementPercentage}%`;
  const totalScans = 8;
  const totalScansText = totalScans.toString();
  const daysActive = 14;
  const daysActiveText = daysActive.toString();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Progress</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Weekly Progress */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>This Week</Text>
            <View style={styles.progressCard}>
              <LinearGradient
                colors={[colors.primaryLight, colors.primary]}
                style={styles.progressGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.progressHeader}>
                  <Text style={styles.progressTitle}>Skin Health Trend</Text>
                  <IconSymbol
                    ios_icon_name="arrow.up.right"
                    android_material_icon_name="arrow-upward"
                    size={24}
                    color={colors.card}
                  />
                </View>
                <Text style={styles.progressValue}>{improvementText}</Text>
                <Text style={styles.progressSubtitle}>
                  Your skin health improved this week!
                </Text>
              </LinearGradient>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Statistics</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <IconSymbol
                  ios_icon_name="camera.fill"
                  android_material_icon_name="camera"
                  size={28}
                  color={colors.primary}
                />
                <Text style={styles.statValue}>{totalScansText}</Text>
                <Text style={styles.statLabel}>Total Scans</Text>
              </View>
              <View style={styles.statCard}>
                <IconSymbol
                  ios_icon_name="calendar"
                  android_material_icon_name="calendar-today"
                  size={28}
                  color={colors.secondary}
                />
                <Text style={styles.statValue}>{daysActiveText}</Text>
                <Text style={styles.statLabel}>Days Active</Text>
              </View>
            </View>
          </View>

          {/* History */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Scan History</Text>
            <View style={styles.historyCard}>
              <View style={styles.historyIconContainer}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={24}
                  color={colors.success}
                />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>Skin Analysis</Text>
                <Text style={styles.historyDate}>2 days ago</Text>
              </View>
              <Text style={styles.historyScore}>78</Text>
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyIconContainer}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={24}
                  color={colors.success}
                />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>Skin Analysis</Text>
                <Text style={styles.historyDate}>5 days ago</Text>
              </View>
              <Text style={styles.historyScore}>72</Text>
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyIconContainer}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={24}
                  color={colors.success}
                />
              </View>
              <View style={styles.historyContent}>
                <Text style={styles.historyTitle}>Skin Analysis</Text>
                <Text style={styles.historyDate}>1 week ago</Text>
              </View>
              <Text style={styles.historyScore}>68</Text>
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
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
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 48 : 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  progressCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  progressGradient: {
    padding: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.card,
  },
  progressValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.card,
    marginBottom: 8,
  },
  progressSubtitle: {
    fontSize: 14,
    color: colors.card,
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 12,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  historyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  historyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.highlight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  historyDate: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  historyScore: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
});
