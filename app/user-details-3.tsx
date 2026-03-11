
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/styles/commonStyles';
import { IconSymbol } from '@/components/IconSymbol';

export default function UserDetails3Screen() {
  const router = useRouter();
  const [skinType, setSkinType] = useState<string>('');
  const [allergies, setAllergies] = useState('');
  const [currentProducts, setCurrentProducts] = useState('');

  const skinTypes = [
    { id: 'normal', label: 'Normal', icon: 'check-circle' },
    { id: 'dry', label: 'Dry', icon: 'info' },
    { id: 'oily', label: 'Oily', icon: 'warning' },
    { id: 'combination', label: 'Combination', icon: 'info' },
    { id: 'sensitive', label: 'Sensitive', icon: 'error' },
  ];

  const handleFinish = () => {
    console.log('User details page 3:', { skinType, allergies, currentProducts });
    // TODO: Backend Integration - POST /api/user/profile with all collected data
    router.replace('/(tabs)');
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Additional Info',
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
        }}
      />
      <LinearGradient
        colors={[colors.background, colors.accentLight]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDot} />
            <View style={styles.progressDot} />
            <View style={[styles.progressDot, styles.progressDotActive]} />
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Almost done!</Text>
            <Text style={styles.subtitle}>
              A few more details to personalize your experience
            </Text>

            {/* Skin Type */}
            <View style={styles.section}>
              <Text style={styles.label}>What&apos;s your skin type?</Text>
              <View style={styles.skinTypeGrid}>
                {skinTypes.map((type) => {
                  const isSelected = skinType === type.id;
                  return (
                    <TouchableOpacity
                      key={type.id}
                      style={[
                        styles.skinTypeCard,
                        isSelected && styles.skinTypeCardActive,
                      ]}
                      onPress={() => setSkinType(type.id)}
                    >
                      <IconSymbol
                        ios_icon_name="drop.fill"
                        android_material_icon_name={type.icon}
                        size={20}
                        color={isSelected ? colors.card : colors.textSecondary}
                      />
                      <Text
                        style={[
                          styles.skinTypeText,
                          isSelected && styles.skinTypeTextActive,
                        ]}
                      >
                        {type.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Allergies */}
            <View style={styles.section}>
              <Text style={styles.label}>Any known allergies? (Optional)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Fragrance, Parabens, Sulfates"
                  placeholderTextColor={colors.textLight}
                  value={allergies}
                  onChangeText={setAllergies}
                  multiline
                />
              </View>
            </View>

            {/* Current Products */}
            <View style={styles.section}>
              <Text style={styles.label}>Current skincare products? (Optional)</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Cleanser, Moisturizer, Sunscreen"
                  placeholderTextColor={colors.textLight}
                  value={currentProducts}
                  onChangeText={setCurrentProducts}
                  multiline
                />
              </View>
            </View>
          </ScrollView>

          {/* Finish Button */}
          <TouchableOpacity
            style={[styles.finishButton, !skinType && styles.finishButtonDisabled]}
            onPress={handleFinish}
            disabled={!skinType}
          >
            <Text style={styles.finishButtonText}>Get Started</Text>
            <IconSymbol
              ios_icon_name="checkmark"
              android_material_icon_name="check"
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
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  skinTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skinTypeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.border,
    gap: 8,
  },
  skinTypeCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  skinTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  skinTypeTextActive: {
    color: colors.card,
  },
  inputContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  input: {
    fontSize: 16,
    color: colors.text,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  finishButton: {
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
  finishButtonDisabled: {
    backgroundColor: colors.disabled,
    shadowOpacity: 0,
  },
  finishButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
