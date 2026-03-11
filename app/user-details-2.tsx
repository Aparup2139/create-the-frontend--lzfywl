
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function UserDetails2Screen() {
  const router = useRouter();
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);

  const skinIssues = [
    { id: 'acne', label: 'Acne', icon: 'warning' },
    { id: 'pimples', label: 'Pimples', icon: 'error' },
    { id: 'rash', label: 'Rash', icon: 'warning' },
    { id: 'wrinkles', label: 'Wrinkles', icon: 'info' },
    { id: 'dark-spots', label: 'Dark Spots', icon: 'info' },
    { id: 'dry-skin', label: 'Dry Skin', icon: 'warning' },
    { id: 'oily-skin', label: 'Oily Skin', icon: 'info' },
    { id: 'patchy-beard', label: 'Patchy Beard', icon: 'info' },
    { id: 'eczema', label: 'Eczema', icon: 'error' },
    { id: 'rosacea', label: 'Rosacea', icon: 'warning' },
    { id: 'pigmentation', label: 'Pigmentation', icon: 'info' },
    { id: 'scars', label: 'Scars', icon: 'info' },
  ];

  const toggleIssue = (issueId: string) => {
    console.log('User toggled skin issue:', issueId);
    if (selectedIssues.includes(issueId)) {
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId));
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  const handleNext = () => {
    console.log('User details page 2:', { selectedIssues });
    router.push('/user-details-3');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Skin Concerns',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <LinearGradient
        colors={[colors.background, colors.secondaryLight]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>What are your skin concerns?</Text>
            <Text style={styles.subtitle}>
              Select all that apply. This helps us provide better recommendations.
            </Text>

            <View style={styles.issuesGrid}>
              {skinIssues.map((issue) => {
                const isSelected = selectedIssues.includes(issue.id);
                return (
                  <TouchableOpacity
                    key={issue.id}
                    style={[
                      styles.issueCard,
                      isSelected && styles.issueCardActive,
                    ]}
                    onPress={() => toggleIssue(issue.id)}
                  >
                    <IconSymbol
                      ios_icon_name="checkmark.circle.fill"
                      android_material_icon_name={issue.icon}
                      size={24}
                      color={isSelected ? colors.card : colors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.issueText,
                        isSelected && styles.issueTextActive,
                      ]}
                    >
                      {issue.label}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <IconSymbol
                          ios_icon_name="checkmark"
                          android_material_icon_name="check"
                          size={16}
                          color={colors.card}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>

          {/* Next Button */}
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedIssues.length === 0 && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={selectedIssues.length === 0}
          >
            <Text style={styles.nextButtonText}>Next</Text>
            <IconSymbol
              ios_icon_name="arrow.right"
              android_material_icon_name="arrow-forward"
              size={20}
              color={colors.card}
            />
          </TouchableOpacity>
        </View>
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
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  progressDotActive: {
    width: 24,
    backgroundColor: colors.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  issuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  issueCard: {
    width: '47%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    position: 'relative',
  },
  issueCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  issueText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  issueTextActive: {
    color: colors.card,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    marginHorizontal: 24,
    marginBottom: 40,
    borderRadius: 16,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
  },
  nextButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
