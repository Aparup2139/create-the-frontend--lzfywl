
import { StyleSheet } from 'react-native';

// AI-Dermat App Color Palette - Calm Pastel Theme
export const colors = {
  // Backgrounds
  background: '#FFF9F5', // Soft cream white
  card: '#FFFFFF',
  
  // Text
  text: '#2D3748', // Dark gray for readability
  textSecondary: '#718096', // Medium gray
  textLight: '#A0AEC0', // Light gray
  
  // Primary - Soft Teal (medical/health feel)
  primary: '#81C9C9', // Soft teal
  primaryDark: '#5FA8A8',
  primaryLight: '#B8E6E6',
  
  // Secondary - Soft Peach (warm, friendly)
  secondary: '#FFB8A3', // Soft peach
  secondaryDark: '#FF9B7A',
  secondaryLight: '#FFD4C4',
  
  // Accent - Soft Lavender (calming)
  accent: '#C4B5FD', // Soft lavender
  accentDark: '#A78BFA',
  accentLight: '#DDD6FE',
  
  // Status colors (pastel versions)
  success: '#9AE6B4', // Soft green
  warning: '#FBD38D', // Soft yellow
  error: '#FEB2B2', // Soft red
  info: '#90CDF4', // Soft blue
  
  // UI Elements
  border: '#E2E8F0',
  shadow: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  
  // Special
  highlight: '#FFF5E6', // Very light peach for highlights
  disabled: '#CBD5E0',
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: '600',
  },
});
