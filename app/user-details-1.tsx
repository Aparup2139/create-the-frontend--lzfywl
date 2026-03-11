
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function UserDetails1Screen() {
  const router = useRouter();
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<string>('');

  const handleNext = () => {
    console.log('User details page 1:', { age, gender });
    router.push('/user-details-2');
  };

  const genderOptions = [
    { label: 'Male', value: 'male', icon: 'person' },
    { label: 'Female', value: 'female', icon: 'person' },
    { label: 'Other', value: 'other', icon: 'person' },
  ];

  const ageDisplay = age.toString();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'About You',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <LinearGradient
        colors={[colors.background, colors.primaryLight]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressDot, styles.progressDotActive]} />
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Let&apos;s get to know you</Text>
            <Text style={styles.subtitle}>
              This helps us provide personalized skin care recommendations
            </Text>

            {/* Age Slider */}
            <View style={styles.section}>
              <Text style={styles.label}>How old are you?</Text>
              <View style={styles.ageDisplay}>
                <Text style={styles.ageNumber}>{ageDisplay}</Text>
                <Text style={styles.ageLabel}>years old</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={13}
                maximumValue={100}
                step={1}
                value={age}
                onValueChange={setAge}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={colors.border}
                thumbTintColor={colors.primary}
              />
              <View style={styles.sliderLabels}>
                <Text style={styles.sliderLabel}>13</Text>
                <Text style={styles.sliderLabel}>100</Text>
              </View>
            </View>

            {/* Gender Selection */}
            <View style={styles.section}>
              <Text style={styles.label}>Gender</Text>
              <View style={styles.genderContainer}>
                {genderOptions.map((option) => {
                  const isSelected = gender === option.value;
                  return (
                    <TouchableOpacity
                      key={option.value}
                      style={[
                        styles.genderButton,
                        isSelected && styles.genderButtonActive,
                      ]}
                      onPress={() => setGender(option.value)}
                    >
                      <IconSymbol
                        ios_icon_name="person.fill"
                        android_material_icon_name={option.icon}
                        size={32}
                        color={isSelected ? colors.card : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.genderText,
                          isSelected && styles.genderTextActive,
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, !gender && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!gender}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
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
    marginBottom: 32,
  },
  section: {
    marginBottom: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  ageDisplay: {
    alignItems: 'center',
    marginBottom: 24,
  },
  ageNumber: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.primary,
  },
  ageLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  sliderLabel: {
    fontSize: 12,
    color: colors.textLight,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 8,
  },
  genderTextActive: {
    color: colors.card,
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
