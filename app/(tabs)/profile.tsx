
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// ── Types ────────────────────────────────────────────
type SettingRowProps =
  | {
      icon: keyof typeof MaterialIcons.glyphMap;
      label: string;
      rightValue?: string;
      hasChevron?: true;
      hasToggle?: never;
      toggleValue?: never;
      onToggle?: never;
      onPress?: () => void;
    }
  | {
      icon: keyof typeof MaterialIcons.glyphMap;
      label: string;
      rightValue?: never;
      hasChevron?: never;
      hasToggle: true;
      toggleValue: boolean;
      onToggle: (v: boolean) => void;
      onPress?: never;
    };

function SettingRow({
  icon,
  label,
  rightValue,
  hasChevron = true,
  hasToggle,
  toggleValue,
  onToggle,
  onPress,
}: SettingRowProps) {
  return (
    <TouchableOpacity
      style={styles.settingRow}
      onPress={onPress}
      activeOpacity={hasToggle ? 1 : 0.7}
    >
      <View style={styles.settingIconWrap}>
        <MaterialIcons name={icon} size={20} color="#6B82A8" />
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: '#D0D5DD', true: '#34C759' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View style={styles.settingRight}>
          {rightValue ? (
            <Text style={styles.settingRightValue}>{rightValue}</Text>
          ) : null}
          {hasChevron && (
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

function PlanInfoRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string | number;
}) {
  return (
    <View style={styles.planRow}>
      <View style={styles.planRowIconWrap}>
        <MaterialIcons name={icon} size={18} color="#6B82A8" />
      </View>
      <Text style={styles.planRowLabel}>{label}</Text>
      <Text style={styles.planRowValue}>{value}</Text>
    </View>
  );
}

// ── Screen ───────────────────────────────────────────
export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <View style={styles.container}>
      {/* Dark blue gradient header */}
      <LinearGradient
        colors={['#0A2463', '#1A56B0']}
        style={styles.headerGradient}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </SafeAreaView>
      </LinearGradient>

      {/* ── Scrollable body ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account / Premium banner */}
        <LinearGradient
          colors={['#1A56B0', '#0A2463']}
          style={styles.accountBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View>
            <Text style={styles.accountBannerTitle}>Account</Text>
            <Text style={styles.accountBannerSub}>
              Choose the best plan{'\n'}for you.
            </Text>
          </View>
          <Text style={styles.starEmoji}>⭐</Text>
        </LinearGradient>

        {/* Current plan card */}
        <View style={styles.planCard}>
          <Text style={styles.planCardTitle}>Your current plan</Text>
          <View style={styles.planRowsContainer}>
            <PlanInfoRow icon="star-outline" label="Plan" value="Free" />
            <View style={styles.planDivider} />
            <PlanInfoRow icon="photo-library" label="Number of photos" value={0} />
            <View style={styles.planDivider} />
            <PlanInfoRow icon="check-box-outline-blank" label="Photos left" value={0} />
          </View>
        </View>

        {/* Add to plan button */}
        <TouchableOpacity style={styles.addPlanBtn} activeOpacity={0.85}>
          <Text style={styles.addPlanBtnText}>Add to your plan</Text>
        </TouchableOpacity>

        {/* Get Premium banner */}
        <LinearGradient
          colors={['#1A56B0', '#0A2463']}
          style={styles.premiumBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.premiumBannerContent}>
            <View>
              <Text style={styles.premiumBannerTitle}>
                {'Get Premium\nAccount'}
              </Text>
              <Text style={styles.premiumBannerSub}>
                Choose the best plan{'\n'}for you.
              </Text>
            </View>
            <Text style={styles.premiumStarEmoji}>⭐</Text>
          </View>
        </LinearGradient>

        {/* Disclaimer card */}
        <View style={styles.disclaimerCard}>
          <MaterialIcons
            name="info"
            size={20}
            color="#D97706"
            style={{ marginTop: 1 }}
          />
          <Text style={styles.disclaimerText}>
            <Text style={styles.disclaimerBold}>Not a medical device. </Text>
            For educational and self-assessment purposes only. Consult a
            dermatologist for any concerns.
          </Text>
        </View>

        {/* Settings section */}
        <Text style={styles.settingsSectionTitle}>Settings</Text>

        <View style={styles.settingsCard}>
          <SettingRow
            icon="transgender"
            label="Gender"
            rightValue="Male"
            hasChevron
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="grain"
            label="Skin type"
            hasChevron
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="warning-amber"
            label="Skin Risk Detector"
            hasChevron
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="notifications-none"
            label="Notifications"
            hasToggle
            toggleValue={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="description"
            label="Terms and conditions"
            hasChevron
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="security"
            label="Privacy policy"
            hasChevron
          />
          <View style={styles.settingDivider} />
          <SettingRow
            icon="shield"
            label="Privacy settings"
            hasChevron
          />
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FA',
  },

  // Header
  headerGradient: {
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: 16,
    paddingBottom: 4,
  },

  // Scroll
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // Account banner
  accountBanner: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  accountBannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  accountBannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },
  starEmoji: {
    fontSize: 48,
  },

  // Plan card
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  planCardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A2340',
    marginBottom: 12,
  },
  planRowsContainer: {},
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  planRowIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planRowLabel: {
    flex: 1,
    fontSize: 14,
    color: '#718096',
  },
  planRowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A2340',
  },
  planDivider: {
    height: 1,
    backgroundColor: '#EEF2F8',
    marginLeft: 42,
  },

  // Add plan button
  addPlanBtn: {
    backgroundColor: '#E53E3E',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#E53E3E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addPlanBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  // Premium banner
  premiumBanner: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  premiumBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  premiumBannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 28,
    marginBottom: 6,
  },
  premiumBannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 18,
  },
  premiumStarEmoji: {
    fontSize: 64,
  },

  // Disclaimer
  disclaimerCard: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
    gap: 10,
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: '#D97706',
  },
  disclaimerText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 19,
  },
  disclaimerBold: {
    fontWeight: '700',
  },

  // Settings
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2340',
    marginBottom: 12,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
    gap: 12,
  },
  settingIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#EEF2F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    color: '#4A5568',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingRightValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A2340',
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F0F4FA',
    marginLeft: 62,
  },
});
