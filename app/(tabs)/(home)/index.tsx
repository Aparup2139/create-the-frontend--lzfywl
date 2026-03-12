
import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = SCREEN_WIDTH - 48;

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
  lavenderLight: '#EDE9FE',
  sage: '#9DC8AC',
  textDark: '#1E3A3A',
  textMid: '#5A8080',
  textLight: '#9ABABA',
  headerGrad: ['#CBF0F0', '#8ED3D3'] as const,
  mintGrad: ['#B5EDD5', '#78CCA4'] as const,
  skyGrad: ['#BAD8FA', '#80BAEC'] as const,
  lavGrad: ['#DDD6FE', '#C4B5FD'] as const,
};

const SLIDES = [
  { badge: 1, text: 'Upload photos and track changes at the History Screen.' },
  { badge: 2, text: 'Get gentle AI-powered analysis of your skin condition.' },
  { badge: 3, text: 'Monitor changes over time with care and precision.' },
];

// ── FadeSlideIn: uses built-in React Native Animated ─────────────────────────
function FadeSlideIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: object;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 540,
        delay,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 480,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[{ opacity, transform: [{ translateY }] }, style]}>
      {children}
    </Animated.View>
  );
}

// ── Carousel slide ────────────────────────────────────────────────────────────
function BodyScanSlide({ badge, text }: { badge: number; text: string }) {
  return (
    <View style={styles.slide}>
      <LinearGradient
        colors={['#E4F9F9', '#C8EEEE']}
        style={styles.slideImageArea}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Body silhouettes */}
        <View style={styles.figureBack}>
          <MaterialIcons name="person" size={175} color="rgba(126,206,206,0.2)" />
        </View>
        <View style={styles.figureFront}>
          <MaterialIcons name="person" size={155} color="rgba(195,155,110,0.6)" />
        </View>

        {/* Scan square */}
        <View style={styles.scanSquareWrap}>
          <LinearGradient colors={['#F5D9BE', '#E8C4A0']} style={styles.scanSquare}>
            {/* TL bracket */}
            <View style={[styles.bracket, { top: -2, left: -2 }]}>
              <View style={styles.bracketH} />
              <View style={styles.bracketV} />
            </View>
            {/* TR bracket */}
            <View style={[styles.bracket, { top: -2, right: -2, alignItems: 'flex-end' }]}>
              <View style={styles.bracketH} />
              <View style={[styles.bracketV, { alignSelf: 'flex-end' }]} />
            </View>
            {/* BL bracket */}
            <View style={[styles.bracket, { bottom: -2, left: -2, justifyContent: 'flex-end' }]}>
              <View style={[styles.bracketV, { alignSelf: 'flex-start' }]} />
              <View style={styles.bracketH} />
            </View>
            {/* BR bracket */}
            <View
              style={[
                styles.bracket,
                { bottom: -2, right: -2, justifyContent: 'flex-end', alignItems: 'flex-end' },
              ]}
            >
              <View style={[styles.bracketV, { alignSelf: 'flex-end' }]} />
              <View style={styles.bracketH} />
            </View>
            <View style={styles.mole} />
          </LinearGradient>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.slideFooter}>
        <Text style={styles.slideFooterText}>{text}</Text>
        <View style={styles.slideArrow}>
          <MaterialIcons name="chevron-right" size={20} color={C.teal} />
        </View>
      </View>
    </View>
  );
}

// ── Main Screen ───────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<ScrollView>(null);

  // One Animated.Value per dot (controls width)
  const dotAnims = useRef<Animated.Value[]>(
    SLIDES.map((_, i) => new Animated.Value(i === 0 ? 22 : 8))
  ).current;

  const animateDots = useCallback(
    (idx: number) => {
      Animated.parallel(
        dotAnims.map((anim, i) =>
          Animated.spring(anim, {
            toValue: i === idx ? 22 : 8,
            useNativeDriver: false, // width cannot use native driver
            friction: 8,
            tension: 120,
          })
        )
      ).start();
    },
    [dotAnims]
  );

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SLIDE_WIDTH);
    const clamped = Math.max(0, Math.min(idx, SLIDES.length - 1));
    if (clamped !== activeSlide) {
      setActiveSlide(clamped);
      animateDots(clamped);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          {/* ── SOFT TEAL HEADER ── */}
          <LinearGradient
            colors={C.headerGrad}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FadeSlideIn delay={0}>
              <Text style={styles.headerSub}>Your Personal</Text>
              <Text style={styles.headerTitle}>AI Dermatologist</Text>
            </FadeSlideIn>

            <FadeSlideIn delay={120}>
              <ScrollView
                ref={carouselRef}
                horizontal
                snapToInterval={SLIDE_WIDTH + 12}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={styles.carouselList}
              >
                {SLIDES.map((s, i) => (
                  <BodyScanSlide key={i} badge={s.badge} text={s.text} />
                ))}
              </ScrollView>
            </FadeSlideIn>

            {/* Animated width dots */}
            <View style={styles.dotsRow}>
              {dotAnims.map((anim, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      width: anim,
                      backgroundColor:
                        i === activeSlide ? C.teal : 'rgba(126,206,206,0.38)',
                    },
                  ]}
                />
              ))}
            </View>
          </LinearGradient>

          {/* ── CONTENT ── */}
          <View style={styles.body}>
            <FadeSlideIn delay={200}>
              <Text style={styles.sectionHeading}>
                {'Early Detection\nMakes a Difference'}
              </Text>
            </FadeSlideIn>

            <FadeSlideIn delay={280}>
              <LinearGradient colors={C.mintGrad} style={styles.promoCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.promoText}>{'Every skin change\ndeserves attention.'}</Text>
                <View style={styles.doctorBubble}>
                  <MaterialIcons name="person" size={34} color={C.sage} />
                  <View style={styles.stethTag}>
                    <MaterialIcons name="medical-services" size={12} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </FadeSlideIn>

            <FadeSlideIn delay={340}>
              <LinearGradient colors={C.skyGrad} style={styles.riskCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.riskTitle}>Are You at Risk?</Text>
                  <Text style={styles.riskSub}>1 minute. Could save your life.</Text>
                </View>
                <View style={styles.qMarks}>
                  <Text style={styles.qLarge}>?</Text>
                  <Text style={[styles.qSmall, { top: 4, left: 18 }]}>?</Text>
                  <Text style={[styles.qSmall, { top: 20, left: 4 }]}>?</Text>
                </View>
              </LinearGradient>
            </FadeSlideIn>

            <FadeSlideIn delay={400}>
              <Text style={styles.sectionTitle}>Your last Scanning</Text>
              <View style={styles.scanRow}>
                <View style={styles.scanCard}>
                  <LinearGradient colors={['#E4F4F4', '#C8EEEE']} style={styles.scanPlaceholder}>
                    <MaterialIcons name="photo" size={34} color={C.tealLight} />
                  </LinearGradient>
                  <Text style={styles.scanDate}>March 12, 2026</Text>
                </View>
              </View>
            </FadeSlideIn>

            <FadeSlideIn delay={460}>
              <View style={styles.tipCard}>
                <View style={styles.tipIconWrap}>
                  <MaterialIcons name="info" size={18} color={C.peach} />
                </View>
                <Text style={styles.tipText}>
                  <Text style={styles.tipBold}>Tip: </Text>
                  Take 3 photos of the same area in a row for the most accurate results.
                </Text>
              </View>
            </FadeSlideIn>

            <FadeSlideIn delay={520}>
              <View style={styles.statsCard}>
                <View style={styles.ringWrap}>
                  <View style={styles.ringOuter}>
                    <View style={styles.ringInner}>
                      <Text style={styles.ringNum}>1</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.statsList}>
                  {[
                    { color: C.tealLight, label: 'Photos uploaded', val: '1' },
                    { color: C.teal, label: 'Without problems', val: '1' },
                    { color: C.peach, label: 'Diagnosed problems', val: '0' },
                  ].map((item, i) => (
                    <View key={i} style={styles.statsRow}>
                      <View style={[styles.statsDot, { backgroundColor: item.color }]} />
                      <Text style={styles.statsLabel}>{item.label}</Text>
                      <Text style={styles.statsVal}>{item.val}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </FadeSlideIn>

            <FadeSlideIn delay={580}>
              <LinearGradient colors={C.lavGrad} style={styles.notifCard} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.notifTitle}>Set Up Notification</Text>
                  <Text style={styles.notifSub}>{'Keep track of your\nskin conditions gently.'}</Text>
                </View>
                <View style={styles.bellWrap}>
                  <Text style={styles.bell}>🔔</Text>
                  <View style={styles.bellBadge}>
                    <Text style={styles.bellBadgeText}>1</Text>
                  </View>
                </View>
              </LinearGradient>
            </FadeSlideIn>

            <View style={{ height: 110 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  pageContent: { flexGrow: 1 },

  header: { paddingTop: 22, paddingHorizontal: 24, paddingBottom: 22 },
  headerSub: { fontSize: 18, fontWeight: '400', color: C.textMid, marginBottom: 2, letterSpacing: 0.3 },
  headerTitle: { fontSize: 26, fontWeight: '800', color: C.textDark, marginBottom: 20, letterSpacing: -0.3 },

  carouselList: { gap: 12, paddingRight: 24 },
  slide: {
    width: SLIDE_WIDTH,
    backgroundColor: C.card,
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: 'rgba(126,206,206,0.14)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 4,
  },
  slideImageArea: { height: 210, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  figureBack: { position: 'absolute', left: '8%', bottom: -8 },
  figureFront: { position: 'absolute', left: '28%', bottom: -8 },

  scanSquareWrap: { position: 'absolute', width: 96, height: 96, top: '28%', left: '42%' },
  scanSquare: { width: 96, height: 96, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  bracket: { position: 'absolute', width: 16, height: 16 },
  bracketH: { width: 16, height: 2.5, backgroundColor: C.card, borderRadius: 1.5 },
  bracketV: { width: 2.5, height: 16, backgroundColor: C.card, borderRadius: 1.5, marginTop: -2.5 },
  mole: { width: 11, height: 11, borderRadius: 6, backgroundColor: '#5C3A1E', opacity: 0.7 },
  badge: {
    position: 'absolute', top: -9, right: -9,
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: C.card, alignItems: 'center', justifyContent: 'center',
    shadowColor: 'rgba(0,0,0,0.1)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 4, elevation: 3,
  },
  badgeText: { fontSize: 12, fontWeight: '700', color: C.teal },
  slideFooter: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 10, backgroundColor: C.card },
  slideFooterText: { flex: 1, fontSize: 13, color: C.textMid, lineHeight: 19 },
  slideArrow: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: C.tealLight, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 16 },
  dot: { height: 8, borderRadius: 4 },

  body: { backgroundColor: C.bg, paddingHorizontal: 20, paddingTop: 24 },
  sectionHeading: { fontSize: 21, fontWeight: '800', color: C.textDark, marginBottom: 18, lineHeight: 29, letterSpacing: -0.2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: C.textDark, marginTop: 22, marginBottom: 12 },

  promoCard: { borderRadius: 18, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  promoText: { flex: 1, fontSize: 16, fontWeight: '700', color: '#FFFFFF', lineHeight: 23 },
  doctorBubble: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.88)', alignItems: 'center', justifyContent: 'center', marginLeft: 12, position: 'relative' },
  stethTag: { position: 'absolute', bottom: 0, right: 0, width: 20, height: 20, borderRadius: 10, backgroundColor: C.sage, alignItems: 'center', justifyContent: 'center' },

  riskCard: { borderRadius: 18, paddingVertical: 16, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  riskTitle: { fontSize: 16, fontWeight: '700', color: '#FFFFFF', marginBottom: 3 },
  riskSub: { fontSize: 12.5, color: 'rgba(255,255,255,0.9)' },
  qMarks: { width: 42, height: 42, position: 'relative' },
  qLarge: { position: 'absolute', fontSize: 28, fontWeight: '900', color: 'rgba(255,255,255,0.85)', top: 0, left: 0 },
  qSmall: { position: 'absolute', fontSize: 16, fontWeight: '700', color: 'rgba(255,255,255,0.65)' },

  scanRow: { flexDirection: 'row', gap: 12 },
  scanCard: { alignItems: 'center' },
  scanPlaceholder: { width: 108, height: 108, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  scanDate: { fontSize: 12, color: C.textLight },

  tipCard: { flexDirection: 'row', backgroundColor: '#FFF5EE', borderRadius: 16, padding: 14, marginTop: 16, gap: 10, alignItems: 'flex-start', borderLeftWidth: 3, borderLeftColor: C.peach },
  tipIconWrap: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.peachLight, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tipText: { flex: 1, fontSize: 13, color: '#8B5740', lineHeight: 19 },
  tipBold: { fontWeight: '700' },

  statsCard: { backgroundColor: C.card, borderRadius: 20, padding: 18, marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 16, shadowColor: 'rgba(126,206,206,0.12)', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 1, shadowRadius: 12, elevation: 3 },
  ringWrap: { alignItems: 'center', justifyContent: 'center' },
  ringOuter: { width: 78, height: 78, borderRadius: 39, borderWidth: 5, borderColor: C.tealLight, alignItems: 'center', justifyContent: 'center' },
  ringInner: { alignItems: 'center' },
  ringNum: { fontSize: 26, fontWeight: '700', color: C.textDark },
  statsList: { flex: 1, gap: 9 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statsDot: { width: 9, height: 9, borderRadius: 5, flexShrink: 0 },
  statsLabel: { flex: 1, fontSize: 12.5, color: C.textMid },
  statsVal: { fontSize: 13, fontWeight: '700', color: C.textDark },

  notifCard: { borderRadius: 20, padding: 20, marginTop: 16, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  notifTitle: { fontSize: 16, fontWeight: '700', color: '#3D2E7C', marginBottom: 5 },
  notifSub: { fontSize: 12.5, color: 'rgba(61,46,124,0.75)', lineHeight: 18 },
  bellWrap: { position: 'relative', marginLeft: 10 },
  bell: { fontSize: 42 },
  bellBadge: { position: 'absolute', top: -2, right: -2, width: 17, height: 17, borderRadius: 9, backgroundColor: C.peach, alignItems: 'center', justifyContent: 'center' },
  bellBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
});
