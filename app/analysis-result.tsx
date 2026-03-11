
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function AnalysisResultScreen() {
  const router = useRouter();

  const handleDone = () => {
    console.log('User tapped done button');
    router.push('/(tabs)');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Analysis Results',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <LinearGradient
        colors={[colors.background, colors.primaryLight]}
        style={styles.gradient}
      >
        <SafeAreaView edges={['bottom']} style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Result Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                <IconSymbol
                  ios_icon_name="checkmark.circle.fill"
                  android_material_icon_name="check-circle"
                  size={64}
                  color={colors.success}
                />
              </View>
              <Text style={styles.title}>Analysis Complete!</Text>
              <Text style={styles.subtitle}>
                Here&apos;s what we found about your skin
              </Text>
            </View>

            {/* Detected Issues */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Detected Concerns</Text>
              <View style={styles.issueCard}>
                <View style={styles.issueHeader}>
                  <IconSymbol
                    ios_icon_name="exclamationmark.triangle.fill"
                    android_material_icon_name="warning"
                    size={24}
                    color={colors.warning}
                  />
                  <Text style={styles.issueTitle}>Mild Acne</Text>
                </View>
                <Text style={styles.issueDescription}>
                  We detected some minor acne spots on your forehead and cheeks.
                </Text>
              </View>

              <View style={styles.issueCard}>
                <View style={styles.issueHeader}>
                  <IconSymbol
                    ios_icon_name="info.circle.fill"
                    android_material_icon_name="info"
                    size={24}
                    color={colors.info}
                  />
                  <Text style={styles.issueTitle}>Dry Patches</Text>
                </View>
                <Text style={styles.issueDescription}>
                  Some areas show signs of dryness, especially around the nose.
                </Text>
              </View>
            </View>

            {/* Recommendations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendations</Text>
              
              <View style={styles.recommendationCard}>
                <Text style={styles.recommendationNumber}>1</Text>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>
                    Use a gentle cleanser
                  </Text>
                  <Text style={styles.recommendationText}>
                    Wash your face twice daily with a mild, non-comedogenic cleanser
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationCard}>
                <Text style={styles.recommendationNumber}>2</Text>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>
                    Apply moisturizer regularly
                  </Text>
                  <Text style={styles.recommendationText}>
                    Use a hydrating moisturizer to combat dry patches
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationCard}>
                <Text style={styles.recommendationNumber}>3</Text>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>
                    Consider spot treatment
                  </Text>
                  <Text style={styles.recommendationText}>
                    Use benzoyl peroxide or salicylic acid for acne spots
                  </Text>
                </View>
              </View>

              <View style={styles.recommendationCard}>
                <Text style={styles.recommendationNumber}>4</Text>
                <View style={styles.recommendationContent}>
                  <Text style={styles.recommendationTitle}>
                    Stay hydrated
                  </Text>
                  <Text style={styles.recommendationText}>
                    Drink plenty of water throughout the day for healthy skin
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ height: 40 }} />
          </ScrollView>

          {/* Done Button */}
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
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
  issueCard: {
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
  issueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  issueTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  issueDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  recommendationCard: {
    flexDirection: 'row',
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
  recommendationNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    color: colors.card,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 12,
  },
  recommendationContent: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  doneButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  doneButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
