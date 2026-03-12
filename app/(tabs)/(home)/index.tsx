
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SLIDE_WIDTH = SCREEN_WIDTH - 48;

const CAROUSEL_SLIDES = [
  {
    badgeNumber: 1,
    text: 'Upload photos and track it at the History Screen.',
  },
  {
    badgeNumber: 2,
    text: 'Get AI-powered analysis of your skin condition.',
  },
  {
    badgeNumber: 3,
    text: 'Monitor changes and consult a dermatologist.',
  },
];

function BodyScanSlide({
  badgeNumber,
  text,
}: {
  badgeNumber: number;
  text: string;
}) {
  return (
    <View style={styles.carouselSlide}>
      {/* Body scan visualization */}
      <View style={styles.bodyScanArea}>
        {/* Background figure */}
        <View style={[styles.figureSilhouette, styles.figureBack]}>
          <MaterialIcons name="person" size={180} color="rgba(90,130,200,0.18)" />
        </View>
        {/* Front figure */}
        <View style={[styles.figureSilhouette, styles.figureFront]}>
          <MaterialIcons name="person" size={160} color="rgba(195,145,90,0.75)" />
        </View>

        {/* Scan square with bracket corners */}
        <View style={styles.scanSquareWrapper}>
          <View style={styles.scanSquare}>
            {/* Corner brackets */}
            <View style={[styles.cornerBracket, { top: -1, left: -1 }]}>
              <View style={[styles.bracketArm, styles.bracketTop]} />
              <View style={[styles.bracketArm, styles.bracketLeft]} />
            </View>
            <View style={[styles.cornerBracket, { top: -1, right: -1, alignItems: 'flex-end' }]}>
              <View style={[styles.bracketArm, styles.bracketTop]} />
              <View style={[styles.bracketArm, styles.bracketRight]} />
            </View>
            <View
              style={[
                styles.cornerBracket,
                { bottom: -1, left: -1, justifyContent: 'flex-end' },
              ]}
            >
              <View style={[styles.bracketArm, styles.bracketLeft]} />
              <View style={[styles.bracketArm, styles.bracketBottom]} />
            </View>
            <View
              style={[
                styles.cornerBracket,
                {
                  bottom: -1,
                  right: -1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                },
              ]}
            >
              <View style={[styles.bracketArm, styles.bracketRight]} />
              <View style={[styles.bracketArm, styles.bracketBottom]} />
            </View>

            {/* Mole dot */}
            <View style={styles.moleDot} />
          </View>

          {/* Badge */}
          <View style={styles.scanBadge}>
            <Text style={styles.scanBadgeText}>{badgeNumber}</Text>
          </View>
        </View>
      </View>

      {/* Slide bottom text */}
      <View style={styles.slideFooter}>
        <Text style={styles.slideFooterText}>{text}</Text>
        <TouchableOpacity style={styles.slideArrowBtn}>
          <MaterialIcons name="chevron-right" size={22} color="#1A56B0" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [activeSlide, setActiveSlide] = useState(0);
  const carouselRef = useRef<ScrollView>(null);

  const handleCarouselScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / SLIDE_WIDTH);
    if (index !== activeSlide) {
      setActiveSlide(Math.max(0, Math.min(index, CAROUSEL_SLIDES.length - 1)));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.pageContent}
        >
          {/* ── DARK BLUE HEADER SECTION ── */}
          <LinearGradient
            colors={['#0A2463', '#1A56B0']}
            style={styles.headerGradient}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.headerSub}>Your Personal</Text>
            <Text style={styles.headerTitle}>AI Dermatologist</Text>

            {/* Carousel */}
            <ScrollView
              ref={carouselRef}
              horizontal
              snapToInterval={SLIDE_WIDTH + 12}
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
              onScroll={handleCarouselScroll}
              scrollEventThrottle={16}
              contentContainerStyle={styles.carouselList}
            >
              {CAROUSEL_SLIDES.map((slide, i) => (
                <BodyScanSlide
                  key={i}
                  badgeNumber={slide.badgeNumber}
                  text={slide.text}
                />
              ))}
            </ScrollView>

            {/* Dots indicator */}
            <View style={styles.dotsRow}>
              {CAROUSEL_SLIDES.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === activeSlide ? styles.dotActive : styles.dotInactive]}
                />
              ))}
            </View>
          </LinearGradient>

          {/* ── WHITE CONTENT SECTION ── */}
          <View style={styles.whiteSection}>

            {/* Early Detection */}
            <Text style={styles.sectionHeading}>
              {'Early Detection\nMakes a Difference'}
            </Text>

            {/* "Every skin change" promo card */}
            <LinearGradient
              colors={['#00B4B4', '#007070']}
              style={styles.promoCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.promoCardBody}>
                <Text style={styles.promoCardText}>
                  {'Every skin change\ndeserves attention.'}
                </Text>
                <View style={styles.doctorIconWrap}>
                  <View style={styles.doctorCircle}>
                    <MaterialIcons name="person" size={36} color="#00B4B4" />
                  </View>
                  <View style={styles.stethoscopeTag}>
                    <MaterialIcons name="medical-services" size={14} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* "Are You at Risk?" promo card */}
            <LinearGradient
              colors={['#00B4B4', '#007070']}
              style={styles.riskCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.riskCardBody}>
                <View style={styles.riskCardLeft}>
                  <Text style={styles.riskTitle}>Are You at Risk?</Text>
                  <Text style={styles.riskSubtitle}>
                    1 minute. Could save your life.
                  </Text>
                </View>
                <View style={styles.questionMarksContainer}>
                  <Text style={styles.questionMarkLarge}>?</Text>
                  <Text style={styles.questionMarkSmall}>?</Text>
                  <Text style={[styles.questionMarkSmall, { top: 18, left: 20 }]}>?</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Your last Scanning */}
            <Text style={styles.sectionTitle}>Your last Scanning</Text>
            <View style={styles.scanHistoryRow}>
              <View style={styles.scanImageCard}>
                <View style={styles.scanImagePlaceholder}>
                  <MaterialIcons name="photo" size={36} color="#B0C4D8" />
                </View>
                <Text style={styles.scanDateText}>March 12, 2026</Text>
              </View>
            </View>

            {/* Tip card */}
            <View style={styles.tipCard}>
              <MaterialIcons
                name="info"
                size={20}
                color="#D97706"
                style={{ marginTop: 1 }}
              />
              <Text style={styles.tipText}>
                <Text style={styles.tipBold}>Tip: </Text>
                To ensure accurate results, take 3 PHOTOS of the same area of
                concern in a row.
              </Text>
            </View>

            {/* Stats card */}
            <View style={styles.statsCard}>
              {/* Circular ring */}
              <View style={styles.statsRingWrap}>
                <View style={styles.statsRingOuter}>
                  <View style={styles.statsRingInner}>
                    <Text style={styles.statsRingNumber}>1</Text>
                  </View>
                </View>
              </View>

              {/* Stats list */}
              <View style={styles.statsListWrap}>
                <View style={styles.statsRow}>
                  <View style={[styles.statsDot, { backgroundColor: '#C8D4E0' }]} />
                  <Text style={styles.statsLabel}>Photos uploaded</Text>
                  <Text style={styles.statsValue}>1</Text>
                </View>
                <View style={styles.statsRow}>
                  <View style={[styles.statsDot, { backgroundColor: '#1A56B0' }]} />
                  <Text style={styles.statsLabel}>Without problems</Text>
                  <Text style={styles.statsValue}>1</Text>
                </View>
                <View style={styles.statsRow}>
                  <View style={[styles.statsDot, { backgroundColor: '#E53E3E' }]} />
                  <Text style={styles.statsLabel}>Diagnosed problems</Text>
                  <Text style={styles.statsValue}>0</Text>
                </View>
              </View>
            </View>

            {/* Set Up Notification card */}
            <LinearGradient
              colors={['#1A56B0', '#0A2463']}
              style={styles.notifCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.notifCardBody}>
                <View style={styles.notifTextWrap}>
                  <Text style={styles.notifTitle}>Set Up Notification</Text>
                  <Text style={styles.notifSubtitle}>
                    {'Do not forget to keep track\nof your skin conditions'}
                  </Text>
                </View>
                <View style={styles.bellWrap}>
                  <Text style={styles.bellEmoji}>🔔</Text>
                  <View style={styles.bellBadge}>
                    <Text style={styles.bellBadgeText}>1</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            <View style={{ height: 110 }} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2463',
  },
  safeArea: {
    flex: 1,
  },
  pageContent: {
    flexGrow: 1,
  },

  // ── Header ──
  headerGradient: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerSub: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '400',
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 20,
  },

  // ── Carousel ──
  carouselList: {
    gap: 12,
    paddingRight: 24,
  },
  carouselSlide: {
    width: SLIDE_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Body scan visualization
  bodyScanArea: {
    height: 220,
    backgroundColor: '#C8DDEF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  figureSilhouette: {
    position: 'absolute',
  },
  figureBack: {
    left: '10%',
    bottom: -10,
  },
  figureFront: {
    left: '30%',
    bottom: -10,
  },

  // Scan square with corner brackets
  scanSquareWrapper: {
    position: 'absolute',
    width: 100,
    height: 100,
    top: '30%',
    left: '40%',
  },
  scanSquare: {
    width: 100,
    height: 100,
    backgroundColor: 'rgba(210,165,110,0.85)',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerBracket: {
    position: 'absolute',
    width: 18,
    height: 18,
  },
  bracketArm: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  bracketTop: {
    width: 18,
    height: 3,
    top: 0,
    left: 0,
  },
  bracketLeft: {
    width: 3,
    height: 18,
    top: 0,
    left: 0,
  },
  bracketRight: {
    width: 3,
    height: 18,
    top: 0,
    right: 0,
  },
  bracketBottom: {
    width: 18,
    height: 3,
    bottom: 0,
    left: 0,
  },
  moleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3D2B1A',
  },
  scanBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  scanBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E53E3E',
  },

  // Slide footer
  slideFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  slideFooterText: {
    flex: 1,
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
    lineHeight: 20,
  },
  slideArrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#1A56B0',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Dots
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 14,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dotActive: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0)',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },

  // ── White section ──
  whiteSection: {
    flex: 1,
    backgroundColor: '#F0F4FA',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A2340',
    marginBottom: 16,
    lineHeight: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2340',
    marginTop: 20,
    marginBottom: 12,
  },

  // Promo cards
  promoCard: {
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
  },
  promoCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  promoCardText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
    flex: 1,
  },
  doctorIconWrap: {
    position: 'relative',
    width: 56,
    height: 56,
    marginLeft: 12,
  },
  doctorCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stethoscopeTag: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#005050',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Risk card
  riskCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
  },
  riskCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  riskCardLeft: {
    flex: 1,
  },
  riskTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  riskSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  questionMarksContainer: {
    width: 48,
    height: 48,
    position: 'relative',
  },
  questionMarkLarge: {
    position: 'absolute',
    fontSize: 30,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.9)',
    top: 0,
    left: 0,
  },
  questionMarkSmall: {
    position: 'absolute',
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.7)',
    top: 6,
    left: 24,
  },

  // Scan history
  scanHistoryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  scanImageCard: {
    alignItems: 'center',
  },
  scanImagePlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#D9E8F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  scanDateText: {
    fontSize: 12,
    color: '#718096',
  },

  // Tip card
  tipCard: {
    flexDirection: 'row',
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
    gap: 10,
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: '#D97706',
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: '#92400E',
    lineHeight: 19,
  },
  tipBold: {
    fontWeight: '700',
  },

  // Stats card
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.06)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
    gap: 16,
  },
  statsRingWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRingOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#1A56B0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRingInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsRingNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A2340',
  },
  statsListWrap: {
    flex: 1,
    gap: 10,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  statsLabel: {
    flex: 1,
    fontSize: 13,
    color: '#4A5568',
  },
  statsValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A2340',
  },

  // Notification card
  notifCard: {
    borderRadius: 16,
    marginTop: 16,
    overflow: 'hidden',
  },
  notifCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  notifTextWrap: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  notifSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 19,
  },
  bellWrap: {
    position: 'relative',
    marginLeft: 12,
  },
  bellEmoji: {
    fontSize: 44,
  },
  bellBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E53E3E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});
