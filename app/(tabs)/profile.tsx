
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// ── Palette ───────────────────────────────────────────────────────────────────
const C = {
  bg: '#F4FEFE',
  card: '#FFFFFF',
  teal: '#7ECECE',
  tealLight: '#B5EAEA',
  tealExtraLight: '#E4F9F9',
  peach: '#FFB8A3',
  peachLight: '#FFE3DA',
  lavender: '#C4B5FD',
  textDark: '#1E3A3A',
  textMid: '#5A8080',
  textLight: '#9ABABA',
  shadow: 'rgba(126,206,206,0.12)',
  headerGrad: ['#CBF0F0', '#8ED3D3'] as const,
  skyGrad: ['#BAD8FA', '#80BAEC'] as const,
  lavGrad: ['#DDD6FE', '#C4B5FD'] as const,
};

// ── FadeSlideIn ───────────────────────────────────────────────────────────────
function FadeSlideIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const ty = useRef(new Animated.Value(16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 520,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(ty, {
        toValue: 0,
        duration: 460,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY: ty }] }}>
      {children}
    </Animated.View>
  );
}

// ── Setting row ───────────────────────────────────────────────────────────────
function SettingRow({
  icon,
  label,
  rightValue,
  isToggle,
  toggleVal,
  onToggle,
  showDivider = true,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  rightValue?: string;
  isToggle?: boolean;
  toggleVal?: boolean;
  onToggle?: (v: boolean) => void;
  showDivider?: boolean;
}) {
  return (
    <>
      <TouchableOpacity
        style={styles.settingRow}
        activeOpacity={isToggle ? 1 : 0.65}
      >
        <View style={styles.settingIconWrap}>
          <MaterialIcons name={icon} size={18} color={C.teal} />
        </View>
        <Text style={styles.settingLabel}>{label}</Text>
        {isToggle ? (
          <Switch
            value={toggleVal}
            onValueChange={onToggle}
            trackColor={{ false: '#D9EEF0', true: C.teal }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#D9EEF0"
          />
        ) : (
          <View style={styles.settingRight}>
            {rightValue ? (
              <Text style={styles.settingRightVal}>{rightValue}</Text>
            ) : null}
            <MaterialIcons name="chevron-right" size={19} color={C.tealLight} />
          </View>
        )}
      </TouchableOpacity>
      {showDivider && <View style={styles.settingDivider} />}
    </>
  );
}

// ── Plan row ──────────────────────────────────────────────────────────────────
function PlanRow({
  icon,
  label,
  value,
  showDivider = true,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string | number;
  showDivider?: boolean;
}) {
  return (
    <>
      <View style={styles.planRow}>
        <View style={styles.planIconWrap}>
          <MaterialIcons name={icon} size={17} color={C.teal} />
        </View>
        <Text style={styles.planLabel}>{label}</Text>
        <Text style={styles.planValue}>{value}</Text>
      </View>
      {showDivider && <View style={styles.planDivider} />}
    </>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const [notifOn, setNotifOn] = useState(true);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={C.headerGrad}
        style={styles.headerGrad}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <SafeAreaView edges={['top']}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeSlideIn delay={0}>
          <LinearGradient colors={C.skyGrad} style={styles.banner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.bannerTitle}>Account</Text>
              <Text style={styles.bannerSub}>{'Choose the best plan\nfor you.'}</Text>
            </View>
            <Text style={styles.bannerStar}>⭐</Text>
          </LinearGradient>
        </FadeSlideIn>

        <FadeSlideIn delay={80}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your current plan</Text>
            <PlanRow icon="star-outline" label="Plan" value="Free" />
            <PlanRow icon="photo-library" label="Number of photos" value={0} />
            <PlanRow icon="check-box-outline-blank" label="Photos left" value={0} showDivider={false} />
          </View>
        </FadeSlideIn>

        <FadeSlideIn delay={140}>
          <LinearGradient colors={[C.teal, '#5AACAC']} style={styles.addPlanBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            <TouchableOpacity style={styles.addPlanBtnInner} activeOpacity={0.8}>
              <Text style={styles.addPlanBtnText}>Add to your plan</Text>
            </TouchableOpacity>
          </LinearGradient>
        </FadeSlideIn>

        <FadeSlideIn delay={190}>
          <LinearGradient colors={C.lavGrad} style={styles.premiumBanner} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.premiumTitle}>{'Get Premium\nAccount'}</Text>
              <Text style={styles.premiumSub}>{'Choose the best plan\nfor you.'}</Text>
            </View>
            <Text style={styles.premiumStar}>⭐</Text>
          </LinearGradient>
        </FadeSlideIn>

        <FadeSlideIn delay={240}>
          <View style={styles.disclaimer}>
            <View style={styles.disclaimerIconWrap}>
              <MaterialIcons name="info" size={17} color={C.peach} />
            </View>
            <Text style={styles.disclaimerText}>
              <Text style={styles.disclaimerBold}>Not a medical device. </Text>
              For educational and self-assessment purposes only. Consult a dermatologist for any concerns.
            </Text>
          </View>
        </FadeSlideIn>

        <FadeSlideIn delay={290}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsCard}>
            <SettingRow icon="transgender" label="Gender" rightValue="Male" />
            <SettingRow icon="grain" label="Skin type" />
            <SettingRow icon="warning-amber" label="Skin Risk Detector" />
            <SettingRow icon="notifications-none" label="Notifications" isToggle toggleVal={notifOn} onToggle={setNotifOn} />
            <SettingRow icon="description" label="Terms and conditions" />
            <SettingRow icon="security" label="Privacy policy" />
            <SettingRow icon="shield" label="Privacy settings" showDivider={false} />
          </View>
        </FadeSlideIn>

        <View style={{ height: 110 }} />
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  headerGrad: { paddingBottom: 20, paddingHorizontal: 24 },
  headerTitle: { fontSize: 21, fontWeight: '700', color: C.textDark, textAlign: 'center', paddingTop: 16, paddingBottom: 4, letterSpacing: 0.2 },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },

  banner: { borderRadius: 20, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  bannerTitle: { fontSize: 19, fontWeight: '800', color: '#FFFFFF', marginBottom: 4 },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.88)', lineHeight: 18 },
  bannerStar: { fontSize: 46, marginLeft: 8 },

  card: { backgroundColor: C.card, borderRadius: 20, padding: 16, marginBottom: 14, shadowColor: C.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 10, elevation: 3 },
  cardTitle: { fontSize: 14, fontWeight: '600', color: C.textDark, marginBottom: 12 },

  planRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 10 },
  planIconWrap: { width: 30, height: 30, borderRadius: 15, backgroundColor: C.tealExtraLight, alignItems: 'center', justifyContent: 'center' },
  planLabel: { flex: 1, fontSize: 13.5, color: C.textMid },
  planValue: { fontSize: 13.5, fontWeight: '700', color: C.textDark },
  planDivider: { height: 1, backgroundColor: '#EEF9F9', marginLeft: 40 },

  addPlanBtn: { borderRadius: 30, marginBottom: 14, shadowColor: 'rgba(126,206,206,0.35)', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1, shadowRadius: 10, elevation: 5 },
  addPlanBtnInner: { paddingVertical: 15, alignItems: 'center' },
  addPlanBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', letterSpacing: 0.3 },

  premiumBanner: { borderRadius: 20, marginBottom: 14, padding: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  premiumTitle: { fontSize: 21, fontWeight: '800', color: '#3D2E7C', lineHeight: 27, marginBottom: 6 },
  premiumSub: { fontSize: 13, color: 'rgba(61,46,124,0.75)', lineHeight: 18 },
  premiumStar: { fontSize: 58, marginLeft: 8 },

  disclaimer: { flexDirection: 'row', backgroundColor: '#FFF5EE', borderRadius: 16, padding: 14, marginBottom: 22, gap: 10, alignItems: 'flex-start', borderLeftWidth: 3, borderLeftColor: C.peach },
  disclaimerIconWrap: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.peachLight, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  disclaimerText: { flex: 1, fontSize: 12.5, color: '#8B5740', lineHeight: 18 },
  disclaimerBold: { fontWeight: '700' },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: C.textDark, marginBottom: 12 },
  settingsCard: { backgroundColor: C.card, borderRadius: 20, overflow: 'hidden', shadowColor: C.shadow, shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 10, elevation: 3 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 13, paddingHorizontal: 16, gap: 12 },
  settingIconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.tealExtraLight, alignItems: 'center', justifyContent: 'center' },
  settingLabel: { flex: 1, fontSize: 14, color: C.textMid },
  settingRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  settingRightVal: { fontSize: 13.5, fontWeight: '700', color: C.textDark },
  settingDivider: { height: 1, backgroundColor: '#EEF9F9', marginLeft: 60 },
});
